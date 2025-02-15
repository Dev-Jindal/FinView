import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { user } from "../models/User.models.js";
import {  generateToken,  isPasswordCorrect} from "../utils/generateToken.utils.js";
import { ApiError } from "../utils/ApiError.utils.js";
import { ApiResponse } from "../utils/ApiResponse.utils.js";

const register = async (req, res) => {
  /*
    take all input values from req.body
    check if any value is missing
    check if already user is present in database
    if not create a user and store in database 
    before returning the user remove passwprd from it 
    and then return
    */

  try {
    const { username, email, password, balance } = req.body;
  
    console.log(username,email,password,balance);
  
    if (!username || !email || !password || !balance) {
      // return res.status(400).json({
      //     success: false,
      //     message: "All fields are required",
      // });
     return res.status(400).json(new ApiError(400, "All fields are required", ["empty field"]));
    }
  
    //check if user already exist
    const existedUser = await user.findOne({ username });
  
    if (existedUser)
      return res.status(400).json(new ApiError(400, "User already registered", ["existing user"]));
  
    const hashPassword = await bcrypt.hash(password, 10);
    const createdUser = await user.create({
      username,
      email,
      password: hashPassword,
      balance,
      accountNumber: Math.floor(Math.random() * 1000000000 + 1) + 1000000000,
    });
  
    const returnedUser = await user.findOne({ username }).select("-password");

    if (returnedUser)
      return res.status(200).json(new ApiResponse(200, returnedUser, "Registered Successfully"));
    else return res.status(400).json(new ApiError(400, "error while creating user"));
  
  } catch (error) {
    res.status(400).json(new ApiError(400));

  }
  // res.status(200).json({
  //     success: true,
  //     message: "Registered successfully",
  // });
};

const login = async (req, res) => {
  // Implementation of user login
  /*
  take all details from req.body
  check if any required detail is empty
  check user already exists or not
  if existed check password using jwt compare
  if correct generate access token and return it and also add it in cookie
  */

 try {

   const { username, password, email } = req.body;
 
   if (!username && !email) {
     return res.status(400).json(new ApiError(400, "Atleast one of username and email are required",["Enough details not present"]));
   }
 
   const existedUser = await user.findOne({
     $or: [{ username }, { email }],
   });
 
   if (!existedUser) return res.status(400).json(new ApiError(400, "user is not registered",["already registered"]));
 
 
   const isValid = await isPasswordCorrect(password, existedUser.password);
 
   if (!isValid) {
     
    return res.status(500).json(new ApiError(500,"Invalid Credentials",["Invalid Credentials"]));
   }
 
   const options = {
     httpOnly: true,
     secure: true
 }

   const accessToken =await generateToken(existedUser._id);
 
 console.log("generated access token")
   return res.status(200).cookie("access_token",accessToken,options).json(
     new ApiResponse(
       200,
       {
         user:existedUser,
         accessToken
       },
       "logged in successfully"
     )
   );
 
 } catch (error) {
  return res.status(404).json(new ApiError(400,"can't login",["can't login"]))
 }
 
};

const logout = (req, res) => {
  // Implementation of user logout

};

export { login, logout, register };





// const register = async (req, res) => {
//     // Implementation of user registration
//     const {username,email,password,balance} = req.body;
//     await user.create({
//       username,
//       email,
//       password,
//       balance,
//       accountNumber:"123456789"

//     })
//     res.status(200).json({
//       success:true,
//       message:"registered successfully"
//     })
//   };

 