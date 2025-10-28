import { TaskTitle } from '../value-objects/task-title.vo';
import { TaskDescription } from '../value-objects/task-description.vo';
import { UpdateTask } from '../dtos/update-task.dto';

export interface TaskPrimitives {
  id: string;
  userId: string;
  title: string;
  description: string;
  isCompleted: boolean;
  active: boolean
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export class TaskEntity {
    public readonly id: string;
    public readonly userId: string;
    public readonly createdAt: Date;

    public title: TaskTitle;
    public description: TaskDescription;
    public isCompleted: boolean;
    public updatedAt: Date;
    public deletedAt: Date | null;
    public active: boolean

    private constructor(params: {
        id: string;
        userId: string;
        title: TaskTitle;
        description: TaskDescription;
        createdAt: Date;
        updatedAt: Date;
        isCompleted: boolean;
        active: boolean
        deletedAt: Date | null;
    }){
        this.id = params.id;
        this.userId = params.userId;
        this.title = params.title;
        this.description = params.description;
        this.createdAt = params.createdAt;
        this.updatedAt = params.updatedAt;
        this.isCompleted = params.isCompleted;
        this.deletedAt = params.deletedAt;
        this.active = params.active
    }

    static createTask(args: {id: string; userId: string; title: TaskTitle; description: TaskDescription; now?: Date;}): TaskEntity {
        const now = args.now ?? new Date();
        return new TaskEntity({
            id: args.id,
            userId: args.userId,
            title: args.title,
            description: args.description,
            createdAt: now,
            updatedAt: now,
            isCompleted: false,
            deletedAt: null,
            active:true
        });
    }


    static fromPrimitives(data: TaskPrimitives): TaskEntity {
        return new TaskEntity({
            id: data.id,
            userId: data.userId,
            title: new TaskTitle(data.title),
            description: new TaskDescription(data.description),
            createdAt: data.createdAt,
            updatedAt: data.updatedAt,
            isCompleted: data.isCompleted,
            deletedAt: data.deletedAt,
            active:data.active
        });
    }

    
    toPrimitives(): TaskPrimitives {
        return {
            id: this.id,
            userId: this.userId,
            title: this.title.getValue(),
            description: this.description.getValue(),
            isCompleted: this.isCompleted,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
            deletedAt: this.deletedAt,
            active:this.active
        };
    }

    updateTask(data:UpdateTask ) {

        if (data.title) this.title = new TaskTitle(data.title);
        if (data.description) this.description = new TaskDescription(data.description);
        if(data.isCompleted){ this.isCompleted = data.isCompleted}
        this.updatedAt = new Date();
    }

    updateCompleted(completed:boolean):void {
        this.isCompleted = completed
    }

    isActive(): boolean {
      return this.active === true;
    }

}
