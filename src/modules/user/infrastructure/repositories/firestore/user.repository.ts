import { firestore } from "../../../../../data/firebase/firestore";
import { UserEntity } from "../../../domain/entities/user.entity";
import { UserRepository } from "../../../domain/repositories/user.repository";

const colletionUsers = firestore.collection("users").withConverter({
    toFirestore: (user: UserEntity):FirebaseFirestore.DocumentData => ({
        id: user.id,
        email: user.email,
    }),
    fromFirestore: (snapshot: FirebaseFirestore.QueryDocumentSnapshot): UserEntity => {
        const data = snapshot.data() as { id: string; email: string };
        return new UserEntity(data.id, data.email);
    },
})

export class FireStoreUserRepository implements UserRepository {
    async save(user: UserEntity): Promise<UserEntity> {
        await colletionUsers.doc(user.id).set({...user});
        return user;
    }
    async getByEmail(email: string): Promise<UserEntity | null> {
        const doc = await colletionUsers.where("email", "==", email).limit(1).get();
        return doc.empty ? null : (doc.docs[0].data());

    }
    async getUser(id: string): Promise<UserEntity | null> {
        const doc = await colletionUsers.doc(id).get();
        return doc.exists ? (doc.data()!) : null;
    }
    
}