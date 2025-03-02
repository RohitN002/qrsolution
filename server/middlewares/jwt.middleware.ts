import jwt,{Secret} from 'jsonwebtoken'
import dotenv from 'dotenv'
import { NextFunction, Request, Response } from 'express'
dotenv.config()
// const SECRET_KEY= process.env.JWT_SECRET as string
const SECRET_KEY:Secret = process.env.JWT_SECRET as string || 'default_secret_key';

export const generateToken = (payload:object, expiresIn:string|any)=>{
    // return jwt.sign(payload, SECRET_KEY, {expiresIn})
    return jwt.sign(payload, SECRET_KEY, { expiresIn }); 
}
 
export const verifyToken = (token:string)=>{
    try{
return jwt.verify(token, SECRET_KEY)
    }catch(err){
        return null;    
    }
}


export const authenticate=(req:Request, res:Response, next:NextFunction)=>{
 const  token = req.header("Authenticate")?.split("")[1]
if(!token) return res.status(401).json({message:"Access denied."})
    const decoded = verifyToken(token)
if(!decoded) {return res.status(401).json({message:"Invalid or expired token"})}
        (req as any).user = decoded
next()
}