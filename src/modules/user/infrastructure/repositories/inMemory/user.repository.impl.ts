import { UserEntity } from "../../../domain/entities/user.entity";
import { UserRepository } from "../../../domain/repositories/user.repository";

export class InMemoryUserRepository implements UserRepository {
    
    private static _instance: InMemoryUserRepository | null = null;
    private users: UserEntity[] = [];

    constructor() { 
        if (InMemoryUserRepository._instance) {
            return InMemoryUserRepository._instance;
        }
        InMemoryUserRepository._instance = this;
    }
    async getByEmail(email: string): Promise<UserEntity | null> {
        const userFound = this.users.find(u => u.email === email) || null;
        if (userFound === undefined) return null
        return userFound

    }

    save(user: UserEntity): Promise<UserEntity> {
        this.users.push(user);
        return Promise.resolve(user);
    }

    getUser(id:string): Promise<UserEntity | null> {
        const user = this.users.find(u => u.id === id);
        if (!user) return Promise.resolve(null);
        return Promise.resolve(user);
    }
}