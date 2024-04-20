import * as jwt from "jsonwebtoken";
import { getConfig } from "../utils/config";
import { Request, Response, NextFunction } from "express";
import { func } from "joi";

export interface CustomRequest extends Request {
  user: {
    email: string;
    id?: number;
  };
}

function authenticateToken(
  req: CustomRequest,
  res: Response,
  next: NextFunction
) {
  const authHeader =
    req.headers["authorization"] || (req.headers["Authorization"] as string);
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);
  jwt.verify(token, getConfig().ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      console.log(err);
      return res.sendStatus(403);
    }
    req.user = user as { email: string };
    next();
  });
}

function validateBuisness(
  req: CustomRequest,
  res: Response,
  next: NextFunction
) {
  const user = req.user;
  const isBusinessUser = this.buisnessUserRepository.findOne({
    where: { userId: user.id },
  });

  if (!isBusinessUser) {
    return res.status(403).json({ message: "User is not a business user" });
  }
  next();
}
export { authenticateToken, validateBuisness };
