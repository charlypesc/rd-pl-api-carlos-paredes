import express from "express";
import {
  insertPlayer,
  findPlayers,
  findPlayerById,
  updatePlayerById,
  deletePlayerById,
} from "./playerControllers.js";

const playerRouter = express.Router();

playerRouter.post("/player", insertPlayer);
playerRouter.get("/players", findPlayers);
playerRouter.get("/player/:id/get", findPlayerById);
playerRouter.put("/player/:id/update", updatePlayerById);
playerRouter.delete("/player/:id/delete", deletePlayerById);

export default playerRouter;
