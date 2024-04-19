import * as express from "express";
import { AppDataSource } from "./data-source";
import { authenticateToken } from "./middlewares/authMiddleware";
import { User } from "./entity/User";
import {
  joiBodyValidator,
  joiLoginSchema,
  joiRefreshTokenSchema,
  joiServiceSchema,
  joiSignupSchema,
} from "./middlewares/Joi";
import { RefreshToken } from "./entity/RefreshToken";
import { UserController } from "./controllers/userController";
import * as cors from "cors";
import { ServiceController } from "./controllers/serviceController";
import { Service } from "./entity/Service";

export const createApp = async () => {
  await AppDataSource.initialize();

  const userRepository = AppDataSource.getRepository(User);
  const refreshTokenRepository = AppDataSource.getRepository(RefreshToken);
  const serviceRepository = AppDataSource.getRepository(Service);

  const userController = new UserController(
    userRepository,
    refreshTokenRepository
  );
  const serviceController = new ServiceController(serviceRepository);

  const app = express();

  app.use(express.json());
  app.use(cors());

  app.post(
    "/service",
    joiBodyValidator(joiServiceSchema),
    authenticateToken,
    serviceController.createService.bind(serviceController)
  );

  app.get("/service", serviceController.getService.bind(serviceController));

  app.post(
    "/register",
    joiBodyValidator(joiSignupSchema),
    userController.register.bind(userController)
  );

  app.post(
    "/token",
    joiBodyValidator(joiRefreshTokenSchema),
    userController.refreshToken.bind(userController)
  );

  app.post(
    "/login",
    joiBodyValidator(joiLoginSchema),
    userController.login.bind(userController)
  );

  app.post(
    "/logout",
    authenticateToken,
    userController.logout.bind(userController)
  );

  return app;
};
