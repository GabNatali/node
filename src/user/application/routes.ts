import { Router } from 'express';
import { InMemoryUserRepository } from '../infrastructure/repositories/inMemory/user.repository.impl';
import { UserController } from './controller';
import { AuthMiddleware } from '../../shared/middleware/auth.midleware';


export class UserRoutes {
    static get routes(): Router {
        const router = Router();            

        const repository = new InMemoryUserRepository();
        const userController = new UserController(repository);
(
        router.post('/', userController.createUser));
        router.get('/me',AuthMiddleware, userController.me);
        return router;
    }
}