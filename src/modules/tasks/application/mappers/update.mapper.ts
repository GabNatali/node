import { UpdateTask } from "../../domain/dtos/update-task.dto";
import { TaskDescription } from "../../domain/value-objects/task-description.vo";
import { TaskTitle } from "../../domain/value-objects/task-title.vo";
import { UpdateTaskDto } from "../dtos/task.dto";


export class UpdateTaskMapper {
    static update(input: UpdateTaskDto): UpdateTask {
  
      const filtered = Object.fromEntries(
        Object.entries(input).filter(([_, v]) => v !== undefined && v !== null)
      );

      return filtered as UpdateTask ;
    }
  }