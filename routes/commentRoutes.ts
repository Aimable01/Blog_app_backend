import express from "express";
import {
  createComment,
  deleteComment,
} from "../controllers/commentControllers";

export const commentRoutes = express.Router();

commentRoutes.post("/new", createComment);
commentRoutes.delete("/:id", deleteComment);
