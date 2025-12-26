import express from "express";
import { getShopInfo, updateShopInfo } from "../controllers/shopController.js";

const router = express.Router();

// Public
router.get("/", getShopInfo);

// Admin (for now no auth, simple)
router.post("/", updateShopInfo);

export default router;
