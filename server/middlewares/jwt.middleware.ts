import jwt,{Secret} from 'jsonwebtoken'
import dotenv from 'dotenv'
import { NextFunction, Request, Response } from 'express'
dotenv.config()
// const SECRET_KEY= process.env.JWT_SECRET as string
// const SECRET_KEY:Secret = process.env.JWT_SECRET as string ;
const SECRET_KEY:any= 'jwt'
console.log("secret key", SECRET_KEY)
export const generateToken = (payload:object, expiresIn:string|any)=>{
    // return jwt.sign(payload, SECRET_KEY, {expiresIn})
    return jwt.sign(payload, SECRET_KEY, { expiresIn }); 
}
 
export const verifyToken = (token:string)=>{
    try{
        const verification=jwt.verify(token, SECRET_KEY)
return verification
    }catch(err){
        console.log("error", err) 
        return err;    
    }
}


export const authenticate=(req:Request, res:Response, next:NextFunction):void=>{
try{
const authHeader = req.header("Authorization")
// console.log("authHeader")
console.log("authheader", authHeader)
if(!authHeader){
res.status(401).json({message:"No token provided"})
return;
}

 const  token:string|any=authHeader?.split(" ")[1]
if(!token) { res.status(401).json({message:"Access denied."})
     return;}
    const decoded = verifyToken(token)
    console.log("decoded", decoded)
if(!decoded) { res.status(401).json({message:"Invalid or expired token"}) 
    return}
        (req as any).user = decoded
next()}catch(err){
    res.status(500).json({message:"jwt catch error"})
}
}