

import User from "../models/user";
import jwt from "jsonwebtoken";
import validator from 'validator';


/**/
/*
NAME:register
        

SYNOPSIS: register(req, res)


DESCRIPTION: controller for  registering the user.
            checks the requirements and condition before sending the response
            uses validator for email validation

RETURNS : 
        returns response:success or failure

AUTHOR : Ishit Lal Pradhan

DATE: 05/25/2022

*/
/**/
export const register=async(req, res)=>{
   
    try{
        console.log(req.body);
        const{name, email, password,phone}=req.body;

    
        if (!name) return res.status(400).send("Name is required!!!");
        if (!email) return res.status(400).send("Email is required!!!");
        if(!validator.isEmail(email)) return res.status(400).send("Email is invalid!");
        // if(!( "/\S+@\S+\.\S+/".test(email)))return res.status(400).send("Email is invalid");
        if (!password){
            return res.status(400).send("Password is required and should be atleast 6 characters!!!" );
        }
        if (password.length<6){
            return res.status(400).send("Password should be atleast 6 characters!!!" );
        }
        if(!phone){
            return res.status(400).send("Phone number is required");
        }
    
        //email is unique so, checking if email already  exist in the database
        let userExist=await User.findOne({email}).exec();
        if (userExist){
            return res.status(400).send("Email is already taken!!!");
        }
        
        //registering the new user
        const user=new User(req.body);
        await user.save();
        console.log("Successfully Created the user ", user);
        return res.json({okay:true});
    }
    catch(err){
        console.log("creating user failed", err);
        return res.status(400).send("Error!!!")
    }
};


/**/
/*
NAME: login()
        

SYNOPSIS: login(user)
          user: object with user props for login credentials


DESCRIPTION:controller for login the user.
    uses: - jwt for generating a token once password matched, token valid for 14days
    



RETURNS : 
        returns json object login was succesful or send error response 

AUTHOR : Ishit Lal Pradhan

DATE: 05/25/2022

*/
/**/
export const login=async(req, res)=> {

   
    try{
        const{email, password}=req.body;
        let user= await User.findOne({email}).exec();
        console.log("user exist!!", user);
        if(!User){
            return res.status(400).send("user with that email not found");
        }
        user.comparePassword(password, (err, match)=>{
            console.log("Compare Password in Login err", err);
            if(!match||err){
                return res.status(400).send("Wrong password");
            }


        //"generate a token then send as a response to client"
        //sign token
        //token valid for 14days
        
        let token= jwt.sign({_id: user._id},process.env.JWT_SECRET,{
            expiresIn:'14d',
        });

        // sending the attributes as a  response to the front-end.
        res.json({token, user:{
            _id: user._id,
            name:user.name,
            email:user.email,
            createdAt: user.createdAt,
            updateAt: user.updateAt,
            stripe_account_id:user.stripe_account_id,
            stripe_seller:user.stripe_seller,
            stripeSession:user.stripeSession,
            }
        });
        });
    }
    catch(err){
        console.log("User Login failed", err);
        res.status(400).send("sign-in failed");
    }
   
};