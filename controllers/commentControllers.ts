import express, { Request, Response } from "express";
import { pool } from "../database/db";

pool
  .connect()
  .then(() => {
    pool.query(`
        CREATE TABLE IF NOT EXISTS comments(
            id SERIAL PRIMARY KEY,
            comment_content TEXT,
            post_id INT,
            FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE,
            author_id INT,
            FOREIGN KEY (author_id) REFERENCES users(id)
        )
    `);
  })
  .catch((err) => {
    console.log(
      "Error in connecting to the database in creating table comments: ",
      err
    );
  });

//   add a comment
export const createComment = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { comment_content, post_id, author_id } = req.body;
  try {
    await pool.query(
      `INSERT INTO comments (comment_content,post_id, author_id) VALUES ($1, $2, $3)`,
      [comment_content, post_id, author_id]
    );
    res.status(200).json({ message: "Added comment successfully" });
  } catch (error) {
    console.log(`Error in creating comment: ${error}`);
    res.status(500).json({ message: "Internal server error" });
  }
};

//   delete a comment
export const deleteComment = async (
  req: Request,
  res: Response
): Promise<void> => {
  const id = req.params.id;
  try {
    await pool.query(`DELETE FROM comments WHERE id = ${id}`);
    res.status(200).json({ message: "Deleted comment sucessfully" });
  } catch (error) {
    console.log(`Error in deleting comment: ${error}`);
    res.status(500).json({ message: "Internal server error" });
  }
};
