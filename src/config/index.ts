/* eslint-disable @typescript-eslint/no-empty-function */
import { config as _config } from "dotenv";
_config({ path: __dirname + "/../../.env" });
(process as any).send = process.send || function () {};

export const config = {
    isProduction: process.env.NODE_ENV === "production",

    appName: process.env.APP_NAME || "api",
    appTitle: process.env.APP_TITLE || "api",
    appDescription: process.env.APP_DESCRIPTION || "api",
    apiVersion: process.env.API_VERSION || "1.0",

    host: process.env.HOST || "0.0.0.0",
    port: parseInt(process.env.PORT) || 5000,

    // Logger
    mongodbUser: process.env.MONGODB_USER || "mongo",
    mongodbPassword: process.env.MONGODB_PASSWORD || "mongologger",
    mongodbHost: process.env.MONGODB_HOST || "mongo",
    mongodbPort: parseInt(process.env.POSTGRES_PORT) || 27017,

    postgres_host: process.env.POSTGRES_HOST || "postgres",
    postgres_port: parseInt(process.env.POSTGRES_PORT) || 5432,
    postgres_password: process.env.POSTGRES_PASSWORD || "postgres",
    postgres_db: process.env.POSTGRES_DB || "postgres",
    postgres_volume: process.env.POSTGRES_VOLUME || "pgdata",
    postgres_ip: process.env.POSTGRES_IP || "host.docker.internal",

};

import LoggerModuleConfig from "./modules/logger";

export { LoggerModuleConfig };

