import User from "../auth/db/user.model";
import { Request, Response } from "express";
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
dotenv.config()
import jwt from 'jsonwebtoken'
import { generateToken } from "../middlewares/jwt.middleware";
import mongoose from "mongoose";
const saltRounds =parseInt(process.env.SALT||'10',10)
const SECRET_KEY = process.env.JWT_SECRET
interface IUser{
    name:string,
    email:string,
    password:string
}
export const signup = async (req:Request, res:Response ):Promise<void>=>{
try{
const {name, email , password}= req.body;
const existingUser = await User.findOne({email})
if(existingUser){
    res.status(401).json({message:'Email id already registed with us'})
}
const hassedPwd = await bcrypt.hash(password, saltRounds)

const user = new User({name, email , password:hassedPwd})
await user.save()
 res.status(201).json({message:'User created sucessfully . Login Now'})
}catch(err){
     res.status(500).json({error:err})
}
}

export const getOneuser= async(req:Request, res:Response):Promise<void>=>{
    try{
const userId = req.params;
const user= User.findById(userId)
if(!user){
     res.status(404).json({message:"User not found"}) 
     return;
}
 res.status(200).json({message:"User data fetced sucessfully" , user})
 return;
    }catch(err){
         res.status(500).json({error:err})
    }
}

export const deleteOneUser =async (req:Request, res:Response)=>{
    try{const {id}= req.params;

const user = await User.findByIdAndDelete(id)
if(!user){
    res.status(404).json({message:"User not found"})
    return;
}
res.status(204).json({message:"User deleted sucessfully"})
}catch(err:any){
        res.status(500).json({error:err.message})
    }
}
export const getAllUsers = async (req:Request, res:Response):Promise<void>=>{
    try{
        const users =await User.find({})
   res.status(200).json({message:"User data fetched sucessfully", users})
    }catch (err:any){
        console.log("user error")
     res.status(500).json({error:err?.message})
    }
}
export const updateUser= async(req:Request, res:Response):Promise<void>=>{
    try{
        let {id} = req.params;
        id= String(id).trim()
        console.log("Incoming Request:", req.params, req.body);
        console.log("id >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>" , id)
        if (!mongoose.Types.ObjectId.isValid(id)) {
            console.error("Invalid ID format:", id);
            res.status(400).json({ message: "Invalid user ID format" });
            return;
        }
      const  data= req.body
        const user = await User.findByIdAndUpdate(id, data, { new: true, runValidators: true })
        if(!user){
            console.log("user")
            res.status(401).json({message:"User not found"})
            return
        }
       res.status(201).json({message:"User data updated sucessfully", user})
    }catch(err:any){
        console.log("error", err)
        res.status(500).json({error:err?.message})
    }
}
export const login = async (req:Request, res:Response):Promise<void>=>{
        try{
    const {email , password} = req.body;
    const user:any = await User.findOne({email})
    // const user:any = User.find((u:any) => u.email === email);
    if(!user){
        res.status(400).json({message:"User Not Found"})
        return;
    }

    const isMatch = await bcrypt.compare(password, user?.password)
    if(!isMatch){
        res.status(401).json({message:"Invalid credintials"})
        return;
    }   
console.log('email', user.email)
    const token = generateToken({ email: user.email }, '24h');
console.log("token", token)
    res.status(200).json({message:"Login sucessful",token:token })
        }catch (err:any){

        res.status(500).json({error:err})
        return;
        }
    }
