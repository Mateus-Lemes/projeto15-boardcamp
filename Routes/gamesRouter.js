import { Router } from "express";
import { createdGameController, getGamesController } from "../Controllers/gamesController.js";
import { gamesCreatedValidation } from "../Middlewares/gamesValidation.js";

const gamesRouter = Router();

gamesRouter.get("/games", getGamesController);
gamesRouter.post("/games", gamesCreatedValidation, createdGameController);

export default gamesRouter;