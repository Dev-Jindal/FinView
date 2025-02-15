import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { ApiError } from "./ApiError.utils.js";

const generateToken = async (id) => {
  try {
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined in environment variables");
    }
    const payload = {
      user:
       {
         id:id
        }
    };

    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });

  } catch (error) {
    console.error("Error generating token:", error.message);
    throw error; // Rethrow error for caller to handle
  }
};

const isPasswordCorrect = async (password, existingPassword) => {
  try {
    if(!password||!existingPassword){
        return res.status(404).json(new ApiError(404,"both password and hash passwords are required"));
    }
    const isValid = await bcrypt.compare(password, existingPassword);
    return isValid;
  } catch (error) {
    console.error("Error comparing passwords:", error.message);
    return false; // Rethrow error for caller to handle
  }
};

export { generateToken, isPasswordCorrect };
