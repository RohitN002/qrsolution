import { Request, Response } from "express";
import Order from "../auth/db/order.model";

export const getOrders = async(req:Request, res:Response):Promise<void>=>{
    try{}catch(err:any){
        res.status(500).json({error:err.message})
    }
}