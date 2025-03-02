// import { Express } from "express";
import express from 'express'
import dotenv from 'dotenv'
dotenv.config();
import mongoose from 'mongoose';
// import { error } from 'console';
const app = express()
const mongo= process.env.MONGO as string
mongoose.connect(mongo).then(()=>console.log("mongoDB connected sucessfully")).catch((error)=>console.log(error))
app.listen(process.env.PORT,()=>{
    console.log(`application listening on a port ${process.env.PORT}`)
})  