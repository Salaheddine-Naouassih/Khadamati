import * as express from "express";
import { ServiceController } from "../controllers/serviceController";
import { Service } from "../entity/Service";
import { AppDataSource } from "../data-source";
import { joiBodyValidator, joiServiceSchema } from "../middlewares/Joi";
import { authenticateToken } from "../middlewares/authMiddleware";

const router = express.Router();

const serviceRepository = AppDataSource.getRepository(Service);
const serviceController = new ServiceController(serviceRepository);

router.post(
  "/create",
  joiBodyValidator(joiServiceSchema),
  authenticateToken,
  serviceController.createService.bind(serviceController)
);

router.get(
  "/get",
  joiBodyValidator(joiServiceSchema),
  serviceController.getService.bind(serviceController)
);

router.post(
  "/register",
  joiBodyValidator(joiServiceSchema),
  authenticateToken,
  serviceController.createService.bind(serviceController)
);

export default router;
