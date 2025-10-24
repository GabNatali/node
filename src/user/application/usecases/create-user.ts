import { UserEntity } from '../../domain/entities/user.entity';
import { UserRepository } from "../../domain/repositories/user.repository";
import { UuidGenerator } from "../../domain/utils/uuiGenerator";
import { Email } from "../../domain/value-objects/email";



export class CreateUser {

    constructor(private readonly userRepository: UserRepository, private readonly _idGen: UuidGenerator){}

    async execute(rawEmail: string){

        const email = Email.create(rawEmail).toString();
        const exists = await this.userRepository.getByEmail(email);
        
        if (exists) throw new Error('email already exists');

        const usercreated = UserEntity.createNew({
            id: this._idGen.generate(),
            email,
        });

        const user = await this.userRepository.save(usercreated);

        return user;

    }
}