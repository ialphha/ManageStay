import { LoadingOutlined } from "@ant-design/icons";
import { useEffect } from "react";
import { useSelector,useDispatch } from "react-redux";
import { getAccountStatus } from "../actions/stripe";
import { updateUserInLocalStorage } from "../actions/auth";


const StripeCallback=()=>{

    const {auth}=useSelector((state)=>({...state}));
    const dispatch= useDispatch();
    
    useEffect(()=>{
        if (auth && auth.token){
            accountStatus();
        }
    },[auth]);
    
    //Promise 
    const accountStatus=async()=>{
        try{ 
            const res=await getAccountStatus(auth.token);
            console.log("user Account status on stripe callback",res);

            // update user in local storage 
            updateUserInLocalStorage(res.data,()=>{
                //update user in redux
                dispatch({
                    type:'Logged_in_user',
                    payload: res.data,
                });
                //redirecting to the dashboard
                window.location.href="/dashboard/seller";

            });

        }
        catch(err){
            console.log(err);
        }
    }
    return <div className="d-flex justify-content-center p-5">
        <LoadingOutlined className="h1 p-5 text-danger"/>
    </div>
}

export default StripeCallback;