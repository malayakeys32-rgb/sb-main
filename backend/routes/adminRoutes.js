import express from "express";
import { getUsers, getLogs } from "../controllers/adminController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/users", protect, getUsers);
router.get("/logs", protect, getLogs);

export default router;

