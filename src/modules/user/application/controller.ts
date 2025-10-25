import { NextFunction,Response ,Request, RequestHandler } from 'express';
import { UserRepository } from '../domain/repositories/user.repository';
import { UuidIdGenerator } from '../infrastructure/uuidV4Generator';
import { CreateUser } from './usecases/create-user';
import { GetUser } from './usecases/get-user';


export class UserController {

    constructor(private readonly userRepository: UserRepository){}

    createUser:RequestHandler  = ( req: Request, res: Response) => {
        const { email } = req.body;

        if (!email) return res.status(400).json({ message: 'Email is required' });
        

        new CreateUser(this.userRepository,new UuidIdGenerator()).execute(email)
        .then(user => res.status(200).json(user))
        .catch(err => res.status(400).json({error:err.message}));
    }

    me: RequestHandler = async( req: Request, res: Response) => {
        try{

            const userId  = req.auth!.userId;
            const userCase = new GetUser(this.userRepository);
            const user = await userCase.execute(userId);
            return res.status(200).json({...user});

        }catch(error : any){
            return res.status(404).json({ error: error.message });
        }


    }
}