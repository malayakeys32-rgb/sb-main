const { loadEnv } = require("./config/env");
loadEnv();
const express = require("express");
const cors = require("cors");
const { loadEnv } = require("./config/env");
const authMiddleware = require("./middleware/auth");

// Routes
const authRoutes = require("./routes/auth");
const dashboardRoutes = require("./routes/dashboard");
const evidenceRoutes = require("./routes/evidence");
const opsRoutes = require("./routes/ops");
const settingsRoutes = require("./routes/settings");
const systemRoutes = require("./routes/system");

loadEnv();

const app = express();
app.use(cors());
app.use(express.json());

// Global auth middleware (optional)
app.use(authMiddleware);

// Route mounting
app.use("/auth", authRoutes);
app.use("/dashboard", dashboardRoutes);
app.use("/evidence", evidenceRoutes);
app.use("/ops", opsRoutes);
app.use("/settings", settingsRoutes);
app.use("/system", systemRoutes);

// Health check
app.get("/", (req, res) => {
  res.json({ message: "Sentinel Black backend running" });
});

// Server start
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
