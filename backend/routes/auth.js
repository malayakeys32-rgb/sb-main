const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();

// TEMP in‑memory users
const users = [
  {
    id: 1,
    email: "director@sentinel.black",
    password: "sentinel123", // plain for now
    role: "director"
  }
];

// helper: sign token
function signToken(user) {
  return jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || "1h" }
  );
}

// REGISTER
router.post("/register", (req, res) => {
  const { email, password, role } = req.body;

  if (!email || !password) {
    return res.status(400).json({ ok: false, error: "Missing email or password" });
  }

  if (users.find(u => u.email === email)) {
    return res.status(409).json({ ok: false, error: "User already exists" });
  }

  const newUser = {
    id: users.length + 1,
    email,
    password,
    role: role || "analyst"
  };

  users.push(newUser);

  const token = signToken(newUser);

  res.json({
    ok: true,
    user: { id: newUser.id, email: newUser.email, role: newUser.role },
    token
  });
});

// LOGIN
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ ok: false, error: "Missing credentials" });
  }

  const user = users.find(u => u.email === email && u.password === password);

  if (!user) {
    return res.status(401).json({ ok: false, error: "Invalid email or password" });
  }

  const token = signToken(user);

  res.json({
    ok: true,
    user: { id: user.id, email: user.email, role: user.role },
    token
  });
});

// PROFILE (requires token)
const auth = require("../middleware/auth");

router.get("/me", auth(), (req, res) => {
  res.json({
    ok: true,
    user: {
      id: req.user.id,
      email: req.user.email,
      role: req.user.role
    }
  });
});

module.exports = router;
