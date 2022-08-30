
import DashboardNav from "../components/DashBoardNav";
import Accountinfo from "../components/Accountinfo";
import { Link } from "react-router-dom";

import {userBookedHotels} from "../actions/hotel";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import ListBookingCard from "../components/cards/ListBookingCard"
const Dashboard=()=>{

    const {auth}=useSelector((state)=>({...state}));
    const {token}=auth;
    const [booking, setBooking]=useState([]);

    useEffect(()=>{
        loadUserBookings();
    },[]);


    const loadUserBookings=async()=>{
        const res= await userBookedHotels(token);
        setBooking(res.data);
    }
    return(
       <>
       <div className="container-fluid bg-secondary ">
            <Accountinfo/>
       </div>
       <div className="container-fluid p-4">
           <DashboardNav/>
       </div>
       <div className="container-fluid ">
          <div className="row">
              <div className="col-md-10">
                  <h2>Your bookings</h2>
              </div>
              <div className="col-md-2">
                  <Link to="/" className="btn btn-primary"> Find Rooms</Link>
              </div>
          </div>
         
          <div className="row">
            {booking.map((e)=>(
                <ListBookingCard key={e._id} hotel={e.hotel} session={e.session} orderedBy={e.orderedBy}/>
            ))}
          </div>
       </div>
       </>
    );
}; 

export default Dashboard;