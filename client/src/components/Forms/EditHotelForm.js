

import {DatePicker,Select} from "antd";
import moment from 'moment';
import { useNavigate } from "react-router-dom";

import MapboxAutocomplete from "react-mapbox-autocomplete";

const config = {
  token: process.env.REACT_APP_MAPBOX_API_TOKEN,
};

const EditHotelForm=(props)=>{
    //destructuring from props:
    const{values,setValues,lat,
    setLat,lng,
    setLng,handleChange,                  
    handleImageChange,
    handleSubmit}=props;

    //destructuring from values:
    const {title, content, from, to, bed, price, location}=values;

    
    const navigate=useNavigate();
    const handleCancel=()=>{
      navigate("/dashboard/seller");
    }
    
    function _suggestionSelect(result, lat, lng, text){
    console.log(result);
    console.log(lat,lng);
    setLat(lat);
    setLng(lng);
    setValues({...values, location:result});
    // setLocation(result);
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

         { location && location.length &&   
        
           <MapboxAutocomplete publicKey={config.token}
                    placeholder="Location"
                    query={location}
                    inputClass='form-control m-2'
                    onSuggestionSelect={_suggestionSelect}
                    country='us'
                    resetSearch={false}
                    />
          
          }
          <input type="number" name='price' onChange={handleChange} placeholder="Price " className='form-control m-2' value={price}/>

          <Select onChange={(value)=>setValues({...values, bed:value})} className="w-100 m-2" size="large" value={bed} placeholder="Number of beds">
            <Select.Option key={1}>{1}</Select.Option>
            <Select.Option key={2}>{2}</Select.Option>
            <Select.Option key={3}>{3}</Select.Option>
            <Select.Option key={4}>{4}</Select.Option>
            <Select.Option key={5}>{5}</Select.Option>
            <Select.Option key={6}>{6}</Select.Option>
          </Select>
          </div>

          {from && (<DatePicker defaultValue={moment(from,"YYYY-MM-DD")} placeholder='From Date' className="form-control m-2" onChange={(date, dateString)=>setValues({...values, from:dateString})}
          disabledDate={(current)=>current &&current.valueOf()<moment().subtract(1,"days")}
          />)}

          {
            values.from?
            (to &&  (<DatePicker defaultValue={moment(to ,"YYYY-MM-DD")} placeholder='To Date' className="form-control m-2" onChange={(date, dateString)=>setValues({...values, to:dateString})}
            disabledDate={(current)=>current&&current.valueOf()<moment(values.from).add(1,"days").valueOf()}
           />))
           :
           (to && (<DatePicker defaultValue={moment(to,"YYYY-MM-DD")}placeholder='To Date' className="form-control m-2" onChange={(date, dateString)=>setValues({...values, to:dateString})}
           disabledDate={(current)=>current&&current.valueOf()<moment().subtract(1,"days")}
          />))
          }
          
         
         
        <button className='btn btn-outline-primary '>Save</button>
        <button className="btn btn-outline-secondary" onClick={handleCancel}> Cancel</button>
        </form>
    );
};

export default EditHotelForm;