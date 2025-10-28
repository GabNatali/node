import { Router } from 'express';
import { UserRoutes } from './modules/user/application/routes';
import { AuthRoutes } from './modules/auth/routes';
import { TaskRoutes } from './modules/tasks/application/routes';
import { AuthMiddleware } from './shared/middleware/auth.midleware';



export class AppRoutes {
    static get routes(): Router {

        const router = Router();    
        const v1 = Router(); 
        
        router.use('/api/v1', v1);

        v1.use('/users', UserRoutes.routes );
        v1.use('/auth', AuthRoutes.routes );
        v1.use('/tasks',AuthMiddleware, TaskRoutes.routes );

        return router;
    }
}