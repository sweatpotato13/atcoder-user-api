/* eslint-disable @typescript-eslint/no-empty-function */
import { config as _config } from "dotenv";
_config({ path: __dirname + "/../../.env" });
(process as any).send = process.send || function () {};

import { loggerConfig } from "./modules/logger";

export { loggerConfig };

export const config = {
    // Base
    isProduction: process.env.NODE_ENV === "production",
    // General
    appName: process.env.APP_NAME || "atcooderuserinfodb",
    appTitle: process.env.APP_TITLE || "atcooderuserinfodb",
    appDescription: process.env.APP_DESCRIPTION || "atcooderuserinfodb",
    // Server
    host: process.env.HOST || "0.0.0.0",
    port: parseInt(process.env.PORT) || 8000,
    rateLimitMax: process.env.RATE_LIMIT_MAX || 10000,
    // GRAPHQL
    graphqlEndpoint: process.env.GRAPHQL_ENDPOINT || "https://graphqlendpoint.com/v1/graphql",
};
