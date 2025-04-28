import express from "express";
import { requireSignIn, isAdmin } from "../middlewares/authMiddleware.js";
import { getAdminStats } from "../controllers/statsController.js";

const router = express.Router();

router.get("/admin", requireSignIn, isAdmin, getAdminStats);

export default router;