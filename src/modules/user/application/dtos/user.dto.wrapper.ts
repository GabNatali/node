import { UserEntity } from "../../domain/entities/user.entity";
import { CreateUserDto, CreateUserSchema, UserResponseDto, UserResponseSchema } from "./user.dto";


export class UserDto  {

    constructor(public readonly email: string) {} 

    static fromRequest(req:{body: {[key: string]: any}}): CreateUserDto  {
        const { email } = CreateUserSchema.parse(req.body);
        return new UserDto(email);
    }
    static toResponse(entity: UserEntity): UserResponseDto {
        return UserResponseSchema.parse({
            id: entity.id,
            email: entity.email,
        });
    }
}