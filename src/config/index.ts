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
    port: parseInt(process.env.PORT) || 3000,

    hasuraEndPoint: process.env.HASURA_ENDPOINT || "0.0.0.0",
    hasuraPort: parseInt(process.env.HASURA_PORT) || 8000,
    hasuraAdminSecret: process.env.HASURA_ADMINSECRET || "adminsecret",
    // Logger
    mongodbUser: process.env.MONGODB_USER || "",
    mongodbPassword: process.env.MONGODB_PASSWORD || "",
    mongodbHost: process.env.MONGODB_HOST || "",
    mongodbPort: process.env.MONGODB_PORT || "",
};

import LoggerModuleConfig from "./modules/logger";

export { LoggerModuleConfig };

