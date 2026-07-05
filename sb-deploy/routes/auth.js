const express = require('express');
const jwt     = require('jsonwebtoken');
const router  = express.Router();

const SECRET = process.env.JWT_SECRET || 'sentinelblacksecret';
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'Admin@1234';

const USERS = {
  [ADMIN_USERNAME]: ADMIN_PASSWORD,
  'operator': 'NightWatch!2024'
};

router.post('/login', (req, res) => {
  const { user, pass } = req.body;

  if (!USERS[user] || USERS[user] !== pass) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const token = jwt.sign({ user, role: user === ADMIN_USERNAME ? 'admin' : 'operator' }, SECRET, { expiresIn: '2h' });
  res.json({ token, user, role: user === ADMIN_USERNAME ? 'admin' : 'operator' });
});

module.exports = router;
