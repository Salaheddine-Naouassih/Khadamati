import * as jwt from "jsonwebtoken";
import { getConfig } from "../utils/config";
import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../data-source";
import { BuisnessUser, User } from "../entity/User";

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
    req.user = user as { email: string; id: number };
    next();
  });
}

async function validateBuisness(
  req: CustomRequest,
  res: Response,
  next: NextFunction
) {
  const userRepository = AppDataSource.getRepository(User);
  const buisnessUserRepository = AppDataSource.getRepository(BuisnessUser);
  const userExists = await userRepository.findOne({
    where: { email: req.user.email },
  });
  const isBusinessUser = await buisnessUserRepository.findOne({
    where: { userId: userExists["id"] },
  });
  if (!isBusinessUser) {
    return res
      .status(403)
      .json({ message: "Account not registered as a buisness" });
  }
  req.user = { email: req.user.email, id: userExists["id"] };
  next();
}
export { authenticateToken, validateBuisness };
