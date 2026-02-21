import express from "express";
import authMiddleware from "../middleware/auth.js";
import {
  getCart,
  addItemToCart,
  removeItemFromCart,
  updateItemQuantity,
} from "../controllers/cartController.js";

const router = express.Router();

router.get("/", authMiddleware, getCart);
router.post("/add", authMiddleware, addItemToCart);
router.delete("/remove/:productId", authMiddleware, removeItemFromCart);
router.put("/update/:productId", authMiddleware, updateItemQuantity);

export default router;