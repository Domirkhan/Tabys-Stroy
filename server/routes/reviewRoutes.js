import express from "express";
import { requireSignIn, isAdmin} from "../middlewares/authMiddleware.js";
import { createReview, deleteReview, getProductReviews } from "../controllers/reviewController.js";
import { reviewMediaUpload } from "../middlewares/uploadMiddleware.js";
const router = express.Router();

router.post("/create-review", requireSignIn, reviewMediaUpload, createReview);
router.get("/product-reviews/:productId", getProductReviews);
router.delete("/delete-review/:reviewId", requireSignIn, isAdmin, deleteReview);

export default router;