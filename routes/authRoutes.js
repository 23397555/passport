const express = require('express');
const router = express.Router();
const passport = require('passport');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { forwardAuthenticated, ensureAuthenticated } = require('../middleware/authMiddleware');


router.get('/', (req, res) => {
  if (req.isAuthenticated()) {
    return res.redirect('/blogs');
  }
  res.redirect('/login');
});


router.get('/register', forwardAuthenticated, (req, res) => res.render('register'));

router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.render('register', { error: 'Email already exists' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    user = new User({ name, email, password: hashedPassword });
    await user.save();
    res.redirect('/login');
  } catch (err) {
    console.log(err);
    res.redirect('/register');
  }
});

router.get('/login', forwardAuthenticated, (req, res) => res.render('login'));


router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/blogs',
    failureRedirect: '/login'
  })(req, res, next);
});


router.get('/logout', ensureAuthenticated, (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    res.redirect('/login');
  });
});

module.exports = router;