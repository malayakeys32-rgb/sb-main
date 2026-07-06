const mongoose = require("mongoose");

async function connectDatabase() {
  const uri = process.env.DATABASE_URL;

  if (!uri) {
    console.error("DATABASE_URL missing in .env");
    process.exit(1);
  }

  try {
    await mongoose.connect(uri);
    console.log("Database connected");
  } catch (err) {
    console.error("Database connection failed:", err.message);
    process.exit(1);
  }
}

module.exports = { connectDatabase };
