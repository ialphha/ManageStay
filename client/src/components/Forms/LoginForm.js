import InputLabel from "@material-ui/core/InputLabel";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import InputAdornment from "@material-ui/core/InputAdornment";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Input from "@material-ui/core/Input";
import { useState } from "react";

const LoginForm=({handleSubmit,email, setEmail,password,setPassword})=>{
    const [showpassword, setShowpassword]=useState(false);
  const handleClickShowPassword = () => {
    setShowpassword(!showpassword);
  };
  
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
   return( <form onSubmit={handleSubmit} className="mt-3"> 

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

       {/* submit button disabled until the form fields are filled */}
       <button disabled={!email||!password} className="btn btn-primary"> Sign In</button>
       <span> Don't have an account?<a href="./register"> Create Account</a></span>
    </form>
   );
}
export default LoginForm;