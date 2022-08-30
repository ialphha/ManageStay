import axios from 'axios';

/**/
/*
NAME: storeHotel()
        

SYNOPSIS: storeHotel= async (token, data)
          


DESCRIPTION: async function, axios post for HTTP post request to the backend for storing the hotel. 


RETURNS : 
        returns response of json object if hotel is registered succesfully or send error response 


*/
/**/
export const storeHotel= async (token, data)=>
await axios.post(`${process.env.REACT_APP_API}/createHotel`, data,
    { headers:{
        Authorization:`Bearer ${token}`,
        },
    }
);

/**/
/*
NAME: availableHotels()
        

SYNOPSIS: availableHotels
          


DESCRIPTION: axios get for HTTP get request to the backend for getting the hotels after current day


RETURNS : 
        returns hotels  after current day from the backend 


*/
/**/

export const availableHotels=async()=>await axios.get(`${process.env.REACT_APP_API}/hotelslist`);


/**/
/*
NAME: daysAvailable
        

SYNOPSIS: daysAvailable( from , to ):
            from and to: date strings
          


DESCRIPTION: calculates the total number of days of the stay


RETURNS : 
        returns whole number 


*/
/**/

// calculates the # days available
export const daysAvailable=(from, to)=>{
    const day=24*60 *60 *1000; //divider for converting to days from milliseconds
    const start= new Date(from);
    const end=new Date(to);
    const diff=Math.round(Math.abs((start-end)/day));
    return diff;
}


/**/
/*
NAME: sellerHotels
        

SYNOPSIS: sellerHotels( token):
           token: authentication token 
          


DESCRIPTION:  axios get for HTTP get request to the backend for getting the seller hotels


RETURNS : 
        returns a list of hotels of the signed-in seller.


*/
/**/


export const sellerHotels=async(token)=>await axios.get(`${process.env.REACT_APP_API}/seller-hotels`,{
    headers:{
        Authorization:`Bearer ${token}`,
    }
});


/**/
/*
NAME: deleteHotel
        

SYNOPSIS:deleteHotel( token, hotelId):
token:authentication token 

hotelId: hotel id of the hotel to be deleted          


DESCRIPTION: takes the authToken and hotelId and axios delete for HTTP delete request to the backend for deleting the seller hotels


RETURNS : 
        returns whole number 


*/
/**/


export const deleteHotel=async(token, hotelId)=> await axios.delete(`${process.env.REACT_APP_API}/delete-hotel/${hotelId}`,{
    headers:{
    Authorization:`Bearer ${token}`,
    }
});



/**/
/*
NAME: read

SYNOPSIS: read(hotelId):
            hotelId:  hotel id of the hotel 
          


DESCRIPTION: async function that takes hotelId and axios get for HTTP get request to the backend for getting the info of that hotel


RETURNS : 
        returns data of the hotel with the hotelId, with _ id, name and postedby


*/
/**/

export const read= async(hotelId)=>await axios.get(`${process.env.REACT_APP_API}/hotel/${hotelId}`);


/**/
/*
NAME: storeEditHotel
        

SYNOPSIS: storeEditHotel( token, data, hotelId ):
            token: authentication token 
            data:object with props 
            hotelId: Id of hotel
          


DESCRIPTION: async function that takes the data and send axios put request to the backend to store the data in the hotel object with the hotelId


RETURNS : 
        returns  response from backend


*/
/**/


export const storeEditHotel= async (token, data, hotelId)=>
    await axios.put(`${process.env.REACT_APP_API}/editUpdateHotel/${hotelId}`, data,
    { headers:{
        Authorization:`Bearer ${token}`,
        },
    }
    );


/**/
/*
NAME: userBookedHotels
        

SYNOPSIS:userBookedHotels( token ):
         token: auth token
          


DESCRIPTION: async function that gets token and send axios get request to backend for getting hotelbookings of the user 


RETURNS : 
        returns list of hotels that user have booked


*/
/**/


export const userBookedHotels=async(token)=> await axios.get(`${process.env.REACT_APP_API}/user-hotel-bookings`,
{
    headers:{
    Authorization:`Bearer ${token}`,
    },
}
);

/**/
/*
NAME: isAlreadyBooked
        

SYNOPSIS: isAlreadyBooked(token, hotelId):
          token: auth token
          hotelId:  Id of hotel
          


DESCRIPTION:   async function that gets token and send axios get request to backend for getting the status of the hotel with the hotelId


RETURNS : 
        returns response from backend with json object: ok:true or false


*/
/**/


export const  isAlreadyBooked=async(token, hotelId)=> await axios.get(`${process.env.REACT_APP_API}/isalreadybooked/${hotelId}`,{
    headers:{
        Authorization: `Bearer ${token}`,
    }
})

/**/
/*
NAME: searchList
        

SYNOPSIS: searchList=async(query)
            query: query for searching the hotel from SearchHotel component
          


DESCRIPTION: async function that gets Query and send axios post  request to backend for getting the list of hotels that matches the search query


RETURNS : 
        returns list of hotels


*/
/**/

export const searchList=async(query)=>await axios.post(`${process.env.REACT_APP_API}/searchlist`, query);