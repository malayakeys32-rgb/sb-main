const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.json({ ops: "Operations data" });
});

module.exports = router;
