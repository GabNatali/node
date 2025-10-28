import { TaskEntity } from '../../domain/entities/task.entity';
import { TaskRepository } from '../../domain/repository/task.repository';
import { TaskFindService } from '../../domain/services/task-by-id';

export class GetTaskByIdUseCase {
    constructor(
        private readonly taskFindService:TaskFindService
    ) {}

    async execute(id: string): Promise<TaskEntity> {
        const task = await this.taskFindService.execute(id)
        return task
    }
}
