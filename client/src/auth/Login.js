import { toast } from "react-toastify";
import { useState } from "react";
import LoginForm from "../components/Forms/LoginForm";
import { login } from "../actions/auth";
import{useDispatch} from "react-redux";

//hook for navigating/ redirecting to the designated link
import { useNavigate } from "react-router-dom";



const Login=()=>{
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    
    const dispatch=useDispatch();
    const navigate=useNavigate();

    const handleSubmit=async(e)=>{
        e.preventDefault();
        console.log("send login data", {email, password});
        try{
            //
            let res=await login({email,password});
            
            if(res.data){
                console.log("Save user response in redux and local storage then redirect ");
                
                //saving the user and token data to local storage 
                window.localStorage.setItem('auth',JSON.stringify(res.data));

                dispatch({
                    type:"Logged_in_user",
                    payload: res.data,
                });

                navigate("/dashboard");
            }
        }
        catch(err){
            console.log(err);
            if(err.response.status===400)toast.error(err.response.data);
        }
      
    }
    return(
        <>
        <div className="container-fluid h1 p-2 text-center bg-secondary rounded-bottom">
            Login Here
        </div>

        <div className="container"> 
            <div className="row">
                <div className="col-md-6 offset-md-3">
                <LoginForm 
                handleSubmit={handleSubmit}
                email={email}
                setEmail={setEmail}
                password={password}
                setPassword={setPassword}
                />
                </div>
            </div>
        </div>
        </>
    );
}

export default Login;