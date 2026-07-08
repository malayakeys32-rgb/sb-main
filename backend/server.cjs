// ===============================
// Sentinel-Black Backend Server
// ===============================

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

// -------------------------------
// App Setup
// -------------------------------
const app = express();
app.use(express.json());

// SAFE CORS (no crashes)
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// -------------------------------
// MongoDB Connection
// -------------------------------
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log("Connected to MongoDB");
})
.catch((err) => {
  console.error("MongoDB connection error:", err.message);
});

// -------------------------------
// Test Route
// -------------------------------
app.get("/", (req, res) => {
  res.json({
    status: "online",
    message: "Sentinel-Black Tactical Ops Backend Running"
  });
});

// -------------------------------
// Start Server
// -------------------------------
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});


