import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { read } from "../actions/hotel";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import EditHotelForm from "../components/Forms/EditHotelForm";
import { storeEditHotel } from "../actions/hotel";





const EditHotel=( )=>{
    // hook for extracting parameters
    let params = useParams();

    useEffect(()=>{
        loadHotel();
    },[]);

    const loadHotel=async()=>{
        let res=await read(params.hotelId);
        setValues({...values, ...res.data});
        setPreview(`${process.env.REACT_APP_API}/hotel/image/${res.data._id}`);
       
    };

    const {auth}=useSelector((state)=>({...state}));
    const navigate=useNavigate();
    // destructring auth
    const {token}=auth;

    //state
    const [values, setValues]=useState({
        title:'',
        content:'',
        price:'',
        location:"",
        from:'',
        to:'',
        bed:'',
        postedPhone:'',
        postedEmail:''
    });
    const{title, content, location, price, from, to, bed, postedPhone,postedEmail}=values;
     //state of the preview component
    const [preview, setPreview]=useState('https://via.placeholder.com/100x100.png?text=PREVIEW');
    const [image, setImage]=useState("");

    const [lat, setLat]=useState(0);
    const[lng,setLng]=useState(0);

    const handleImageChange=(e)=>{
        setPreview(URL.createObjectURL(e.target.files[0]));
        setImage(e.target.files[0]);
    }
    const handleChange=(e)=>{
        //update the state of each field on change
        setValues({...values,[e.target.name]:e.target.value});
    }
    const handleCancel=(e)=>{
        navigate("/dashboard/seller");
    }
   
    const handleSubmit=async(e)=>{
        e.preventDefault();
        let hotelData= new FormData();
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

         try{
            let res=await storeEditHotel(token, hotelData, params.hotelId);
            console.log("hotel update res", res);
            toast.success("hotel updated!!");
         }
         catch(err){
            console.log(err);
            toast.error(err.response.data);
         }
    }
    return(
        <>
        <div className="container-fluid text-white bg-secondary p-3 text-center">
            <h2>Edit Your Hotel</h2>
        </div>
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-10">
                <EditHotelForm 
                    values={values}
                    setValues={setValues}
                    lat={lat}
                    setLat={setLat}
                    lng={lng}
                    setLng={setLng}
                    handleChange={handleChange}                    
                    handleImageChange={handleImageChange}
                    handleSubmit={handleSubmit}
                    handleCancel={handleCancel}
                    />
                </div>
                <div className="col-md-2">
                <img src={preview} alt="Preview of image" className='img img-fluid m-2'/>
                {/* <pre>{JSON.stringify(values, null, 4)}</pre> */}
                </div>
            </div>
        </div>
        </>
    );

}

export default EditHotel;