const express = require("express");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 10000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// root
app.get("/", (req, res) => {
  res.json({ ok: true, message: "Sentinel-Black Backend Online" });
});

// auth routes
app.use("/api/auth", require("./routes/auth"));

// (other routes: dashboard, ops, etc.)

app.listen(PORT, () => {
  console.log(`Sentinel‑Black backend running on port ${PORT}`);
});
