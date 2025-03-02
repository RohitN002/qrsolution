import mongoose , {Schema , Document } from 'mongoose'

export interface IProduct extends Document {
        name:string ,
        description:string,
        price :number,
        stock:number,
        createdAt:Date; 
}

const ProductSchema = new Schema <IProduct>({
    name:{type:String, required:true},
    description:{type:String, required:true},
    stock:{type:Number},
    createdAt:{type:Date, default:Date.now()}
})

export default mongoose.model<IProduct> ("Product", ProductSchema)