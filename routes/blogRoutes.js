const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../middleware/authMiddleware');


router.get('/', ensureAuthenticated, (req, res) => {
  res.render('blogs', { user: req.user });
});

module.exports = router;