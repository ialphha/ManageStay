import React,{useRef,useState,useEffect}from 'react';
import { currencyFormatter } from '../../actions/stripe';
import { daysAvailable,isAlreadyBooked } from '../../actions/hotel';
import {useNavigate, Link} from 'react-router-dom';
import {EditOutlined, DeleteOutlined} from "@ant-design/icons";
import {useSelector} from 'react-redux';




const HotelCard=({e, handleHotelDelete=(f)=>f, owner=false, showViewMoreButton=true }) =>{
    const navigate=useNavigate();
    const {auth}=useSelector((state)=>({...state}));
    const [bookedHotel,setBookedHotel]=useState(false);

    const color=bookedHotel? "-success":"-info"

    useEffect(()=>{
        if (auth && auth.token){
          isAlreadyBooked(auth.token, e._id).then((res)=>{
          console.log(res);
          if(res.data.ok){setBookedHotel(true);}
          });
        }
      },[]);

    return(
        <div className='card mb-2 '>
        <div className="row no-gutter">
            <div className="col-md-4">
               
                {
                    e.image && e.image.contentType ?
                    (
                        <img src={`${process.env.REACT_APP_API}/hotel/image/${e._id}`} alt="hotel photo" className='img img-fluid card-image '/>
                    ):(
                        <img src="https://via.placeholder.com/900x500.png?text=MERN+Booking" alt="default image" className='img img-fluid card-image '/>
                    )
                }
            </div>
            <div className="col-md-8">
                <div className="card-body">
                   <h4 className="card-title">
                    {e.title } 
                   </h4>
                   <h4> <span className="float-right text-primary">
                        {
                            currencyFormatter({
                                amount: e.price*100,
                                currency: "usd"
                            })
                        }
                    </span></h4>
                   <p className={"alert alert"+color}>{e.location}</p>
                   <p className={"alert alert"+color}>{e.content.length>200 ?`${e.content.substring(0, 200)}...` : e.content}</p>
                   <p className="card-text"> <span className="float-right text-primary"> for {daysAvailable(e.from, e.to)} {daysAvailable(e.from, e.to)<=1 ?"day":"days"}</span></p>
                   <p className="card-text">{e.bed} Beds</p>
                   <p className="card-text">Available from { new Date(e.from).toLocaleDateString()}</p>

                   <p className="card-text">{bookedHotel&& <span> This hotel is <b>booked</b> by the customer. <b> Deleting</b> is <b>disabled.</b> </span>}</p>

                                     
                   <div className="d-flex justify-content-between h4">
                   {
                    showViewMoreButton && <button onClick={()=>navigate(`/hotel/${e._id}`)} className='btn btn-primary'
                    disabled={bookedHotel}>{bookedHotel? "Not Available":"show details"}</button>
                   }
                    {
                        owner && (
                            <>
                            <Link to={`/hotel/edit/${e._id}`}>
                                <button className='btn btn-warning'>
                                    <EditOutlined />
                                </button>
                                                  
                            </Link>
                            
                            <button 
                            // onClick={()=>navigate(`/hotel/${e._id}`)}
                             className={"btn btn"+color}
                            disabled={!bookedHotel}
                            >{bookedHotel? "Order Info":"Vacant"}</button>

                            {/* <pre>{JSON.stringify(bookedHotel)}</pre> */}
                            
                            
                            <button className="btn btn-danger" disabled={bookedHotel} onClick={()=>handleHotelDelete(e._id)}>
                                <DeleteOutlined />
                            </button>
                            </>
                        )
                    }
                   </div>

                </div>
            </div>
        </div>
        
        
    </div>
    );
}

export default HotelCard;