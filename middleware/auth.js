const jwt = require('jsonwebtoken');
const User = require('../models/User');

const checkUser = async (req, res, next) => {
  const token = req.cookies.token;
  res.locals.user = null;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.userId).select('-password');
      res.locals.user = user;
    } catch (err) {
      // Invalid token
    }
  }
  next();
};

const requireAuth = (req, res, next) => {
  const token = req.cookies.token;

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.redirect('/login');
      } else {
        req.user = decoded;
        next();
      }
    });
  } else {
    res.redirect('/login');
  }
};

const requireAdmin = (req, res, next) => {
    const token = req.cookies.token;
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.redirect('/login');
            } else {
                if (decoded.role === 'admin') {
                    req.user = decoded;
                    next();
                } else {
                    res.status(403).send('Access Denied: Admins Only');
                }
            }
        });
    } else {
        res.redirect('/login');
    }
}

module.exports = { checkUser, requireAuth, requireAdmin };
