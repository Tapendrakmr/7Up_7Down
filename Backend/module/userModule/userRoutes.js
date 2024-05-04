import express from "express";
import { signup, signIn, profile } from "./userController.js";
import { authMiddleWare } from "./userPolicy.js";
const userRouter = express.Router();

//user routes
userRouter.post("/signup", signup);
userRouter.post("/signIn", signIn);
userRouter.get("/profile", authMiddleWare, profile);

export default userRouter;
