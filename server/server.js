

import express from 'express';
import {readdirSync }from 'fs';
import cors from "cors";
import mongoose from "mongoose";
require('dotenv').config();
const morgan=require("morgan");


const app=express();


//middlewares:
//cors to communicate between the different domains. 
app.use(cors());

app.use(morgan("dev"));

//in order to use json data from the post method request, need to use bodyparser or express.json()
app.use(express.json());

//middleware for routes:
readdirSync('./routes').map((r)=>app.use('/api', require(`./routes/${r}`)));


const port =process.env.PORT || 8000;

app.listen(port, ()=> console.log(`server is running on port ${port}`));


mongoose.connect(process.env.DATABASE, {})
  .then(() => console.log("DB connected"))
  .catch((err) => console.log("DB Error : ", err));