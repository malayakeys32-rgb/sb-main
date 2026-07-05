const express = require("express");
const router = express.Router();

// POST /api/auth/login
router.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (username === "admin" && password === "Admin@1234") {
    return res.json({ ok: true, token: "secure-token-123" });
  }

  res.status(401).json({ ok: false, message: "Invalid credentials" });
});

// POST /api/auth/logout
router.post("/logout", (req, res) => {
  res.json({ ok: true, message: "Logged out" });
});

module.exports = router;
