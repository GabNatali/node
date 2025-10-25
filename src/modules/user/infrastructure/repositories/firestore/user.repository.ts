import { firestore } from "../../../../../data/firebase/firestore";
import { UserEntity } from "../../../domain/entities/user.entity";
import { UserRepository } from "../../../domain/repositories/user.repository";

const colletionUsers = firestore.collection("users")
export class FireStoreUserRepository implements UserRepository {
    async save(user: UserEntity): Promise<UserEntity> {
        console.log('Saving user to Firestore:', user);
        await colletionUsers.doc(user.id).set({
            id: user.id,
            email: user.email
        });
        return user;
    }
    async getByEmail(email: string): Promise<UserEntity | null> {
        console.log('Getting user by email from Firestore:', email);
        const doc = await colletionUsers.where("email", "==", email).limit(1).get();
        return doc.empty ? null : (doc.docs[0].data() as UserEntity);

    }
    async getUser(id: string): Promise<UserEntity | null> {
        const doc = await colletionUsers.doc(id).get();
        return doc.exists ? (doc.data() as UserEntity) : null;
    }
    
}