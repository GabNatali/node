import { TaskRepository } from "../../domain/repository/task.repository";
import { TaskFindService } from "../../domain/services/task-by-id";




export class DeleteTaskUseCase {
    constructor(
        private readonly taskRepository:TaskRepository,
        private readonly taskFindService:TaskFindService
    ){}

    async execute(idTask:string):Promise<string> {
        const task = await this.taskFindService.execute(idTask)
        return this.taskRepository.deleteById(idTask)
    }
}