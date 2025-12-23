const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { sendEmail } = require('../utils/emailClient');

// Register
router.post('/register', async (req, res) => {
  try {
    const { email, password, contactPerson, phone, natureOfBusiness } = req.body;

    // Check existing
    const existing = await User.findOne({ email });
    if (existing) {
        return res.render('register', { error: 'Email already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      email,
      password: hashedPassword,
      contactPerson,
      phone,
      natureOfBusiness,
    });

    // Send Welcome Email
    await sendEmail('welcome', email, { name: contactPerson });

    res.redirect('/login?registered=true');
  } catch (error) {
    res.render('register', { error: 'Registration failed: ' + error.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.render('login', { error: 'Invalid email or password' });
    }

    const token = jwt.sign(
      { userId: user._id, role: user.role, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.cookie('token', token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });

    if (user.role === 'admin') {
        res.redirect('/admin/dashboard');
    } else {
        res.redirect('/windows');
    }
  } catch (error) {
    res.render('login', { error: 'Login failed: ' + error.message });
  }
});

// Logout
router.get('/logout', (req, res) => {
  res.cookie('token', '', { maxAge: 1 });
  res.redirect('/');
});

// Forgot Password Page
router.get('/forgot-password', (req, res) => {
  res.render('forgot-password');
});

// Forgot Password Action
router.post('/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      // Don't reveal user existence
      return res.render('forgot-password', { message: 'If an account with that email exists, a reset link has been sent.' });
    }

    const token = crypto.randomBytes(20).toString('hex');
    const code = crypto.randomInt(100000, 999999).toString();

    user.resetPasswordToken = token;
    user.resetPasswordCode = code;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
    await user.save();

    const resetLink = `${req.protocol}://${req.get('host')}/auth/reset-password/${token}`;

    await sendEmail('reset-password', email, {
      resetLink,
      code
    });

    // Redirect to verify code page
    res.redirect('/auth/verify-code');
  } catch (error) {
    res.render('forgot-password', { error: 'An error occurred. Please try again.' });
  }
});

// Verify Code Page
router.get('/verify-code', (req, res) => {
    res.render('verify-code');
});

// Verify Code Action
router.post('/verify-code', async (req, res) => {
    try {
        const { code } = req.body;
        const user = await User.findOne({
            resetPasswordCode: code,
            resetPasswordExpires: { $gt: Date.now() }
        });

        if (!user) {
            return res.render('verify-code', { error: 'Invalid or expired code' });
        }

        // Redirect to reset password page using the token associated with this user
        res.redirect(`/auth/reset-password/${user.resetPasswordToken}`);
    } catch (error) {
        res.render('verify-code', { error: 'An error occurred' });
    }
});

// Reset Password Page
router.get('/reset-password/:token', async (req, res) => {
  try {
    const user = await User.findOne({
      resetPasswordToken: req.params.token,
      resetPasswordExpires: { $gt: Date.now() }
    });

    if (!user) {
      return res.render('forgot-password', { error: 'Password reset token is invalid or has expired.' });
    }

    res.render('reset-password', { token: req.params.token, email: user.email });
  } catch (error) {
    res.render('forgot-password', { error: 'An error occurred.' });
  }
});

// Reset Password Action
router.post('/reset-password/:token', async (req, res) => {
  try {
    const { password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
       // We need to fetch user again to render page with email
       const user = await User.findOne({ resetPasswordToken: req.params.token });
       return res.render('reset-password', {
         token: req.params.token,
         email: user ? user.email : '',
         error: 'Passwords do not match'
       });
    }

    const user = await User.findOne({
      resetPasswordToken: req.params.token,
      resetPasswordExpires: { $gt: Date.now() }
    });

    if (!user) {
      return res.render('forgot-password', { error: 'Password reset token is invalid or has expired.' });
    }

    user.password = await bcrypt.hash(password, 10);
    user.resetPasswordToken = undefined;
    user.resetPasswordCode = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.redirect('/login?reset=true');
  } catch (error) {
     res.render('forgot-password', { error: 'An error occurred.' });
  }
});

// Re-apply Action (Authenticated)
const { checkUser } = require('../middleware/auth');
router.post('/reapply', checkUser, async (req, res) => {
  try {
    const user = res.locals.user; // Set by checkUser middleware
    if (!user) return res.redirect('/login');

    user.status = 'pending';
    user.reviewRequested = true;
    user.rejectionReason = undefined; // Clear previous reason
    await user.save();

    res.redirect('/windows?reapplied=true');
  } catch (error) {
    res.redirect('/windows?error=reapply_failed');
  }
});

module.exports = router;
