import { Router } from "express";
import { FireStoreTaskRepository } from "../infrastructure/repository/firestore/task.repository";
import { TaskController } from "./controller";
import { TaskFinderImplService } from "../domain/services/task-by-id";


export class TaskRoutes {
    static get routes(): Router {
        const router = Router();            

        const repository = new FireStoreTaskRepository;
        const taskService = new TaskFinderImplService(repository)
        const taskController = new TaskController(repository , taskService);
(
        router.post('/', taskController.createTask));
        router.get('/user', taskController.getTaskByUser)
        router.get('/:idTask', taskController.getTaskById)
        router.patch('/:idTask', taskController.updateTask)
        router.delete('/:idTask', taskController.deleteTask)

        return router;
    }
}