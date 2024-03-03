import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { pool } from "./database/db";

//middle ware
dotenv.config();

//Connect to the database
pool
  .connect()
  .then(() => console.log("Connected to the db"))
  .catch((err) => console.log("Error in connecting to the db: ", err));

const app = express();

//  Give listen port
app.listen(3000, () => console.log("App running on port 3000."));
