import express from "express";
import { getDiceValue, getGameResult } from "./gameController.js";
import { authMiddleWare } from "../userModule/userPolicy.js";
const gameRouter = express.Router();

//game routes
gameRouter.post("/diceValue", authMiddleWare, getDiceValue);
gameRouter.post("/gameResult/:gameId", authMiddleWare, getGameResult);
// gameRouter.post("/signIn", authMiddleWare, signIn);

export default gameRouter;
