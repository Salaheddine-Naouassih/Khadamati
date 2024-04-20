import * as express from "express";
import { joiSignupSchema } from "../middlewares/Joi";
import { AppDataSource } from "../data-source";
import {
  joiBodyValidator,
  joiLoginSchema,
  joiRefreshTokenSchema,
  joiBuisnessUserSchema,
} from "../middlewares/Joi";
import {
  authenticateToken,
  validateBuisness,
} from "../middlewares/authMiddleware";
import { UserController } from "../controllers/userController";
import { User, BuisnessUser } from "../entity/User";
import { RefreshToken } from "../entity/RefreshToken";
import Joi = require("joi");
const router = express.Router();

const userRepository = AppDataSource.getRepository(User);
const refreshTokenRepository = AppDataSource.getRepository(RefreshToken);
const buisnessUserRepository = AppDataSource.getRepository(BuisnessUser);
const userController = new UserController(
  userRepository,
  refreshTokenRepository,
  buisnessUserRepository
);

router.post(
  "/register",
  joiBodyValidator(joiSignupSchema),
  authenticateToken,
  userController.register.bind(userController)
);

router.post(
  "/login",
  joiBodyValidator(joiLoginSchema),
  userController.login.bind(userController)
);

router.post(
  "logout",
  authenticateToken,
  userController.logout.bind(userController)
);

router.post(
  "/token",
  joiBodyValidator(joiRefreshTokenSchema),
  userController.refreshToken.bind(userController)
);

router.post(
  "/buisness/register",
  joiBodyValidator(joiBuisnessUserSchema),
  authenticateToken,
  userController.registerBuisnsess.bind(userController)
);

router.delete(
  "/buisness/remove",
  authenticateToken,
  validateBuisness,
  userController.removeBuisness.bind(userController)
);

export default router;
