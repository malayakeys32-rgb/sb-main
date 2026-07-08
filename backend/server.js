import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import { connectDB } from "./config/db.js";
import { logger } from "./middleware/loggerMiddleware.js";
import { errorHandler } from "./middleware/errorMiddleware.js";

import authRoutes from "./routes/authRoutes.js";
import caseRoutes from "./routes/caseRoutes.js";
import orgRoutes from "./routes/orgRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

dotenv.config();
const app = express();

connectDB();

app.use(cors({ origin: process.env.CORS_ORIGIN, credentials: true }));
app.use(express.json());
app.use(morgan("dev"));
app.use(logger);

app.use("/auth", authRoutes);
app.use("/cases", caseRoutes);
app.use("/org", orgRoutes);
app.use("/admin", adminRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`🚀 Backend running on port ${PORT}`));
