// src/routes/ngo.routes.ts
import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.json({
    success: true,
    message: "NGO routes working",
  });
});

export default router;
