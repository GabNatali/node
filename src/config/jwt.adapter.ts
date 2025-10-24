import jwt, {SignOptions } from 'jsonwebtoken';
import { envs } from './env';

const JWT_SECRET = envs.JWT_SECRET || '';

export interface JwtPayload {
    userId: string
    duration: string
}
export class JwtAdapter {
    static async generateToken( payload: JwtPayload): Promise<string | null> {
        return new Promise<string | null>((resolve)=> {
            const {userId , duration} = payload;
            jwt.sign({}, JWT_SECRET,{subject: userId, expiresIn: duration} as SignOptions,
                (error, token)  => (error || !token) ? resolve(null) : resolve(token));   
        })
    }

    static validateToken(token: string): Promise<any | null> {
        return new Promise((resolve) => {
            jwt.verify(token, JWT_SECRET, (err, decoded)  => (err || !decoded) ? resolve(null) : resolve(decoded));
        })
    }


}
