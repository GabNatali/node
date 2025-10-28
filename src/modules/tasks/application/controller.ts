import { NextFunction, RequestHandler, Response ,Request,} from "express";
import { TaskRepository } from "../domain/repository/task.repository";
import { CreateTaskSchema, TaskIdSchema, UpdateTaskSchema } from "./dtos/task.dto";
import { ZodError } from "zod";
import { CreateTaskUseCase } from "./usecases/create-task.usecase";
import { UuidIdGenerator } from "../../user/infrastructure/uuidV4Generator";
import { GetByUserUseCase } from "./usecases/get-by-user";
import { TaskSchemaFilters } from "./dtos/filters.dto";
import { GetTaskByIdUseCase } from "./usecases/get-task-by-id.usecase";
import { DeleteTaskUseCase } from "./usecases/delete-task.usecase";
import { UpdateTasskUseCase } from "./usecases/update-task.usecase";
import { FiltersMapper } from "./mappers/filters.mapper copy";
import { TaskFindService } from "../domain/services/task-by-id";


export class TaskController {
    constructor(
        private readonly taskRepository: TaskRepository,
        private readonly taskFindService:TaskFindService

    ){}

    createTask : RequestHandler = async(req: Request , res:Response, next:NextFunction) => {
        try {
            const parsed = CreateTaskSchema.parse(req.body)
            const userId: string = req.auth!.userId;
            const result = await new CreateTaskUseCase(this.taskRepository,new UuidIdGenerator()).execute(parsed,userId);
            const task = result.toPrimitives()
            return res.status(201).json(task);
        } catch (error: any)  {

            if (error instanceof ZodError){
                return res.status(400).json({ errors: error.issues })
            };

            return  res.status(400).json({ errors: error.message });

        }
    };

    getTaskByUser : RequestHandler = async (req: Request , res:Response, next:NextFunction) => {
        try{
            const userId: string = req.auth!.userId;
            const parsed = TaskSchemaFilters.parse(req.query);
            const domainFilters = FiltersMapper.toDomain(parsed)
            const tasksEntities = await new GetByUserUseCase(this.taskRepository).execute(userId,domainFilters)

            const task = tasksEntities.map(taskEntity => taskEntity.toPrimitives())

            return res.status(200).json(task)
        } catch (error: any) {
            return  res.status(400).json({ errors: error.message });
        }
    };

    getTaskById : RequestHandler = async (req: Request , res:Response, next:NextFunction) => {
        try {
            const { idTask } = TaskIdSchema.parse(req.params);

            const task = await new GetTaskByIdUseCase(this.taskFindService).execute(idTask);
            return res.status(200).json(task!.toPrimitives());
          
        }catch(error: any) {
            return res.status(400).json({ errors: error })
        }
    }

    deleteTask: RequestHandler = async (req: Request , res:Response, next:NextFunction) => {
        try {
            const { idTask } = TaskIdSchema.parse(req.params);

            const id = await new DeleteTaskUseCase(this.taskRepository, this.taskFindService).execute(idTask)

            return res.status(200).json({
                message:"Eliminado correctamente",
                id
            });


        }catch(error: any){
            return res.status(400).json({ errors: error })
        }
    }

    updateTask: RequestHandler = async (req: Request , res:Response, next:NextFunction) => {
        try {
            const { idTask } = TaskIdSchema.parse(req.params);
            const data = UpdateTaskSchema.parse(req.body)
            const updated = await new UpdateTasskUseCase(this.taskRepository, this.taskFindService).execute(idTask, data)
            return res.status(200).json(updated.toPrimitives())
        } catch(error: any){
            return res.status(400).json({error:error})
        }
    }
}