import User from "../models/user";
import Hotel from "../models/hotel";
import Stripe from "stripe";
import queryString from "query-string";
import Order from "../models/order";


const stripe = Stripe(process.env.STRIPE_SECRET);

/*
NAME:  createConnectAccount
        

SYNOPSIS:  createConnectAccount(token)


DESCRIPTION:   async function that gets token and  creates the stripe connect account and user is connected to stripe

RETURNS : 
        returns response from backend for creating stripe account


*/
/**/

export const createConnectAccount=async (req, res)=>{
  // find user from db
  const user = await User.findById(req.user._id).exec();

  //  if user don't have stripe_account_id yet, create new id
  if (!user.stripe_account_id) {
    const account = await stripe.accounts.create({
      type: "express",
    });
    console.log("ACCOUNT ===> ", account);
    user.stripe_account_id = account.id;
    //saved in user object
    user.save();
  }

  //  create login link based on account id (for frontend to complete onboarding)
  let accountLink = await stripe.accountLinks.create({
    account: user.stripe_account_id,
    refresh_url: process.env.STRIPE_REDIRECT_URL,
    return_url: process.env.STRIPE_REDIRECT_URL,
    type: "account_onboarding",
  });



  accountLink = Object.assign(accountLink, {
    "stripe_user[email]": user.email || undefined,
  });


  let link = `${accountLink.url}?${queryString.stringify(accountLink)}`;
  res.send(link);




}

  // update payment schedule (optional. default is 2 days)
const updateDelayDays= async(accountId)=>{
  const account= await stripe.accounts.update(accountId, {
    settings: {
      payouts: {
        schedule: {
          delay_days: 8,
        },
      },
    },
  });

  return account;

}
/**/
/*
NAME:  getAccountStatus
        

SYNOPSIS:  getAccountStatus(token)


DESCRIPTION:   async function that gets req, res too update the user and it props stripe_seller:updatedaccount
        

RETURNS : 
        returns response  of updateuser with stripe_seller data


*/
/**/

export const getAccountStatus=async (req, res)=>{

  //database query
  const user =await User.findById(req.user._id).exec();

  //stripe API provides the function to retrive the information of the user which was stored in the database,
  // charges_enabled is true, which means the user is succesfully connected to the stripe 
  const account=await stripe.accounts.retrieve(user.stripe_account_id);


  //update delay days
  const updatedaccount=await updateDelayDays(account.id);
  const updatedUser= await User.findByIdAndUpdate(
    user._id,
    {
      stripe_seller:updatedaccount,
    },
    {new:true}
  )
  .select("-password").exec();  //sending the user info on the front-end and avoiding to send the password.

  res.json(updatedUser); //response is sent

};


/*
NAME:  getAccountbalance
        

SYNOPSIS:  getAccountbalance()


DESCRIPTION:   async function that gets req, res and send the balance in stripe of the particular user

RETURNS : 
        returns  balance in stripe of the particular user 



*/

export const getAccountbalance = async (req, res) => {
  const user = await User.findById(req.user._id).exec();

  try {
    const balance = await stripe.balance.retrieve({
      stripeAccount: user.stripe_account_id,
    });
    
    res.json(balance);
  } catch (err) {
    console.log(err);
  }
};

/*
NAME:  payoutSettings
        

SYNOPSIS:  payoutSettings()


DESCRIPTION:   async function for creating a payouts settings for the user
            navigates to stripe payout url and redirects back to ManageStay

RETURNS : 
        returns response from backennd for redirecting link to stripe 


*/
/**/

export const payoutSettings=async(req,res)=>{
  try{
    const user=await User.findById(req.user._id).exec();


    const loginLink = await stripe.accounts.createLoginLink(
      user.stripe_account_id,
      {redirect_url:process.env.STRIPE_SETTING_REDIRECT_URL},
  );
    
    res.json(loginLink);
  }
  catch(err){
    console.log("stripe payout setting error",err);
  }
} 
/*
NAME:  stripeSessionId

SYNOPSIS:  stripeSessionId(req, res)


DESCRIPTION:   async function creates a checkout session, and redirects to the url as per the success or failure

RETURNS : 
        none

*/
/**/
export const stripeSessionId=async(req, res)=>{

  //get hotelId from req.body
  const {hotelId}=req.body;

  //find the hotel based on hotelId from db
  const item=await Hotel.findById(hotelId).populate('postedBy').exec();
  
  //15% charge as application fee
  const fee=(item.price)*15/100;


  //create a session
  const session =await stripe.checkout.sessions.create({
    payment_method_types:['card'],
    //purchasing item details, it will be shown to user on checkout
    line_items:[{
      name:item.title,
      amount: item.price *100,
      currency:"usd",
      quantity: 1,
    },
  ],
  success_url: `${process.env.STRIPESUCCESSURL}/${item._id}`,
  cancel_url:  process.env.STRIPEFAILURL,

  //create payment intent with application fee and destination charge 85%
  payment_intent_data : {
      application_fee_amount: fee*100,
      transfer_data: {
        destination:item.postedBy.stripe_account_id,
      },
  },

  });

   
  
  //ADD THIS session object to user in the db
  await User.findByIdAndUpdate( req.user._id, {stripeSession:session}).exec();
  res.send({sessionId: session.id});

};



/*
NAME:  StripeSuccess
        

SYNOPSIS:  StripeSuccess(req, res)


DESCRIPTION:   async function that gets req and res and ensuring the order for the hotelId where the payment is successful

RETURNS : 
        returns response from backend,  json object

*/
/**/
export const stripeSuccess=async(req, res)=>{
  //get hotelid from request body
try{const {hotelId}=req.body;

  //find currently logged in user
  const user =await User.findById(req.user._id).exec();

  //check if user have stripe session
if(!user.stripeSession)return;

//retreive stripe session based on session id we previously saved in User db
  const session=await stripe.checkout.sessions.retrieve(user.stripeSession.id);

  if (session.payment_status==='paid'){
    const orderExist=await Order.findOne({"session.id":session.id}).exec();
    if(orderExist){
      res.json({success:true});
    }
    else{
      let createNewOrder=await new Order({hotel:hotelId,session,orderedBy: user._id}).save();

      await User.findByIdAndUpdate(user._id,{$set:{stripeSession:{}}})
      res.json({success:true});
    }
  
  }
}
  catch(err){
    console.log(err);
  }
}