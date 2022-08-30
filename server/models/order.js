import mongoose from 'mongoose';
const {ObjectId}=mongoose.Schema;

/**/
/*
NAME: orderSchema
        

SYNOPSIS: OrderSchema : Model for hotels
        

DESCRIPTION: Model for Orders:
            Using Mongoose
RETURNS : 
        none


*/
/**/
const orderSchema= new mongoose.Schema({
    hotel:{
        type:ObjectId,
        ref:"Hotel"
    },
    session:{},
    orderedBy:{
        type:ObjectId, 
        ref:"User"
    }
},
    {timestamps: true}
);
export default mongoose.model("Order", orderSchema);