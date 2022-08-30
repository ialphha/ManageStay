import React from 'react'
import { currencyFormatter } from '../../actions/stripe';
import { daysAvailable } from '../../actions/hotel';
import {useNavigate, Link} from 'react-router-dom';
import {useState} from "react";
import OrderModel from "../models/OrderModel";

const ListBookingCard=({hotel, session, orderedBy}) =>{

    const navigate=useNavigate();
    const [showModal,setShowModal]=useState(false);

    return(
        <div className='card mb-3'>
        <div className="row no-gutter">
            <div className="col-md-4">
               
                {
                    hotel.image && hotel.image.contentType ?
                    (
                        <img src={`${process.env.REACT_APP_API}/hotel/image/${hotel._id}`} alt="hotel photo" className='img img-fluid card-image '/>
                    ):(
                        <img src="https://via.placeholder.com/900x500.png?text=MERN+Booking" alt="default image" className='img img-fluid card-image '/>
                    )
                }
            </div>
            <div className="col-md-8">
                <div className="card-body">
                   <h4 className="card-title">
                    {hotel.title} 
                   </h4>
                   <h4><span className="float-right text-primary">
                        {
                            currencyFormatter({
                                amount: hotel.price*100,
                                currency: "usd"
                            })
                        }
                    </span></h4>
                   <p className="alert alert-success">{hotel.location}</p>
                   <p className="alert alert-success">{hotel.content.length>200 ?`${hotel.content.substring(0, 200)}...` : hotel.content}</p>
                   <p className='alert alert-success'>Seller Phone: {hotel.postedPhone}</p>
                   <p className='alert alert-success'>Seller Email: {hotel.postedEmail}</p>
                   <p className="card-text"> <span className="float-right text-primary"> for {daysAvailable(hotel.from, hotel.to)} {daysAvailable(hotel.from, hotel.to)<=1 ?"day":"days"}</span></p>
                   <p className="card-text">{hotel.bed} Beds</p>
                   <p className="card-text">Available from { new Date(hotel.from).toLocaleDateString()}</p>
                   {showModal && <OrderModel session={session} orderedBy={orderedBy} hotel={hotel} showModal={showModal} setShowModal={setShowModal}/>}
                   <div className="d-flex justify-content-between h4">
                   
                    <button onClick={()=>setShowModal(!showModal)} className='btn btn-primary'>show Payment information</button>
                   
                   </div>

                </div>
            </div>
        </div>
        
        
    </div>
    );
}

export default ListBookingCard;