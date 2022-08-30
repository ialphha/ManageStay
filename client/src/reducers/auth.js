
let userState;
if (window.localStorage.getItem("auth")){
  userState=JSON.parse(window.localStorage.getItem("auth"));
}
else{
  userState=null; 
}

// create user reducer function
//just returns the state, no assignment in reducer function 
export const authReducer=(state=userState, action)=>{
    switch(action.type){
      case "Logged_in_user":
        return{...state, ...action.payload}
  
      case"LOGOUT":
        return action.payload;
      
      default:
        return state;
    
    }
};