import { GetTasksByUserFilters } from "../../domain/dtos/get-tasks-by-user.dto";
import { TaskListFilters } from "../dtos/filters.dto";


export class FiltersMapper {
    static toDomain(input: TaskListFilters): GetTasksByUserFilters {
      return {
        sortOrder: input.sortOrder,    
        completed: input.completed,     
      };
    }
  }