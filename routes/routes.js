const express = require('express');
const path = require('path');
const router = express.Router();

router.use(express.static(path.join(__dirname, '..', 'public')));

// Route to serve login.html
router.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'login.html'));
});

// Route to serve register.html
router.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'register.html'));
});


module.exports = router;