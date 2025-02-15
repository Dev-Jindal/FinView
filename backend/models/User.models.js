import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    accountNumber: {
        type: Number,
        unique: true,
    },
    balance: {
        type: Number,
        required: true,
    }

}, { timesstamps: true });

const user = mongoose.model("user", userSchema);
export { user };