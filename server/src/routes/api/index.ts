import express from "express";
import questionRoutes from "./questionRoutes.js"; // Note the .js extension

const router = express.Router();

router.use("/questions", questionRoutes);

export default router;
