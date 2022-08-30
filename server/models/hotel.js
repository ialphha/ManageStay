import mongoose from "mongoose";

const {Schema}=mongoose;
const {ObjectId}=mongoose.Schema;

/**/
/*
NAME: hotelSchema
        

SYNOPSIS: hotelSchema : Model for hotels
        

DESCRIPTION: Model for hotels:
            Using Mongoose
RETURNS : 
        none


*/
/**/
const hotelSchema= new Schema({
    title:{
        type: String,
        required:'Title is required'
    },
    content:{
        type: String,
        required:'content is required',
        maxlength:10000
    },
    location:{
        type: String,
        required:'location is required',
    },
    price:{
        type: Number,
        required:'Price is required',
        trim:true
    },
    postedBy:{
        type: ObjectId,
        ref:"User"
    },
    postedPhone:{
        type:String,
        required: 'Phone is required',
    },
    postedEmail:{
        type:String,
        required: "email is required",
    },
    image:{
        data: Buffer,
        contentType: String
    },
    from:{
        type: Date
    },
    to:{
        type: Date
    },
    bed:{
        required:"Number of beds are required",
        type: Number,
        
    },
    lat:{
        type:Number
    },
    lng:{
        type:Number
    }
    
},{timestamps:true});

//Named as Hotel
export default mongoose.model('Hotel', hotelSchema);