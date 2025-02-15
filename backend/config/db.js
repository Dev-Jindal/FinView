import mongoose from "mongoose"
import dotenv from "dotenv"
dotenv.config({
    path:"./.env"
})
const dbConnect = async ()=>{
    try{
        await mongoose.connect(`${process.env.DATABASE_URL}`);
        console.log("database connected");
    }catch(error){
        console.log("connection failed");
        console.log(error.message);
        process.exit(1);
    }
}
export {dbConnect}