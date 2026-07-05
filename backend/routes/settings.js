const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    theme: "cosmic-neon",
    notifications: true,
    version: "1.0"
  });
});

module.exports = router;
