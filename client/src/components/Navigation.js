import { Link } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Navigation=()=>{
const {auth}=useSelector((state)=>({ ...state}));
const navigate= useNavigate();
const dispatch=useDispatch();

const logout=()=>{
  dispatch({
    type: 'LOGOUT',
    payload: null,
  });

  window.localStorage.removeItem("auth");
  navigate("/login");
};

return (

    <div className="nav bg-primary justify-content-between">
      <Link className="nav-link text-light link col-md-10" to="/">Search Rooms</Link>
      {auth !==null && (
        <Link className="nav-link text-light link col-md-1" to="/dashboard">Dashboard</Link>
      )}
      {auth!==null && (
        <>
        <a className="nav-link pointer text-light link col-md-1" onClick={logout}>Logout</a>
        </>
      )}

      {auth===null && (
        <>
        <Link className="nav-link text-light link col-md-1" to="/register">Register</Link>
        <Link className="nav-link text-light link col-md-1" to="/login">Login</Link>
        </>
      )}
    </div>
  );
}
  export default Navigation;