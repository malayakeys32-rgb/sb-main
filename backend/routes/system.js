const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    cpu: "normal",
    memory: "stable",
    uptime: "24h",
    secure_link: true
  });
});

module.exports = router;
