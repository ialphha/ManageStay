import React,{useState, useEffect}from 'react';
import { read,daysAvailable, isAlreadyBooked } from '../../actions/hotel';
import { useNavigate, useParams } from 'react-router-dom';
import moment from 'moment';
import {useSelector} from 'react-redux';
import { getSessionId } from '../../actions/stripe';
import {loadStripe} from "@stripe/stripe-js";

import { MapContainer, TileLayer,Marker,Popup } from 'react-leaflet';

import 'leaflet/dist/leaflet.css';
import L from "leaflet";



function ReadHotel() {

  const markerIcon= new L.Icon({
    iconUrl: require("../../resources/images/marker.jpg"),
    iconSize:[50, 50],
  });
  let params = useParams();
  //hotel object to store the info 
  const [hotel, setHotel]=useState({});
  const [image, setImage]=useState("");
  const [loading,setLoading]=useState(false);
  const {auth}=useSelector((state)=>({...state}));
  const [bookedHotel,setBookedHotel]=useState(false);

  const navigate=useNavigate();



  useEffect(()=>{
    loadHotel();
  },[]);

  useEffect(()=>{
    if (auth && auth.token){
      isAlreadyBooked(auth.token, params.hotelId).then((res)=>{
      console.log(res.data);
      if(res.data.ok){setBookedHotel(true);}
       
      })
    }
  },[]);


  const handleClick=async(e)=>{
    
    e.preventDefault();

    if(!auth|| !auth.token){
      navigate("/login");
      return;
    }
    setLoading(true);
    try{
      let res=await getSessionId(auth.token, params.hotelId);

      const stripe= await loadStripe(process.env.REACT_APP_STRIPE_KEY);
  
      stripe.redirectToCheckout({
        sessionId: res.data.sessionId,
      }).then((result=> console.log(result)));
    }
    catch(err){
      console.log("eerror from read hotel",err);
    }

  }

 
  const goback=()=>{
    navigate("/");
  }

  
  const loadHotel=async()=>{
    let res=await read(params.hotelId);
    setHotel(res.data);
    setImage(`${process.env.REACT_APP_API}/hotel/image/${res.data._id}`);
  };

  return (
    <>
    <div className="container-fluid bg-secondary text-white p-3 text-center">
            <h2>{hotel.title}</h2>
    </div>
    <div className="container-fluid">
      <br />
      <div className="row">
        <div className="col-md-6">
          <img src={image}  alt={hotel.title} className='img img-fluid ' />

        </div>
        <div className="col-md-6">
          <b>{hotel.content}</b>
          <p className='alert alert-info'>${hotel.price}</p>
          <p className="card-text"> 
          <span className="float-right text-primary"> for {daysAvailable(hotel.from, hotel.to)} {daysAvailable(hotel.from, hotel.to)<=1 ?"day":"days"}
          </span>
          </p>
          <p>
            <b> From :</b><br></br>
            {moment(new Date(hotel.from)).format("MMMM Do YYYY, h:mm:ss a")}
          </p>
          <p>
            <b> To:</b><br></br>
            {moment(new Date(hotel.to)).format("MMMM Do YYYY, h:mm:ss a")}
          </p>
          <p>
            <b>Location:</b> <i>{hotel.location}</i>
          </p>

          <i>Posted by {hotel.postedBy && hotel.postedBy.name} </i> <br /> 
          <button onClick={handleClick} disabled={loading||bookedHotel} className='btn  btn-lg btn-primary my-2 '> {loading?"loading...":(bookedHotel? "Not Available":(auth && auth.token ? "Book":"Login to Book"))} </button>

        
          <button onClick={goback} className='btn btn-lg btn-secondary m-2'> Go back to previous page</button>
          {/* <div>
            {Math.round((hotel.lat+ Number.EPSILON) * 100) / 100} {hotel.lng}
          </div> */}

          
          
          {hotel.lat &&
          <div>
                   <MapContainer center={[hotel.lat, hotel.lng]} zoom={13}  style={{width:"45vw", height:"45vh"}} > 
                        <TileLayer
                         attribution="© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>"
                         url="https://api.mapbox.com/styles/v1/ipradhan/cl62tiflk001d14qlk39weosa/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiaXByYWRoYW4iLCJhIjoiY2w2M294ZHB5MGVndTNibmo1d3F5N2tsbCJ9.k-qPymS8iPphz74Uwzl2eg"
                        />
                        <Marker position={[hotel.lat, hotel.lng]} icon={markerIcon}>
                            <Popup>
                              {hotel.location}
                            </Popup>
                        </Marker>
                    </MapContainer>
    
                    <br />

                    <a className=" btn btn-primary" href={`https://www.google.com/maps/place/${hotel.location}/@${hotel.lat},${hotel.lng}`} target={"_blank"}> Get Directions</a>                                       
                   
           </div>
           }

        </div>
      </div>
    </div>
    </>
  )
}

export default ReadHotel;