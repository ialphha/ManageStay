import { useState, useEffect } from "react";
import {availableHotels} from "../actions/hotel";
import HotelCard from "../components/cards/HotelCard";
import SearchHotel from "../components/Forms/SearchHotel";

const Search=()=>{
    const [hotels,setHotels]=useState([]);
    
    useEffect(()=>{
        displayhotels();

    },[]);

    const displayhotels=async()=>{
        let res= await availableHotels();
        setHotels(res.data);
    }
    return(
        <>
        <div className="container-fluid h1 p-2 bg-secondary text-center rounded-bottom">
           <h1><b> Welcome to ManageStay</b></h1>
        </div>
        <div className="col-12">
            <SearchHotel/>
        </div>
        <div className="container-fluid p-5">

            <br />
            {
                hotels.map((e)=>(<HotelCard key={e._id} e={e}/>))
            }
        </div>
        </>
       
    );
};

export default Search;