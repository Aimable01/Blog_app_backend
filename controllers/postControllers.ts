import { pool } from "../database/db";
import express, { Request, Response } from "express";
pool
  .connect()
  .then(() => {
    pool.query(`
        CREATE TABLE IF NOT EXISTS posts(
            id SERIAL PRIMARY KEY,
            title VARCHAR(100) NOT NULL,
            content TEXT NOT NULL,
            likes INT DEFAULT 0,
            created_at DATE DEFAULT CURRENT_DATE,
            author_id INT NOT NULL,
            FOREIGN KEY(author_id) REFERENCES users(id)
        )  
    `);
  })
  .catch((err) => {
    console.log(`Error in connecting to the database at create Posts: ${err}`);
  });

//   create a post
export const createPost = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { title, content, author_id } = req.body;
  try {
    const post = await pool.query(
      `INSERT INTO posts (title, content, author_id) VALUES ($1,$2,$3)`,
      [title, content, author_id]
    );
    res.status(200).json({ message: "Created post successful" });
  } catch (error) {
    console.log(`Error in creating a post: ${error}`);
    res.status(500).json({ message: "Internal server error" });
  }
};

//  view posts
export const viewPosts = async (req: Request, res: Response): Promise<void> => {
  try {
    const posts = await pool.query(
      `SELECT 
          users.name, posts.title, posts.content, posts.created_at, comments.comment_content
       FROM 
          users 
       INNER JOIN 
           posts ON posts.author_id = users.id
       LEFT JOIN 
           comments ON posts.id = comments.post_id     
       `
    );
    res.status(200).json({ message: posts.rows });
  } catch (error) {
    console.log(`Error in viewing all posts: ${error}`);
    res.status(404).json({ message: "Not found" });
  }
};

//  update a post
export const updatePost = async (
  req: Request,
  res: Response
): Promise<void> => {
  const id = req.params.id;
  const { title, content } = req.body;
  try {
    await pool.query(`UPDATE posts SET title = $1, content = $2`, [
      title,
      content,
    ]);
    res.status(200).json({ message: "Updated post sucessfully" });
  } catch (error) {
    console.log(`Error in updating a post: ${error}`);
    res.status(500).json({ message: "Internal server error" });
  }
};

//   delete a post
export const deletePost = async (
  req: Request,
  res: Response
): Promise<void> => {
  const id = req.params.id;
  try {
    await pool.query(`DELETE FROM posts WHERE id = ${id}`);
    res.status(200).json({ message: "Deleted post successfully" });
  } catch (error) {
    console.log(`Error in deleting post: ${error}`);
    res.status(500).json({ message: "Internal server error" });
  }
};
