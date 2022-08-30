import {  Navigate, Outlet} from "react-router-dom";
import { useSelector } from "react-redux";

//middleware for accessing the information, login is required to perform certain tasks

const PrivateRoute=()=>{
    const {auth}=useSelector((state)=>({...state}));

    return auth && auth.token ? <Outlet/>: <Navigate to="/login"/>;
    
};

export default PrivateRoute;
