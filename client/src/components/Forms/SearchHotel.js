
// this is for the search bar comoponent in search.js and searchresponse

import { DatePicker, Select} from "antd";
import { useState } from "react";

import moment from "moment";

import MapboxAutocomplete from "react-mapbox-autocomplete";
import { useNavigate } from "react-router-dom";


const {RangePicker}=DatePicker;

const config = {
    token: process.env.REACT_APP_MAPBOX_API_TOKEN,
  };

  const SearchHotel=()=>{
    const[location, setLocation]=useState('');
    const[date, setDate]=useState("");
    const[bed,setBed]=useState("");
    const navigate=useNavigate();

    const handleSubmit=()=>{
        navigate(`/searchlist?location=${location}&date=${date}&bed=${bed}`); 
    }

    function _suggestionSelect(result, lat, lng, text) {
        setLocation(result);
       }

    return(
        <div class="d-flex p-4">
            <div className=" w-100 ">
            <MapboxAutocomplete publicKey={config.token}
                    placeholder="Location"
                    value={location}
                    inputClass='w-100 mapBox'
                    onSuggestionSelect={_suggestionSelect}
                    country='us'
                    style={{height:"50px"}}
                    resetSearch={false}/>
            </div>
            <RangePicker onChange={(value,dateString)=>setDate(dateString)} className="w-100"style={{height:"50px"}}
             disabledDate={(current)=>current&&current.valueOf()<moment().subtract(1,"days")}/>

             <Select onChange={(value) =>setBed(value)} className="w-100" size="large" placeholder="Number of Beds">
                    <Select.Option key={1}>{1}</Select.Option>
                    <Select.Option key={2}>{2}</Select.Option>
                    <Select.Option key={3}>{3}</Select.Option>
                    <Select.Option key={4}>{4}</Select.Option>
                    <Select.Option key={5}>{5}</Select.Option>
                    <Select.Option key={6}>{6}</Select.Option>


             </Select>

             <button onClick={handleSubmit} disabled={!location||!date||!bed} className="btn btn-primary h-50 p-2"> Search</button>

             

        </div>
    )
  }

  export default SearchHotel;
