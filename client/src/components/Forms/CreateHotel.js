// import Autocomplete from "react-google-autocomplete";

import {DatePicker,Select} from "antd";
import moment from 'moment';
import { useNavigate } from "react-router-dom";
import MapboxAutocomplete from "react-mapbox-autocomplete";

const config = {
  token: process.env.REACT_APP_MAPBOX_API_TOKEN,
};
// const config = process.env.REACT_APP_GOOGLEPLACES_API_KEY;

const CreateHotel=(props)=>{
    //destructuring from props:
    const{values,setValues,location,setLocation,handleChange, 
    lat,lng,setLat, setLng,                 
    handleImageChange,
    handleSubmit}=props;

    const navigate=useNavigate();
    //destructuring from values:
    const {title, content, price,postedEmail,postedPhone}=values;

    const handleCancel=()=>{
      navigate("/dashboard/seller");
    }
    function _suggestionSelect(result, lat, lng, text) {
      console.log(result);
      console.log(lat,lng);
      setLat(lat);
      setLng(lng);
      setLocation(result);
     }

    return(
        <form onSubmit={handleSubmit}>
         <div className="form-group">
          <label className="btn btn-outline-secondary btn-block m-2 text-left">
             Add Image
            <input type="file" name="image" onChange={handleImageChange} accept="image/*" hidden/>
          </label>


          <input type="text" name='title' onChange={handleChange} placeholder="Name of the hotel" className='form-control m-2' value={title}/>

          <textarea name='content' onChange={handleChange} placeholder="Description of the hotel" className='form-control m-2' value={content}/>

         {/* <Autocomplete
          className="form-control m-2"
          placeholder="Location"
          apiKey={config1}
          //onChange={(place)=>{setLocation(place.formatted_address)}}
          onPlaceSelected={(place) => {
            setLocation(place.formatted_address);
            //setValues({...values, location:place.formatted_address});
          }}
          style={{ height: "50px" }}
        /> */}
       
          <MapboxAutocomplete publicKey={config.token}
                    placeholder="Location"
                    value={location}
                    inputClass='form-control m-2'
                    onSuggestionSelect={_suggestionSelect}
                    country='us'
                    resetSearch={false}/>
          
          <input type="number" name='price' onChange={handleChange} placeholder="Price " className='form-control m-2' value={price}/>

          <Select onChange={(value)=>setValues({...values, bed:value})} className="w-100 m-2" size="large" placeholder="Number of beds">
            <Select.Option key={1}>{1}</Select.Option>
            <Select.Option key={2}>{2}</Select.Option>
            <Select.Option key={3}>{3}</Select.Option>
            <Select.Option key={4}>{4}</Select.Option>
            <Select.Option key={5}>{5}</Select.Option>
            <Select.Option key={6}>{6}</Select.Option>
          </Select>
          </div>

          <DatePicker placeholder='From Date' className="form-control m-2" onChange={(date, dateString)=>setValues({...values, from:dateString})}
          disabledDate={(current)=>current &&current.valueOf()<moment().subtract(1,"days")}
          />
          {
            values.from?
            (<DatePicker placeholder='To Date' className="form-control m-2" onChange={(date, dateString)=>setValues({...values, to:dateString})}
            disabledDate={(current)=>current&&current.valueOf()<moment(values.from).add(1,"days").valueOf()}
           />)
           :
           (<DatePicker placeholder='To Date' className="form-control m-2" onChange={(date, dateString)=>setValues({...values, to:dateString})}
           disabledDate={(current)=>current&&current.valueOf()<moment().subtract(1,"days")}
          />)
          }
          <input type="text" name="postedPhone" className="form-control m-2" onChange={handleChange} placeholder="Enter your working phone number" value={postedPhone} />

          <input type="text" name="postedEmail" className="form-control m-2" onChange={handleChange} placeholder="Enter your working email"  value={postedEmail}/>
         
         <button className='btn btn-outline-primary '>Save</button>
         <button className='btn btn-outline-secondary m-2' onClick={handleCancel}>Cancel</button>
        </form>
    );
};

export default CreateHotel;