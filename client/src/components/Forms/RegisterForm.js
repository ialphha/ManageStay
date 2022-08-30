// Register Form component of Register in App.js
// 
import InputLabel from "@material-ui/core/InputLabel";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import InputAdornment from "@material-ui/core/InputAdornment";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Input from "@material-ui/core/Input";
import { useState } from "react";



const RegisterForm=({handleSubmit,name,setName,email, setEmail,password,setPassword,phone,setPhone, confirm, setConfirm})=>{
const [showpassword, setShowpassword]=useState(false); 
  
  const handleClickShowPassword = () => {
    setShowpassword(!showpassword);
  };
  
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  
return(
    <form onSubmit={handleSubmit} className="mt-3"> 
        <div className="form-group mb-3">
           <InputLabel htmlFor="name">
            Name: <span style={{ color: "red" }}>*</span>
          </InputLabel>
          <Input className="form-control" type="text" id="name" placeholder="Enter Name here" value={name} onChange={(e)=>setName(e.target.value)}>
          </Input>
       </div>
        <div className="form-group mb-3">
           <InputLabel htmlFor="email">
            Email: <span style={{ color: "red" }}>*</span>
          </InputLabel>
          <Input className="form-control" type="text" id="email" placeholder="Enter Email here" value={email} onChange={(e)=>setEmail(e.target.value)}>
          </Input>
       </div>
        <div className="form-group mb-3">
           <InputLabel htmlFor="pasword">
            Password: <span style={{ color: "red" }}>*</span>
          </InputLabel>
           {/* <input type="password" className="form-control" placeholder="Enter password" value={password} onChange={(e)=>setPassword(e.target.value)}/>  */}
           <Input className="form-control" type={showpassword?"text":"password"} value={password} id="password" onChange={(e)=>setPassword(e.target.value)} placeholder="Enter Password here"
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showpassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }/>
       </div>
        <div className="form-group mb-3">
           <InputLabel htmlFor="confirm-password">
            Confirm Password: <span style={{ color: "red" }}>*</span>
          </InputLabel>
            <Input className="form-control" id="confirm-password" type={showpassword?"text":"password"} value={confirm} onChange={(e)=>setConfirm(e.target.value)} placeholder="Re-enter Password"
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showpassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
                }/>
       </div>
        {password!==confirm&&<pre className="text-info">Passwords do not match</pre>}
         
        <div className="form-group mb-3">
           
           <InputLabel htmlFor="phone">
            Phone: <span style={{ color: "red" }}>*</span>
          </InputLabel>
          <Input className="form-control" type="tel" id="phone" placeholder="Enter Phone number here" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" value={phone} onChange={(e)=>setPhone(e.target.value)}>
          </Input>
       </div>

{/* submit button disabled until the form fields are filled */}
        

       <button disabled={password!==confirm} className="btn btn-primary"> Register</button>
       <span> Already have an account?<a href="./login"> Sign In</a></span>
    </form>
);

};
export default RegisterForm;
