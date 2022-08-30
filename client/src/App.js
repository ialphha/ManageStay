//React ROuter components and toast used for routing and notification

import {BrowserRouter, Routes, Route} from "react-router-dom";
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PrivateRoute from "./components/PrivateRoute";

//list of imports of components here
import Search from "./Booking/Search";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Dashboard from "./user/Dashboard";
import Navigation from "./components/Navigation";
import SellerDashboard from "./user/SellerDashboard";
import NewHotel from "./hotels/NewHotel";
import StripeCallback from "./stripe/StripeCallBack";
import EditHotel from "./hotels/EditHotel";
import ReadHotel from "./components/Forms/ReadHotel";
import StripeSuccess from "./stripe/StripeSuccess";
import StripeFail from "./stripe/StripeFail";
import SearchResponse from "./hotels/SearchResponse";


function App() {
  return (
    <BrowserRouter>
     <Navigation/>
      <ToastContainer position="top-center" autoClose={3000}/>
      <Routes>
        <Route exact path="/"element={<Search/>}/>
        <Route exact path="/login"element={<Login/>}/>
        <Route exact path="/register"element={<Register/>}/>

        <Route exact path="/hotel/:hotelId" element={<ReadHotel/>}/>
        
        <Route exact path="/dashboard" element={<PrivateRoute/>}>
        <Route exact path="/dashboard" element={<Dashboard/>}/>
        </Route>
        <Route exact path="/dashboard/seller" element={<PrivateRoute/>}>
          <Route exact path="/dashboard/seller" element={<SellerDashboard/>}/>
        </Route>
        <Route exact path="/hotels/new" element={<PrivateRoute/>}>
          <Route exact path="/hotels/new" element={<NewHotel/>}/>
        </Route>
        <Route exact path="/stripe/callback" element={<PrivateRoute/>}>
          <Route exact path="/stripe/callback" element={<StripeCallback/>}/>
        </Route>
        <Route exact path="/stripe/success/:hotelId" element={<PrivateRoute/>}>
          <Route exact path="/stripe/success/:hotelId" element={<StripeSuccess/>}/>
        </Route>
        <Route exact path="/stripe/fail" element={<PrivateRoute/>}>
          <Route exact path="/stripe/fail" element={<StripeFail/>}/>
        </Route>
        <Route exact path="/hotel/edit/:hotelId" element={<PrivateRoute/>}>
          <Route exact path="/hotel/edit/:hotelId" element={<EditHotel/>}/>
        </Route>
        <Route exact path="/searchlist" element={<SearchResponse/>}/>

      </Routes>
      
    </BrowserRouter>
  );
}

export default App;
