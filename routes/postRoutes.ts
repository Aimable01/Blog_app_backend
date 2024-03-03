import express from "express";
import {
  createPost,
  viewPosts,
  deletePost,
  updatePost,
} from "../controllers/postControllers";

export const postRouter = express.Router();

postRouter.post("/new", createPost);
postRouter.get("/", viewPosts);
postRouter.patch("/:id", updatePost);
postRouter.delete("/:id", deletePost);
