const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { requireAdmin, checkUser } = require('../middleware/auth');
const { sendEmail } = require('../utils/emailClient');
const bcrypt = require('bcryptjs');

router.use(checkUser);
router.use(requireAdmin);

router.get('/dashboard', async (req, res) => {
    try {
        const users = await User.find({ role: 'user' }).sort({ createdAt: -1 });
        res.render('admin', { users });
    } catch (error) {
        res.status(500).send('Server Error');
    }
});

router.post('/verify', async (req, res) => {
    try {
        const { userId, status, rejectionReason, backOfficeLink, backOfficeUsername, backOfficePassword } = req.body;

        const user = await User.findById(userId);
        if (!user) return res.status(404).send('User not found');

        user.status = status;

        if (status === 'approved') {
            user.backOfficeLink = backOfficeLink;
            user.backOfficeUsername = backOfficeUsername;
            user.backOfficePassword = backOfficePassword;
            user.reviewRequested = false;

            // Send Approval Email
            await sendEmail('approval', user.email, {
                name: user.contactPerson,
                backOfficeLink,
                backOfficeUsername,
                backOfficePassword,
                windowsLink: process.env.DOWNLOAD_LINK_WINDOWS,
                apkLink: process.env.NEXT_PUBLIC_DOWNLOAD_LINK_APK,
                loginLink: `${req.protocol}://${req.get('host')}/login`
            });

        } else if (status === 'rejected') {
            user.rejectionReason = rejectionReason;
            user.reviewRequested = false;

            // Send Rejection Email
            await sendEmail('rejection', user.email, {
                name: user.contactPerson,
                reason: rejectionReason,
                loginLink: `${req.protocol}://${req.get('host')}/login`
            });
        }

        await user.save();

        res.redirect('/admin/dashboard');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error updating user');
    }
});

router.post('/reset-password', async (req, res) => {
    try {
        const { userId, newPassword } = req.body;

        if (!userId || !newPassword) {
            return res.status(400).send('Missing fields');
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        await User.findByIdAndUpdate(userId, {
            password: hashedPassword
        });

        res.status(200).send('Password updated');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error resetting password');
    }
});

module.exports = router;
