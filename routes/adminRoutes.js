const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { requireAdmin, checkUser } = require('../middleware/auth');

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
        const { userId, status, backOfficeLink, backOfficeUsername, backOfficePassword } = req.body;

        await User.findByIdAndUpdate(userId, {
            status,
            backOfficeLink,
            backOfficeUsername,
            backOfficePassword
        });

        res.redirect('/admin/dashboard');
    } catch (error) {
        res.status(500).send('Error updating user');
    }
});

module.exports = router;
