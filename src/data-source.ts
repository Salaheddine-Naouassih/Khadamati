import "reflect-metadata";
import { DataSource } from "typeorm";
import { User, BuisnessUser } from "./entity/User";
import { getConfig } from "./utils/config";
import { RefreshToken } from "./entity/RefreshToken";
import { Service } from "./entity/Service";

const { DB_HOST, DB_PORT, POSTGRES_DB, POSTGRES_PASSWORD, POSTGRES_USER } =
  getConfig();
export const AppDataSource = new DataSource({
  type: "postgres",
  host: DB_HOST,
  port: DB_PORT,
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DB,
  synchronize: true,
  logging: false,
  entities: [User, RefreshToken, Service, BuisnessUser],
  migrationsRun: false,
  migrations: ["src/migrations/*.ts"],
  migrationsTableName: "history",
  subscribers: [],
});
