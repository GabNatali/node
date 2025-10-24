import { Router } from 'express';
import { InMemoryUserRepository } from '../user/infrastructure/repositories/inMemory/user.repository.impl';
import { AuthController } from './application/controller';


export class AuthRoutes {
    static get routes(): Router {
        const router = Router();            

        const repository = new InMemoryUserRepository();
        const authController = new AuthController(repository);
(
        router.post('/login', authController.login));
        return router;
    }
}