import express, { Request, Response } from "express";
import { pool } from "../database/db";

export const like = async (req: Request, res: Response): Promise<void> => {
  const id = req.params.id;
  try {
    await pool.query(`UPDATE posts SET likes = likes + 1 WHERE id = ${id}`);
    res.status(200).json({ message: "Liked successfully" });
  } catch (error) {
    console.log(`Error in liking: ${error}`);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const unlike = async (req: Request, res: Response): Promise<void> => {
  const id = req.params.id;
  try {
    await pool.query(`UPDATE posts SET likes = likes - 1 WHERE id = ${id}`);
    res.status(200).json({ message: "Unliked successfully" });
  } catch (error) {
    console.log(`Error in liking: ${error}`);
    res.status(500).json({ message: "Internal server error" });
  }
};
