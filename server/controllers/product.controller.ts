import { Request, Response } from 'express'
import Product from '../auth/db/product.model'

export const createProduct = async (req:Request, res:Response)=>{
    try{
        const {name, description, stock, createdAt}= req.body;
        const product = new  Product({name, description, stock, createdAt})
       await product.save()
       res.status(201).json({message:"Product created", product})
       return
    }
catch(err:any){
    res.status(500).json({error:err.message})
    return
}}


export const updateProduct = async (req:Request, res:Response):Promise<void>=>{
    try{
const {id}= req.params;
const data = req.body;
const product = await Product.findByIdAndUpdate(id,data)
if(!product){
    res.status(404).json({message:"Product not found "})
}
res.status(201).json({message:"Product data updated sucessfully ", product})
    }catch(err:any){
        res.status(500).json({error:err.message})
    }
}

export const getAllProducts = async(req:Request, res:Response):Promise<void>=>{
try{
    const products = await Product.find({})
    res.status(200).json({message:"Products data fetched sucessfully", products})
    return;
}catch(err:any){
    res.status(500).json({error:err.message})
}
}

export const getOneProduct = async (req:Request, res:Response):Promise<void>=>{
    try{
        const {id} = req.params;
        if(!id){
            res.status(404).json({message:"Product Not Found"})
            return
        }
        const product = await Product.findById(id)
        res.status(200).json({message:"Product data fetched sucessfully", product})
    }catch(err:any){
        res.status(500).json({error:err.message})
    }
}


export const deleteProduct = async (req:Request, res:Response):Promise<void>=>{
try{
    const {id}= req.params;
    if(!id){
        res.status(404).json({messge:"Product id not found"})
        return
    }
    const product = await Product.findByIdAndDelete(id)
    if(!product){
        res.status(404).json({message:"Product not found"})
    }
    res.status(200).json({message:"Product deleted sucessfully"})
}catch(err:any){
    res.status(500).json({error:err.message})
}
}