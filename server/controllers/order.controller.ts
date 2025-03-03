import { Request, Response } from "express";
import Order from "../auth/db/order.model";
// import orderModel from "../auth/db/order.model";

export const getOrders = async(req:Request, res:Response):Promise<void>=>{
    try{
        const orders= await Order.find().populate("user").populate("products.product")
        if(!orders){
            res.status(404).json({message:"Order not found"})
            return
        }
        res.status(200).json({message:"Order fetched sucessfully", orders})
        return
    }catch(err:any){
        res.status(500).json({error:err.message})
        return
    }
}


export const createOrder = async (req:Request, res:Response)=>{
    try{
        const {user, products, totalAmount, status}=req.body;
        const order = new Order({user , products , totalAmount, status})
        await order.save()
        res.status(201).json({message:'Order created sucessfully', order})
    }catch(err:any){
        res.status(500).json({error:err.message})
    }
}

export const getOneOrder =async(req:Request, res:Response):Promise<void>=>{
    try{
        const {id}= req.params;
        if(!id){
            res.status(404).json({message:"Order id not found"})
            return
        }
        const order = Order.findById(id).populate("user").populate("products.products")
        if(!order){
            res.status(404).json({message:"Order not found"})
            return
        }
        res.status(200).json({message:"Order fetched sucessfully", order})

    }catch(err:any){
        res.status(500).json({error:err.message})
return    }
} 

export const updateOrder= async (req:Request, res:Response):Promise<void>=>
{
    try{
const {id}= req.params;
const data = req.body;

if(!data || id){
    res.status(401).json({message:"Invalid request"})
    return
}
const order = await Order.findByIdAndUpdate(id, data, {new:true})
res.status(201).json({message:"Order Updated sucessfully", order})
    }catch(err:any){
        res.status(500).json({error:err.message})
    }
}

export const deleteOrder = async (req:Request, res:Response):Promise<void>=>{
    try{
        const {id}= req.params;
        if(!id){
            res.status(404).json({message:"Order id not found"})
            return
        }
        const order = await Order.findByIdAndDelete(id)
        if(!order){
            res.status(404).json({message:"Order not found"})
return        }
        res.status(204).json({message:"Order deleted Sucessfully"})
        return
    }catch (err:any){
        res.status(500).json({error:err.message})
    }
}