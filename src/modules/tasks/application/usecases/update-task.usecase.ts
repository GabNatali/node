import { UpdateTaskDto } from '../dtos/task.dto';
import { TaskRepository } from '../../domain/repository/task.repository';
import { UpdateTask } from '../../domain/dtos/update-task.dto';
import { TaskEntity } from '../../domain/entities/task.entity';
import { TaskFindService } from '../../domain/services/task-by-id';
import { UpdateTaskMapper } from '../mappers/update.mapper';



export class UpdateTasskUseCase {
    constructor(
        private readonly taskRepositoy:TaskRepository,
        private readonly taskFindService:TaskFindService

    ){}

    async execute(id:string, data:UpdateTaskDto ):Promise<TaskEntity>{
        const task = await this.taskFindService.execute(id)
        const taskMapper = UpdateTaskMapper.update(data)
        task.updateTask(taskMapper)
        await this.taskRepositoy.updateById(id, taskMapper)
        return task
    } 
}