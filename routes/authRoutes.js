const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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
    await User.create({
      email,
      password: hashedPassword,
      contactPerson,
      phone,
      natureOfBusiness,
    });

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

module.exports = router;
