import {useState} from "react";
import RegisterForm from "../components/Forms/RegisterForm";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import { register } from "../actions/auth";


const Register=()=>{
    const navigate = useNavigate();
    const [name,setName]=useState('');
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const[confirm, setConfirm]=useState('');
    const [phone,setPhone]=useState('');

 
    const handleSubmit=async(e)=>{
        e.preventDefault();
       try{
        const res= await register({
            name,
            email,
            password,
            phone,
        });
     
        toast.success("Register success. Log in now.");
        
        //after successful login redirect to the sign-in page.
        navigate('/login');
       }
       catch(error){
           console.log(error);
           if(error.response.status===400) {
               toast.error(error.response.data);
           }
       }
    };
     
    
    
    return(
        <>
        <div className="container-fluid h1 p-2 text-center bg-secondary rounded-bottom">
            <h1>Register Here</h1>
        </div>
        
        <div className="container"> 
            <div className="row">
                <div className="col-md-6 offset-md-3">
                <RegisterForm 
                handleSubmit={handleSubmit}
                name={name}
                setName={setName}
                email={email}
                setEmail={setEmail}
                password={password}
                setPassword={setPassword}
                phone={phone}
                setPhone={setPhone}
                confirm={confirm}
                setConfirm={setConfirm}
                />
                </div>
            </div>
        </div>
        </>
    );
}

export default Register;