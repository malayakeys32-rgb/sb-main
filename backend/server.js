const express = require("express");
const path = require("path");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  res.json({ ok: true, message: "Sentinel-Black Backend Online" });
});

// Routes
const authRoutes = require("./routes/auth");
const dashboardRoutes = require("./routes/dashboard");
const evidenceRoutes = require("./routes/evidence");
const opsRoutes = require("./routes/ops");
const settingsRoutes = require("./routes/settings");
const systemRoutes = require("./routes/system");

// Status check
app.get("/api/status", (req, res) => {
  res.json({ ok: true, service: "sentinel-black" });
});

// API routes only
app.use("/api/auth", require("./routes/auth"));ffont end calls it

app.use("/api/dashboard", dashboardRoutes);
app.use("/api/evidence", evidenceRoutes);
app.use("/api/ops", opsRoutes);
app.use("/api/settings", settingsRoutes);
app.use("/api/system", systemRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
