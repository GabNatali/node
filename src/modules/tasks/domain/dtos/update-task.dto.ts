import { TaskDescription } from "../value-objects/task-description.vo";
import { TaskTitle } from "../value-objects/task-title.vo";


export interface UpdateTask {
    title?: string,
    description?: string,
    isCompleted?:boolean,
}