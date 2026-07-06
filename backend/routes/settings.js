const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.json({ settings: "Settings data" });
});

module.exports = router;
