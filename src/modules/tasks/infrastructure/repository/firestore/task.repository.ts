import { firestore } from '../../../../../data/firebase/firestore';
import { GetTasksByUserFilters } from '../../../domain/dtos/get-tasks-by-user.dto';
import { TaskEntity } from '../../../domain/entities/task.entity';
import { TaskRepository } from '../../../domain/repository/task.repository';
import { Timestamp } from 'firebase-admin/firestore';
import { reponseDelete } from '../../../domain/dtos/response-delete';
import { UpdateTask } from '../../../domain/dtos/update-task.dto';


const collectionTask = firestore.collection("tasks").withConverter({
    toFirestore(task: any) {
        return {
          ...task,
          createdAt: Timestamp.fromDate(task.createdAt),
          updatedAt: Timestamp.fromDate(task.updatedAt),
        };
    },
    fromFirestore(snapshot: FirebaseFirestore.QueryDocumentSnapshot) {
        const data = snapshot.data();
        return {
          id: snapshot.id,
          ...data,
          createdAt: data.createdAt.toDate(),
          updatedAt: data.updatedAt.toDate(),
        };
    }
})
export class FireStoreTaskRepository implements TaskRepository {

    async getAllByUser(userId: string, filters: GetTasksByUserFilters): Promise<TaskEntity[]> {
        let q = collectionTask
            .where("userId", "==", userId)
            .where("deletedAt", "==", null); 

        q = typeof filters.completed === "boolean" ? q.where("isCompleted", "==", filters.completed) : q
        q =q.orderBy('createdAt', filters.sortOrder || 'asc')
            
        const snapshot = await q.get()

        return  snapshot.empty ? [] :  snapshot.docs.map(doc => TaskEntity.fromPrimitives(doc.data()))
    }

    async create(task:TaskEntity): Promise<TaskEntity> {
        const doc = await collectionTask.doc(task.id).set({...task.toPrimitives()})
        return task
    }

    async getById(id: string): Promise<TaskEntity | null> {
        const docSnap = await collectionTask.doc(id).get();
        if (!docSnap.exists) throw null;
        return TaskEntity.fromPrimitives(docSnap.data());
    }
    
    async updateById(id: string , data:UpdateTask): Promise<void> {
        await collectionTask.doc(id).update({
            ...data,
        });
    }
    async deleteById(id: string): Promise<string> {
        await collectionTask.doc(id).update({
            deletedAt: Timestamp.now(),
            active: false
        });

        return id;

    }

}