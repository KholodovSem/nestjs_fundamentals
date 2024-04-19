import { DataSource, DataSourceOptions } from "typeorm";

export const dataSourceOpt: DataSourceOptions = {
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "admin",
  password: "root",
  database: "nest_fundamentals",
  entities: ["build/**/*.entity.js"],
  migrations: ["build/migrations/*.js"]
};

export default new DataSource(dataSourceOpt);
