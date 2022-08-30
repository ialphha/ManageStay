
import {useState} from 'react';
import {toast} from 'react-toastify';
import {useSelector} from "react-redux";
import { storeHotel } from '../actions/hotel';
import CreateHotel from '../components/Forms/CreateHotel';



const NewHotel=()=>{
  // use Selector hook for extracting auth for state in redux
    const {auth}=useSelector((state)=>({...state}));
    
    // destructring auth
    const {token}=auth;

    //state
    const [values, setValues]=useState({
        title:'',
        content:'',
        image:'',
        price:'',
        from:'',
        to:'',
        bed:'',
        postedPhone:'',
        postedEmail:''
    });

    //destructring variables from above state
    const{title, content,image, price, from, to, bed, postedPhone,postedEmail}=values;

    //state of the preview component
    const [preview, setPreview]=useState('https://via.placeholder.com/100x100.png?text=PREVIEW');

    //location state set differently to avoid refresh in page.
    const [location, setLocation]=useState("");
    const [lat, setLat]=useState(0);
    const[lng,setLng]=useState(0);

    const handleSubmit=async(e)=>{
      e.preventDefault();
      let hotelData=new FormData();
      hotelData.append('title', title);
      hotelData.append('content', content);
      hotelData.append('location', location);
      hotelData.append('price', price);
      image && hotelData.append('image', image);
      hotelData.append('from', from);
      hotelData.append('to', to);
      hotelData.append('bed', bed);
      hotelData.append('postedPhone', postedPhone);
      hotelData.append('postedEmail', postedEmail);
      hotelData.append('lat',lat);
      hotelData.append('lng',lng);
      console.log([...hotelData]);
      try {
        let res = await storeHotel(token, hotelData);
        console.log("HOTEL CREATE RES", res);
        toast.success("New hotel is posted");
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } catch (err) {
        console.log(err);
        toast.error(err.response.data);
      }
    }
    const handleImageChange=(e)=>{
        setPreview(URL.createObjectURL(e.target.files[0]));
        setValues({...values, image:e.target.files[0]});
    }
    const handleChange=(e)=>{
        e.preventDefault();
        //update the state of each field on change
        setValues({...values,[e.target.name]:e.target.value});
    }
   
   
    return(
    <>
        <div className="container-fluid bg-light p-3 text-center">
          <h2 >Add hotel</h2>
          <div className="container-fluid">
            <div className="row">
                <div className="col-md-10">
                    <br />
                    <CreateHotel values={values}
                    setValues={setValues}
                    location={location}
                    setLocation={setLocation}
                    lat={lat}
                    setLat={setLat}
                    lng={lng}
                    setLng={setLng}
                    handleChange={handleChange}                    
                    handleImageChange={handleImageChange}
                    handleSubmit={handleSubmit}
                    />
                </div>
                <div className="col-md-2">
                   <img src={preview} className="img img-fluid m-2"/>
                </div>

            </div>
          </div>
        </div>
    </>
    );
};

export default NewHotel;