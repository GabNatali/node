import { TaskEntity } from "../entities/task.entity";
import { TaskRepository } from "../repository/task.repository";

export interface TaskFindService {
    execute(id:string): Promise<TaskEntity>
}

export class TaskFinderImplService implements TaskFindService {
    constructor(
        private readonly taskRepository: TaskRepository
    ) {}

    async execute(id: string): Promise<TaskEntity> {
        const task = await this.taskRepository.getById(id);

        if (!task) throw `Task with id ${ id } not found`;
        if (!task.isActive()) throw `Task with id ${ id } already been deleted` 

        return task
    }
}