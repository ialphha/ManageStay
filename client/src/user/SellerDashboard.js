
import Accountinfo from "../components/Accountinfo";
import DashboardNav from "../components/DashBoardNav";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState, useEffect} from "react";
import {toast} from "react-toastify";
import { createConnectAccount } from "../actions/stripe";
import { deleteHotel, sellerHotels } from "../actions/hotel";
import HotelCard from "../components/cards/HotelCard";


const SellerDashboard=()=>{
    const {auth}=useSelector((state)=>({...state}));
    const [hotels,setHotels]=useState([]);
    const [loading, setLoading]=useState(false);

    useEffect(()=>{
       loadSellerHOtels();
    },[]);

    const loadSellerHOtels=async()=>{
        let {data}=await sellerHotels(auth.token);
        setHotels(data);
    }
    
    const handleDelete=async(hotelId)=>{
        if(!window.confirm("Are you planning to delete the hotel?"))return;
        deleteHotel(auth.token, hotelId).then((res)=>{
            toast.success("Hotel Deleted");
            loadSellerHOtels();

        });
    }

    
    const handleclick=async()=>{
        setLoading(true);
        try{
            let res=await createConnectAccount(auth.token);
            console.log(res);
            window.location.href = res.data;
        }
        catch(err){
            console.log(err);
            toast.error("stripe connect failed, try again!!");
            setLoading(false);
        }
    }

    const connected=()=>{
        return(
        <div className="container-fluid ">
          <div className="row">
              <div className="col-md-10">
                  <h2>Your hotels</h2>
              </div>
              <div className="col-md-2">
                  <Link to="/hotels/new" className="btn btn-primary"> Add New</Link>
              </div>
          </div>
          <div className="row">
            {
                hotels.map((e)=>(
                    <HotelCard key={e._id} e={e} showViewMoreButton={false} owner={true} handleHotelDelete={handleDelete}/>
                ))
            }
          </div>
        </div>
        );
    }

    const notconnected=()=>{
        return(
        <div className="container-fluid ">
          <div className="row">
              <div className="col-md-6 offset-md-3 text-center">
                  <div className="p-4 pointer">
                      <h4>Setup payouts to post hotel rooms</h4>
                      <p className=""> ManageStay is associated to stripe for transfer your earnings to your bank account</p>
                      <p> Note: We take a 15% fee from your sales</p>
                      <button className="btn btn-primary mb-3" onClick={handleclick} disabled={loading}>
                        {loading? "Processing":"Setup Payouts"}
                      </button>
                      <p className="text-muted"> <small>you'll be redirected to stripe</small></p>
                  </div>
              </div>
          </div>
        </div>
        );
    }
    return(
       <>
       <div className="container-fluid bg-secondary ">
          <Accountinfo/>
       </div>
       <div className="container-fluid bg-white text-dark p-4">
          <DashboardNav/>
       </div>

       {/* if the user have successfully connected */}
       {auth && auth.user && auth.user.stripe_seller && auth.user.stripe_seller.charges_enabled ? connected(): notconnected()}  

       </>
    );
};

export default SellerDashboard;