import dotenv from "dotenv";
import express, { Application } from 'express';

dotenv.config();

const app:Application  = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json()); 

app.listen(Number(process.env.PORT),()=>{
    console.log("Server is Connected :",Number(process.env.PORT));
})
