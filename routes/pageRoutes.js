const express = require('express');
const router = express.Router();
const { checkUser, requireAuth } = require('../middleware/auth');
const User = require('../models/User');

router.use(checkUser); // Applies user to locals

router.get('/', (req, res) => res.render('index'));
router.get('/windows', (req, res) => res.render('windows'));
router.get('/mobile', (req, res) => res.render('mobile'));
router.get('/backoffice', (req, res) => res.render('backoffice'));
router.get('/login', (req, res) => res.render('login', { error: null }));
router.get('/request-access', (req, res) => res.render('register', { error: null }));

// Protected Download Route
router.get('/download/windows', requireAuth, async (req, res) => {
    // Re-fetch fresh user status
    const user = await User.findById(req.user.userId);
    if (!user || user.status !== 'approved') {
        return res.redirect('/windows');
    }

    const downloadLink = process.env.DOWNLOAD_LINK_WINDOWS;
    if (downloadLink) {
        res.redirect(downloadLink);
    } else {
        res.status(404).send('Download link not configured.');
    }
});

module.exports = router;
