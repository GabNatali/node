import { JwtAdapter, JwtPayload } from "../../../config/jwt.adapter";
import { UserRepository } from "../../../user/domain/repositories/user.repository";
import { Email } from "../../../user/domain/value-objects/email";



export class LoginUser {

    constructor(private readonly repository: UserRepository ){}

    async execute(rawEmail: string){

        const email = Email.create(rawEmail).toString();
        const user = await this.repository.getByEmail(email);

        if (!user) throw new Error('user not found');

        const jwtPayload = { userId: user.id, duration: '1d'} as JwtPayload

        const token = await JwtAdapter.generateToken(jwtPayload);

        if (!token) throw new Error('token not generated');

        return { token };
    }
}