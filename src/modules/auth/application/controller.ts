import { Request, Response, NextFunction, RequestHandler } from "express";
import { UserRepository } from "../../user/domain/repositories/user.repository";
import { LoginUser } from "./usecases/login";
import { LoginDto } from "./dto/auth.dto";



export class AuthController {

    constructor(private readonly userRepository: UserRepository){}
    login : RequestHandler = async ( req: Request, res: Response, next: NextFunction) => {

        const parsedEmail = LoginDto.safeParse(req.body);
        if (!parsedEmail.success) return res.status(400).json({ errors: parsedEmail.error.issues[0].message });
            
        try {
   
            const token = await new LoginUser(this.userRepository).execute(parsedEmail.data.email);
            return res.status(200).json(token);

        } catch (error:any) {
            return res.status(400).json({ error: error.message });
        }
    }
}