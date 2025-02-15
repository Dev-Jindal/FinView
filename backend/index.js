import {app} from "./app.js"
import dotenv from "dotenv"
import { dbConnect } from "./config/db.js";
dotenv.config({
    path:"./.env"
})

const port=process.env.PORT||5000;

dbConnect().
then(()=>{
    app.listen(port,(req,res)=>{
        console.log(`server is listening at http://localhost:${port}`);
    })
})
.catch((error)=>{
    console.log("connection 2 failed")
})







