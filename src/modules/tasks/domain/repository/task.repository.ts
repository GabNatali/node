import { GetTasksByUserFilters } from '../dtos/get-tasks-by-user.dto';
import { UpdateTask } from '../dtos/update-task.dto';
import { TaskEntity } from '../entities/task.entity';


export interface TaskRepository {
    create(task:TaskEntity): Promise<TaskEntity>
    getAllByUser(userId:string, filters:GetTasksByUserFilters): Promise<TaskEntity[]>
    getById(id:string): Promise<TaskEntity | null>
    updateById(id:string , data:UpdateTask):Promise<void>
    deleteById(id:string): Promise<string>
}