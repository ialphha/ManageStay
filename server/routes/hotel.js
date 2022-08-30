import express from 'express';
import formidable from 'express-formidable';
import{requireSignin,hotelOwner} from "../middleware";

//importing controllers of hotel section
import {create,hotelsList,image,sellerHotels, remove, read, update, userBookedHotels,isAlreadyBooked,searchList} from '../controllers/hotel';



const router =express.Router();



//routes for hotel section

router.post('/createHotel',requireSignin, formidable(), create);

router.get('/hotelslist',hotelsList);
router.get('/hotel/image/:id',image);
router.get("/seller-hotels",requireSignin,sellerHotels);
router.delete('/delete-hotel/:hotelId',requireSignin, hotelOwner, remove);

router.get('/hotel/:hotelId', read);

router.put("/editUpdateHotel/:hotelId",requireSignin, hotelOwner, formidable(), update);
router.get("/user-hotel-bookings", requireSignin,userBookedHotels);
router.get("/isalreadybooked/:hotelId",requireSignin,isAlreadyBooked);
router.post('/searchlist',searchList);
module.exports= router;