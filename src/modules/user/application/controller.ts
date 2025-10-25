import { NextFunction,Response ,Request, RequestHandler } from 'express';
import { UserRepository } from '../domain/repositories/user.repository';
import { UuidIdGenerator } from '../infrastructure/uuidV4Generator';
import { CreateUser } from './usecases/create-user';
import { GetUser } from './usecases/get-user';
import { UserDto } from './dtos/user.dto.wrapper';


export class UserController {

    constructor(private readonly userRepository: UserRepository){}

    createUser:RequestHandler  = async( req: Request, res: Response) => {
        try {

            const emailRequest = UserDto.fromRequest(req);
            const user = await new CreateUser(this.userRepository,new UuidIdGenerator()).execute(emailRequest);
            const response = UserDto.toResponse(user);
            
            return res.status(201).json(response);

        } catch (error:any) {
            return res.status(400).json({ error: error.message });
        }

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