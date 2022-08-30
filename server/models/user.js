
// after getting the user data in the controller, its in the request body
// now here I'm creating the user schema to define the props for the user, which will then be saved to the database(mongodb). 

import mongoose from "mongoose";
import bcrypt from "bcrypt";
const {Schema}= mongoose

const userSchema= new Schema({
    // objects
    name:{
        type:String,
        trim:true,
        required:'Name is required'
    },
    // should be unique among the users
    email:{
        type:String,
        trim: true,
        required:'Email is required',
        unique: true
    },
    password:{
        type:String,
        required:true,
        min:6,
        max:20
    },
    phone:{
        type:String,
        required:true,
    },
    // stripe account
    stripe_account_id:'',
    stripe_seller:{},
    stripeSession:{}
},

//second object of  schema for create and update time stamps in database.
{timestamps:true}

);

// while saving user, we need to make sure the password is hashed to save a password.
//hasing should be done only in 2 situations:
// if it is the first time the user is being saved or user have modified their password 
userSchema.pre('save', function(next){
    let user=this;

    // hash password only if the user is changing the password or registerin for the first time.

    if (user.isModified('password')){
        return bcrypt.hash(user.password, 12, function(err, hash){
            if( err){
                console.log("bcrpyt hash error!!!", err);
                return next(err);
            }

            //if no error
            user.password=hash;
            return next();
        });
    }
    else{
        return next();
    }
    
});

/**/
/*
NAME: userSchema.methods.comparePassword
        

SYNOPSIS: userSchema.methods.comparePassword
        next is a callback function here

DESCRIPTION: function in the User model  
            compare password using bcrypt
             
RETURNS : 
        returns err or match


*/
/**/

userSchema.methods.comparePassword=function(password, next){
    bcrypt.compare(password, this.password, function(err, match){
        if(err){
            console.log('compare password err',err);
            return next(err, false);
        }
        //if no err 
        console.log("Match Password", match);
        return next(null, match);// true
    })
}
export default mongoose.model("User", userSchema);