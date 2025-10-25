import { Request, Response, NextFunction, RequestHandler } from "express";
import { UserRepository } from "../../user/domain/repositories/user.repository";
import { LoginUser } from "./usecases/login";



export class AuthController {

    constructor(private readonly userRepository: UserRepository){}
    login : RequestHandler = async ( req: Request, res: Response, next: NextFunction) => {

        try {
            const { email } = req.body;

            if (!email) return res.status(400).json({ message: 'Email is required' });

            const token = await new LoginUser(this.userRepository).execute(email);

            return res.status(200).json(token);

        } catch (error:any) {
            return res.status(400).json({ error: error.message });
        }
    }
}