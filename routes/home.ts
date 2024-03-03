import express from "express";
import { viewPosts } from "../controllers/postControllers";

export const homeRoute = express.Router();
homeRoute.get("/", viewPosts);
