import { pool } from "../database/db";
import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { secrets } from "../secretKeys";

// create the users table
pool
  .connect()
  .then(() => {
    pool.query(`
            CREATE TABLE IF NOT EXISTS users(
                id SERIAL PRIMARY KEY,
                name VARCHAR(50) NOT NULL,
                email VARCHAR(50) UNIQUE NOT NULL,
                password VARCHAR(200) NOT NULL
              )
        `);
  })
  .catch((err) =>
    console.log("Error in connecting to the database on creating table: ", err)
  );

// user registration
export const register = async (req: Request, res: Response): Promise<void> => {
  const { name, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await pool.query(
      `INSERT INTO users (name, email, password) VALUES ($1,$2,$3)`,
      [name, email, hashedPassword]
    );

    res.status(200).json({ message: "Registration successful" });
  } catch (error) {
    console.log(`Error in registering: ${error}`);
    res.status(404).json({ message: "Not found" });
  }
};

//  user login
export const login = async (req: Request, res: Response): Promise<void> => {
  const { name, email, password } = req.body;
  try {
    const user = await pool.query(`SELECT * FROM users WHERE email = $1`, [
      email,
    ]);
    if (!user) res.status(404).json({ message: "No user found" });

    const currentUser = user.rows[0];
    const userPassword = currentUser.password;

    const passwordMatch = await bcrypt.compare(password, userPassword);
    if (!passwordMatch) res.status(400).json({ message: "Incorrect password" });

    //-----sign the token
    const token = jwt.sign({ user_id: currentUser.id }, secrets.jwt.secret, {
      expiresIn: "1h",
    });

    res.status(200).json({ message: "login success", token: token });
  } catch (error) {
    console.log(`Error in logging in: ${error}`);
    res.status(500).json({ message: "Internal server error" });
  }
};
