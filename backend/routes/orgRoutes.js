import express from "express";
import { createOrg, getOrgs } from "../controllers/orgController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/create", protect, createOrg);
router.get("/all", protect, getOrgs);

export default router;

