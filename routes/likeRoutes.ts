import express from "express";
import { like, unlike } from "../controllers/likeController";

export const likeRouter = express.Router();

likeRouter.post("/like/:id", like);
likeRouter.post("/unlike/:id", unlike);
