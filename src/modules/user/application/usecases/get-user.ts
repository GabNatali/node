import { UserRepository } from "../../domain/repositories/user.repository";


export class GetUser {

    constructor(private readonly userRepository: UserRepository){}

    async execute(id:string){
        const user = await this.userRepository.getUser(id);
        
        if (!user) throw new Error('user not found');

        return user;

    }
}