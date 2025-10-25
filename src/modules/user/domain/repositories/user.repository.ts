import { UserEntity } from "../entities/user.entity";


export interface UserRepository  {
    save(user: UserEntity): Promise<UserEntity>;
    getByEmail(email: string): Promise<UserEntity | null>
    getUser(id:string): Promise<UserEntity | null>
}