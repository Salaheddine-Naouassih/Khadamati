import * as express from "express";
import { AppDataSource } from "./data-source";
import * as cors from "cors";
import serviceRoutes from "./routes/serviceRoutes";
import userRoutes from "./routes/userRoutes";
export const createApp = async () => {
  await AppDataSource.initialize();

  const app = express();
  app.use(express.json());
  app.use(cors());
  app.use("/service", serviceRoutes);
  app.use("", userRoutes);
  return app;
};
