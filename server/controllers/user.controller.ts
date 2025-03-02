import User from "../auth/db/user.model";
import { Request, Response } from "express";
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
dotenv.config()
import jwt from 'jsonwebtoken'
import { generateToken } from "../middlewares/jwt.middleware";
const saltRounds =parseInt(process.env.SALT||'10',10)
const SECRET_KEY = process.env.JWT_SECRET
export const signup = async (req:Request, res:Response )=>{
try{
const {name, email , password}= req.body;
const existingUser = await User.findOne({email})
if(existingUser){
    return res.status(401).json({message:'Email id already registed with us'})
}
const hassedPwd = await bcrypt.hash(password, saltRounds)

const user = new User({name, email , password:hassedPwd})
await user.save()
return res.status(201).json({message:'User created sucessfully . Login Now'})
}catch(err){
    return res.status(500).json({error:err})
}
}


export const login = async (req:Request, res:Response)=>{
    try{
const {email , password} = req.body;
const user:any = await User.find(email)
// const user:any = User.find((u:any) => u.email === email);
if(!user){
    return res.status(400).json({message:"User Not Found"})
}

const isMatch = await bcrypt.compare(password, user?.password)
if(!isMatch){
    return res.status(401).json({message:"Invalid credintials"})
}   
// const token= await jwt.sign(user.email,SECRET_KEY,{'1hr'})
// const token= generateToken({email:user?.email}, '1hr')
const token = generateToken({ email: user.email }, '1h');

return res.status(200).json({message:"Login sucessful", })
    }catch (err){
        return res.status(500).json({error:err})
    }
}