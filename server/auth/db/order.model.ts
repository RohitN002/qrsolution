import mongoose ,{Schema , Document } from 'mongoose'
import { IUser } from './user.model'
import { IProduct } from './product.model'

export interface IOrder extends Document{
    user:IUser["_id"],
    products:{product:IProduct["_id"], quantity:number}[],
    totalAmount :number,
    status:"pending"| "shipped"| "delivered"| 'cancelled',
    createdAt:Date
}

const OrderSchema = new Schema <IOrder>({
    user:{type:Schema.Types.ObjectId, ref:"User", required:true
    },
        products:[{
            product:{type:Schema.Types.ObjectId,ref:"Product", required:true }
            ,
                quantity:{type:Number, required:true}

}], 
totalAmount:{type:Number, required:true},
status:{
    type:String,
    enum:["pending", "shipped","delivered","cancelled"],
    default:"pending"
},
createdAt:{type:Date, default:Date.now()}

})

export default mongoose.model<IOrder>("Order", OrderSchema)