import { Router } from "express";
import { AuthController } from "./application/controller";
import { FireStoreUserRepository } from "../user/infrastructure/repositories/firestore/user.repository";



export class AuthRoutes {
    static get routes(): Router {
        const router = Router();            

        const repository = new FireStoreUserRepository();
        const authController = new AuthController(repository);
(
        router.post('/login', authController.login));
        return router;
    }
}