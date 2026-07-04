const express = require("express");
const path = require("path");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static frontend
app.use(express.static(path.join(__dirname, "public")));

// Routes
const authRoutes = require("./routes/auth");
const dashboardRoutes = require("./routes/dashboard");
const evidenceRoutes = require("./routes/evidence");
const opsRoutes = require("./routes/ops");
const settingsRoutes = require("./routes/settings");
const systemRoutes = require("./routes/system");

app.use("/auth", authRoutes);
app.use("/dashboard", dashboardRoutes);
app.use("/evidence", evidenceRoutes);
app.use("/ops", opsRoutes);
app.use("/settings", settingsRoutes);
app.use("/system", systemRoutes);

// Default route (homepage)
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
