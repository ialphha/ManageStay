//file system in node.js
import fs from "fs";

import Hotel from "../models/hotel";
import Order from "../models/order";

/**/
/*
NAME: create(req, res)
        

SYNOPSIS: create(req, res)


DESCRIPTION: used to create the hotel requested from the view in the client side

        using a fs to store the image data as storing it and loading large data is expensive
        saving hotel 

RETURNS : 
        returns response of json object if hotel is saved succesfully or send error response 



*/
/**/

export const create=async (req, res)=>{

    try{
        let fields=req.fields;
        let files= req.files;
        let hotel=new Hotel(fields);
        //adding postedBy in hotel
        hotel.postedBy=req.user._id;
       

        //reading image:
        if(files.image){
            hotel.image.data=fs.readFileSync(files.image.path);
            hotel.image.contentType= files.image.type;
        }
        hotel.save((err,result)=>{
            if(err){
                console.log("saving hotel err=>", err);
                res.status(400).send(`Error in storing new hotel data: ${err}`);
            }
            //sending the data if no error
            res.json(result);            
        })
    }
    catch(err){
        console.log(err);
        res.status(400).json({ err: err.message});
    }
}

/**/
/*
NAME: image(req, res)
        

SYNOPSIS:image(req, res)


DESCRIPTION: async funciton for sending the image of a hotel from req if it exists
         

RETURNS : 
        returns response if  from Hotel and  req.params.id matches and image exists


*/
/**/

export const image=async(req, res)=>{
    let hotel=await Hotel.findById(req.params.id).exec();
    if(hotel&& hotel.image && hotel.image.data!==null){
        res.set('Content-Type',hotel.image.contentType);
        return res.send(hotel.image.data);
    }
}
/**/
/*
NAME: hotelsList=async(req, res)
        

SYNOPSIS:hotelsList=async(req, res)


DESCRIPTION: async funciton for sending a response 
         

RETURNS : 
        returns response hotels from Hotel model after current day


*/
/**/


export const hotelsList=async(req, res)=>{
    let all= await Hotel.find({from:{$gte: new Date()}}).limit(100).select('-image.data').populate("postedBy","_id name").exec();

    res.json(all);
}

/**/
/*
NAME: remove
        

SYNOPSIS:remove( req, res):
      


DESCRIPTION: takes the hotelId from req.params and deletes it from Hotel model


RETURNS : 
        returns status


*/
/**/
// sending the data except the image for faster retrive using select "- .obj"
export const remove=async(req, res)=>{
    let removed =await Hotel.findByIdAndDelete(req.params.hotelId).select("-image.data").exec();
    res.json(removed);
}


/**/
/*
NAME: sellerHotels
        

SYNOPSIS: sellerHotels( req, res):
        

DESCRIPTION: async function to return hotels posted by the user from req.user

RETURNS : 
        returns a list of hotels of the signed-in seller.


*/
/**/
export const sellerHotels=async(req, res)=>{
    let all= await Hotel.find({postedBy:req.user._id}).select('-image.data').populate("postedBy","_id name").exec();
    res.send(all);
}


/**/
/*
NAME: read= async (req, res
        

SYNOPSIS: read= async (req, res)
        

DESCRIPTION: async function to return hotel's information 
RETURNS : 
        returns hotel's information 


*/
/**/
export const read= async (req, res)=>{
    let hotel =await Hotel.findById(req.params.hotelId).populate("postedBy","_id name").select("-image.data").exec();
    res.json(hotel);
}



/**/
/*
NAME: update=async( req, res)
        

SYNOPSIS:update=async( req, res)
        

DESCRIPTION: async function to update hotel's information 
            similar to create, have fs to handle image and update the data from the Hotel

RETURNS : 
        returns status of update requested from the view


*/
/**/
export const update=async( req, res)=>{
    try{
        let fields=req.fields;
        let files=req.files;
        let data={...fields};
        if(files.image){
            let image={}
            image.data= fs.readFileSync(files.image.path)
            image.contentType=files.image.type;
            data.image=image;
        }
        //
        let updated=await Hotel.findByIdAndUpdate(req.params.hotelId, data,{
            new :true
        }).select("-image.data");
        res.json(updated);
    }
    catch(err){
        console.log(err);
        res.status(400).send("Hotel update error!!");
    }
}

/**/
/*
NAME: userBookedHotels=async(req,res)
        

SYNOPSIS:userBookedHotels=async(req,res)
        

DESCRIPTION: async function to return a list of hotels booked by the user. 

RETURNS : 
        returns status of update requested from the view


*/
/**/

export const userBookedHotels=async(req,res)=>{
    const all=await Order.find({orderedBy:req.user._id}).select("session").populate("hotel","-image.data").populate("orderedBy","_id name").exec();
    res.json(all);

};



export const isAlreadyBooked=async(req, res)=>{
    const {hotelId}=req.params;

    //find the orders of the logged in user
    const userOrders=await Order.find({}).select("hotel").exec();


    //check if the hotel's matches with the userorders []

    let ids=[];
    for (let i=0; i<userOrders.length;i++){
        ids.push(userOrders[i].hotel.toString());
    }

    res.json({
        ok:ids.includes(hotelId),
        
    });

}

export const searchList=async(req,res)=>{
    const {location, date, bed}= req.body;
    let searchDate=date.split(',');
    let list =await Hotel.find({from:{$gte:new Date(searchDate[0])},location}).select("-image.data").exec();
    res.json(list);

}
