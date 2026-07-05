const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    operations: [
      { id: 1, name: "Recon Sweep", status: "active" },
      { id: 2, name: "Perimeter Check", status: "standby" }
    ]
  });
});

module.exports = router;
