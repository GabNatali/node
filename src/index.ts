import { envs } from "./config/env";
import { AppRoutes } from "./routes";
import { Server } from "./server";

const server = new Server({
    port: envs.PORT,
    corsOrigins: envs.CORS, 
    routes: AppRoutes.routes,
});

server.start();

