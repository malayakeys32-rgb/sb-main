import express from "express";
import { createCase, getCases } from "../controllers/caseController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/create", protect, createCase);
router.get("/all", protect, getCases);

export default router;

