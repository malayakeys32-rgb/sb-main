const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.json({ dashboard: "Dashboard data" });
});

module.exports = router;
