import axios from "axios";

/**/
/*
NAME:  createConnectAccount
        

SYNOPSIS:  createConnectAccount(token)


DESCRIPTION:   async function that gets token and send axios post request to backend for creating the stripe connect account

RETURNS : 
        returns response from backend for creating stripe account


*/
/**/
export const createConnectAccount=async(token)=>await axios.post(`${process.env.REACT_APP_API}/createConnectAccount`,{}, {headers:{Authorization:`Bearer ${token}`, }, } );


/**/
/*
NAME:  getAccountStatus
        

SYNOPSIS:  getAccountStatus(token)


DESCRIPTION:   async function that gets token and send axios post request to backend for getting the status of the stripe account 

RETURNS : 
        returns response from backend with whether or not stripe connection was successful or not



*/
/**/

export const getAccountStatus= async(token)=>await axios.post(`${process.env.REACT_APP_API}/get-account-status`,
    {},{ headers:{
            Authorization:`Bearer ${token}`,
        },
    }
);

/*
NAME:  getAccountbalance
        

SYNOPSIS:  getAccountbalance(token)


DESCRIPTION:   async function that gets token and send axios post request to backend for getting the account balance of the stripe account 

RETURNS : 
        returns response from backend with whether or not stripe connection was successful or not



*/
/**/
export const getAccountbalance= async(token)=>await axios.post(`${process.env.REACT_APP_API}/get-account-balance`,
    {},{ headers:{
            Authorization:`Bearer ${token}`,
        },
    }
);



/*
NAME:  currencyFormatter
        

SYNOPSIS:  currencyFormatter(data)


DESCRIPTION:   gets the data and returns the dollars in string

RETURNS : 
        returns the dollar amount in string format with commas


*/
/**/
export const currencyFormatter=(data)=>{
    return (data.amount/100).toLocaleString(data.currency,{
        style:"currency",
        currency:data.currency,
    });
}

/*
NAME:  payoutSettings
        

SYNOPSIS:  payoutSettings(token)


DESCRIPTION:   async function that gets token and send axios post req to backend for payouts setup for the user

RETURNS : 
        returns response from backennd for redirecting link to stripe 


*/
/**/
export const payoutSettings= async(token)=>await axios.post(`${process.env.REACT_APP_API}/payout-setting`,
{},{ headers:{
        Authorization:`Bearer ${token}`,
    },
}
);
/*
NAME:  getSessionId
        

SYNOPSIS:  getSessionId(token,hotelId)


DESCRIPTION:   async function that gets token and send axios post request to backend for creating a checkout session
 

RETURNS : 
       none



*/
/**/

export const getSessionId=async(token,hotelId)=> await axios.post (`${process.env.REACT_APP_API}/stripe-session-id`,{hotelId},
{
  headers: { Authorization: `Bearer ${token}`}
});

/*
NAME:  StripeSuccessRequest
        

SYNOPSIS:  StripeSuccessRequest(token,hotelId)


DESCRIPTION:   async function that gets token and send axios post request to backend for ensuring the order for the hotelId where the payment is successful

RETURNS : 
        returns response from backend,  json object

*/
/**/
export const StripeSuccessRequest=async(token,hotelId)=> await axios.post (`${process.env.REACT_APP_API}/stripe-success`,{hotelId},
{
  headers: { Authorization: `Bearer ${token}`}
});