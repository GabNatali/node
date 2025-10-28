import { GetTasksByUserFilters } from '../../domain/dtos/get-tasks-by-user.dto';
import { TaskEntity } from '../../domain/entities/task.entity';
import { TaskRepository } from '../../domain/repository/task.repository';

export class GetByUserUseCase {
    constructor(
        private readonly taskRepository: TaskRepository
    ) {}
    async execute(userId: string, filters: GetTasksByUserFilters): Promise<TaskEntity[]> {
        return this.taskRepository.getAllByUser(userId,filters);
    }
}