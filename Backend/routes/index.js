import express from "express";
import userRoutes from "../module/userModule/userRoutes.js";
import gameRoutes from "../module/gameModule/gameRoutes.js";
const router = express.Router();
router.use("/user", userRoutes);
router.use("/game", gameRoutes);

export { router };
