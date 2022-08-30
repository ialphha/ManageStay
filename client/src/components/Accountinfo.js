
import { useSelector } from "react-redux";
import {Card, Avatar, Badge} from "antd";

import moment from "moment";
import { useEffect, useState } from "react";
import { getAccountbalance,currencyFormatter,payoutSettings} from "../actions/stripe";
import { SettingOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";

const {Meta}=Card;
const {Ribbon}=Badge;

const Accountinfo=()=>{
    const {auth}=useSelector((state)=>({...state}));
    const {user,token}=auth;
    const [balance, setBalance]=useState(0);
    const [loading,setloading]=useState(false);


    useEffect(() => {
        getAccountbalance(auth.token).then((res) => {
          // console.log(res);
          setBalance(res.data);
        });
      }, []);



      const handlePayoutSettings=async()=>{
        setloading(true);
        try{
            const res=await payoutSettings(token);
            console.log(" res_data->",res.data);
            window.location.href=res.data.url;
            setloading(false);
        }catch(err){
            console.log(err);
            setloading(false);
            toast("unable to access settings for payout");
            
        }
      }
    
    return(
    <div className="d-flex p-4 justify-content-around">
        <Card> 
            <Meta avatar={<Avatar>{user.name[0]}</Avatar>} title={user.name} description={`Joined ${moment(user.createdAt).fromNow()}`} /> 
        </Card>

        {auth&& auth.user &&auth.user.stripe_seller&& auth.user.stripe_seller.charges_enabled &&(<>
        <Ribbon text="Available in Stripe" color="silver">
            <Card className="bg-light pt-1">
                { balance && balance.pending&&balance.pending.map((ba,i)=>(
                    <span key={i} className="lead">
                       {currencyFormatter(ba)}
                    </span>
                ))} 
             
            </Card>
        </Ribbon>
        <Ribbon text="Transfer to Bank" color="silver">
            <Card className="bg-light pt-1" onClick={handlePayoutSettings}>
                <SettingOutlined className="h5 pt-2"/>             
            </Card>
        </Ribbon>
        </>)}
    </div>);
}


export default Accountinfo;