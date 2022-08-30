import axios from "axios";

/**/
/*
NAME: register()
        

SYNOPSIS: register(user)
          user: object with user props for register


DESCRIPTION: axios post for HTTP post request to the backend for registering the user.


RETURNS : 
        returns response of json object if user is registered succesfully or send error response 

AUTHOR : Ishit Lal Pradhan

DATE: 05/25/2022

*/
/**/
export const register=async(user)=>await axios.post(`${process.env.REACT_APP_API}/register `, user);

/**/
/*
NAME: login()
        

SYNOPSIS: login(user)
          user: object with user props for login credentials


DESCRIPTION: axios post for HTTP post request to the backend for login procedure of the user.


RETURNS : 
        returns  json object login was succesful or send error response 

AUTHOR : Ishit Lal Pradhan

DATE: 05/25/2022

*/
/**/
export const login=async(user)=>await axios.post(`${process.env.REACT_APP_API}/login `, user);



/**/
/*
NAME: updateUserInLocalStorage()
        

SYNOPSIS: updateUserInLocalStorage(user,cb)
user: 
cb:

DESCRIPTION: for updating the user in local storage 


RETURNS : 
        none

AUTHOR : Ishit Lal Pradhan

DATE: 05/25/2022

*/
/**/

export const updateUserInLocalStorage=(user, cb)=>{
    if(window.localStorage.getItem("auth")){
        console.log((localStorage.getItem("auth")));
        let auth=JSON.parse(localStorage.getItem("auth"));
        console.log(auth);
        auth.user=user;
        localStorage.setItem("auth", JSON.stringify(auth));
        cb();
    }
}
