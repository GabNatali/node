import { UuidGenerator } from '../../../../shared/utils/uuiGenerator';
import { TaskEntity } from '../../domain/entities/task.entity';
import { TaskRepository } from '../../domain/repository/task.repository';
import { TaskDescription } from '../../domain/value-objects/task-description.vo';
import { TaskTitle } from '../../domain/value-objects/task-title.vo';
import { CreateTaskDto } from '../dtos/task.dto';


export class CreateTaskUseCase {

    constructor(
        private readonly taskRepository:TaskRepository,
        private readonly uuid: UuidGenerator
    ){}

    async execute(dataTask:CreateTaskDto, userId:string): Promise<TaskEntity>{
        const task = TaskEntity.createTask({
            id: this.uuid.generate(),
            userId:userId,
            title: new TaskTitle(dataTask.title),
            description: new TaskDescription(dataTask.description),
        })

        const taskCreated = await this.taskRepository.create(task)
        return taskCreated
    }
}