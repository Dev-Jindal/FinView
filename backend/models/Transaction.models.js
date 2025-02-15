import mongoose from "mongoose"
import {user} from "./User.models.js"
const transactionSchema = new mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
    },
    receiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: user,
    },
    amount: {
        type: Number,
        required: true,
    },
    narration: {
        type: String,

    },
    date: {
        type: Date,
        default: Date.now,
    },
}, { timestamps: true });
const transaction = mongoose.model("transaction", transactionSchema);

export { transaction };