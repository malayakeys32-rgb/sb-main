const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    evidence: [
      { id: 1, type: "image", label: "Camera Capture" },
      { id: 2, type: "audio", label: "Mic Recording" }
    ]
  });
});

module.exports = router;
