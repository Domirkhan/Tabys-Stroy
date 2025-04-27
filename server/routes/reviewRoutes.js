import express from "express";
import { requireSignIn } from "../middlewares/authMiddleware.js";
import { createReview, getProductReviews } from "../controllers/reviewController.js";

const router = express.Router();

router.post("/create-review", requireSignIn, createReview);
router.get("/product-reviews/:productId", getProductReviews);

export default router;