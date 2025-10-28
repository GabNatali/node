import { UserEntity } from "../../domain/entities/user.entity";
import { UserRepository } from "../../domain/repositories/user.repository";
import { UuidGenerator } from "../../../../shared/utils/uuiGenerator";
import { Email } from "../../domain/value-objects/email";
import { CreateUserDto } from "../dtos/user.dto";


export class CreateUser {

    constructor(private readonly userRepository: UserRepository, private readonly _idGen: UuidGenerator){}

    async execute(rawEmail: CreateUserDto){

        const email = Email.create(rawEmail.email).toString();
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