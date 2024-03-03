import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { secrets } from "../secretKeys";

interface RequestExtended extends Request {
  user?: any;
}

export function authenticateToken(
  req: RequestExtended,
  res: Response,
  next: NextFunction
) {
  const authHead = req.headers["authorization"];
  const token = authHead && authHead.split(" ")[1];
  if (!token) res.status(404).json({ message: "No token found" });

  jwt.verify(token!, secrets.jwt.secret, (err, user) => {
    if (err) {
      if (err.name === "TokenExpiredError") {
        res.status(403).json({ message: "Token expired login again" });
      }
      res.status(400).json({ message: "Failed to verify token", err });
    }
    req.user = user;
    next();
  });
}
