const express = require("express");
const router = express.Router();

// LOGIN ROUTE
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  // TEMP: Accept any login
  if (!email || !password) {
    return res.status(400).json({ ok: false, error: "Missing credentials" });
  }

  res.json({
    ok: true,
    user: {
      email,
      role: "director"
    }
  });
});

module.exports = router;
