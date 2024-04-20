import * as express from "express";
import { ServiceController } from "../controllers/serviceController";
import { Service } from "../entity/Service";
import { AppDataSource } from "../data-source";
import { joiBodyValidator, joiServiceSchema } from "../middlewares/Joi";
import {
  authenticateToken,
  validateBuisness,
} from "../middlewares/authMiddleware";
import { User } from "../entity/User";

const router = express.Router();

const serviceRepository = AppDataSource.getRepository(Service);
const userRepository = AppDataSource.getRepository(User);
const serviceController = new ServiceController(serviceRepository);

router.post(
  "/create",
  joiBodyValidator(joiServiceSchema),
  authenticateToken,
  validateBuisness.bind(userRepository),
  serviceController.createService.bind(serviceController)
);

router.get(
  "/get",
  joiBodyValidator(joiServiceSchema),
  serviceController.getService.bind(serviceController)
);

export default router;
