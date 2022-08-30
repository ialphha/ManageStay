import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import {useSelector} from "react-redux";
import {StripeSuccessRequest} from "../actions/stripe";
import {LoadingOutlined} from "@ant-design/icons";


function StripeSuccess() {

const navigate=useNavigate();

 const params=useParams();

 const {auth}=useSelector((state)=>({...state}));
 const {token}=auth;

 useEffect(()=>{
    StripeSuccessRequest(token, params.hotelId)
    .then(res=>{
       if(res.data.success){
        navigate("/dashboard");
       }
       else{
        navigate("/stripe/cancel");
       }
    })
 },[params.hotelId]);//dependencies array-> hotelId


  return (
    <div className='container'><div className='d-flex justify-content-center'> <LoadingOutlined className="display-1 p-5"/> </div></div>
  )
}

export default StripeSuccess;