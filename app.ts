import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { pool } from "./database/db";
import { authRouter } from "./routes/authRoutes";
import { homeRoute } from "./routes/home";
import { postRouter } from "./routes/postRoutes";
import { authenticateToken } from "./middleware/authMiddleware";
import { commentRoutes } from "./routes/commentRoutes";
import { likeRouter } from "./routes/likeRoutes";

//middle ware
dotenv.config();
const app = express();
app.use(express.json());

// routes
app.use("/home", homeRoute);
app.use("/auth", authRouter);
app.use("/post", authenticateToken, postRouter);
app.use("/comment", authenticateToken, commentRoutes);
app.use("/likes", authenticateToken, likeRouter);

//Connect to the database
pool
  .connect()
  .then(() => console.log("Connected to the db"))
  .catch((err) => console.log("Error in connecting to the db: ", err));

//  Give listen port
app.listen(3000, () => console.log("App running on port 3000."));
