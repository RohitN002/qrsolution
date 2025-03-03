// import { Express } from "express";
import express from 'express'
import dotenv from 'dotenv'
dotenv.config();
import ProudctRoutes from './routes/product.routes'
import userRoutes from './routes/user.routes'
import mongoose from 'mongoose';
// import { error } from 'console';
const app = express()
app.use(express.json())
app.use('/api/users',userRoutes)
app.use('/api/product', ProudctRoutes)
const mongo= process.env.MONGO as string
mongoose.connect(mongo).then(()=>console.log("mongoDB connected sucessfully")).catch((error)=>console.log(error))
app.listen(process.env.PORT,()=>{
    console.log(`application listening on a port ${process.env.PORT}`)
})  