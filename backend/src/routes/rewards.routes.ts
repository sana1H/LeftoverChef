import express from "express";
import { redeemReward, getUserPoints } from "../controllers/rewards.controller";

const router = express.Router();

router.post("/redeem", redeemReward);
router.get("/points/:userId", getUserPoints);

export default router;
