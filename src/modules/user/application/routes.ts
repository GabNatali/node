import { Router } from "express";
import { UserController } from "./controller";
import { AuthMiddleware } from "../../../shared/middleware/auth.midleware";
import { FireStoreUserRepository } from "../infrastructure/repositories/firestore/user.repository";


export class UserRoutes {
    static get routes(): Router {
        const router = Router();            

        const repository = new FireStoreUserRepository();
        const userController = new UserController(repository);
(
        router.post('/', userController.createUser));
        router.get('/me',AuthMiddleware, userController.me);
        return router;
    }
}