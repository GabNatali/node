import { Request, Response, NextFunction } from "express";
import { JwtAdapter } from "../../config/jwt.adapter";


export const AuthMiddleware = async(req:Request, res:Response, next:NextFunction) => {
    try {
        const h = req.headers.authorization;
        if (!h) return res.status(401).json({ error: 'token required' });

        const token = h.split(' ')[1];
        if (!token) return res.status(401).json({ error: 'token required' });
        
        const payload = await JwtAdapter.validateToken(token);
        if (!payload) return res.status(401).json({ error: 'token invalid o expired' });
        
        req.auth = { userId: payload.sub };
        
        next();

    } catch (error) {
        next(error);
    }
}