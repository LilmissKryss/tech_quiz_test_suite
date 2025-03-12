import express from "express";
import questionRoutes from "./questionRoutes.js";

const router = express.Router();

router.use("/questions", questionRoutes);

export default router;
