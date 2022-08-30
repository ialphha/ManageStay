
import {useState,useEffect} from "react";


import queryString from 'query-string';
import {Link} from 'react-router-dom';
import SearchHotel from "../components/Forms/SearchHotel";
import {searchList} from "../actions/hotel";
import HotelCard from "../components/cards/HotelCard";

function SearchResponse() {
  const [location, setLocation]=useState("");
  const [date, setDate]=useState("");
  const [bed, setBed]=useState("");
  const [hotels, setHotels]=useState([]);

  useEffect(()=>{
    const {location, date, bed}=queryString.parse(window.location.search);

    searchList({location,date,bed}).then((res)=>{
      console.log("search result:", res.data);
      setHotels(res.data);
    })
  }
  ,[window.location.search]);

  return (
    <>
    <div className="">
      <SearchHotel/>
    </div>
    <div className='container'>
        <div className="row">
          
            {hotels.map((e)=>(
              <HotelCard key={e._id} e={e}/>
            ))}
        </div>
    </div>
    </>
  )
}

export default SearchResponse