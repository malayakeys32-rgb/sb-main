const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.json({ message: "Sentinel Black backend is running" });
});

// Example API route
app.get("/status", (req, res) => {
  res.json({ status: "ok", timestamp: Date.now() });
});

// Render requires this port
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
