import expressJwt from "express-jwt";
import Hotel from "../models/hotel";


/**/
/*
NAME: requireSignin
        

SYNOPSIS: requireSignin
           expressJwt({
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"],
});
          


DESCRIPTION: using express JWT, restricts unauthoried users

RETURNS : 
        none


*/
/**/

export const requireSignin = expressJwt({
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"],
});

/**/
/*
NAME: hotelOwner

SYNOPSIS: hotelOwner(req, res, next)
          


DESCRIPTION: for restricting the access only to the hotel owner, for edit and delete
RETURNS : 
        none 


*/
/**/

export const hotelOwner=async(req, res, next)=>{
  let hotel =await Hotel.findById(req.params.hotelId).exec();

if(hotel){if(hotel.postedBy._id.toString()===req.user._id.toString()){
  next();
 }
 else{
  return res.status(403).send("unauthorized");
 }
}

}
