import mongoose from "mongoose";
import { transaction } from "../models/Transaction.models.js";
import { user } from "../models/User.models.js";
import { ApiError } from "../utils/ApiError.utils.js";
import { ApiResponse } from "../utils/ApiResponse.utils.js";

const createTransaction = async (req, res) => {
  const { amount, receiver: receiverUsername, narration } = req.body;

  try {
    // Check for required fields
    if (!receiverUsername) {
      return res.status(404).json(new ApiError(404, "Receiver is required"));
    }
    if (amount == null || isNaN(amount) || amount <= 0) {
      return res.status(404).json(new ApiError(404, "Valid amount is required"));
    }

    const sender_id = req.user._id; // Sender ID from authenticated user
    console.log("Sender ID:", sender_id);

    // Find the receiver by username
    const receiver = await user.findOne({ username: receiverUsername });
    if (!receiver) {
      return res.status(404).json(new ApiError(404, "Receiver not found"));
    }

    const receiver_id = receiver._id;

    // Check if sender and receiver are the same
    if (sender_id.toString() === receiver_id.toString()) {
      return res
        .status(400)
        .json(new ApiError(400, "Sender and receiver cannot be the same"));
    }

    console.log("Receiver ID:", receiver_id);

    // Deduct amount from sender and add it to receiver
    const sender = await user.findById(sender_id);
    if (!sender) {
      return res.status(404).json(new ApiError(404, "Sender not found"));
    }

    if (sender.balance < amount) {
      return res.status(400).json(new ApiError(400, "Insufficient balance"));
    }

    sender.balance -= amount;
    await sender.save();

    receiver.balance += amount;
    await receiver.save();

    // Create the transaction
    const created_transaction = await transaction.create({
      sender: sender_id,
      receiver: receiver_id,
      amount,
      narration: narration || "",
    });

    console.log("Transaction created:", created_transaction);

    // Respond with the created transaction
    return res.status(200).json(
      new ApiResponse(
        200,
        { created_transaction },
        "Transaction successfully created"
      )
    );
  } catch (err) {
    console.error("Error during transaction creation:", err);
    return res
      .status(500)
      .json(new ApiError(500, "Error while creating transaction"));
  }
};

/*
take input of fromdate and todate and categories array
using pipeline take out data from fromdate to todate and data in which user is either sender or reciever 
then run two pipelines imultaneously in which
in first ->
see the transactions in which user is sender and see its narration search if naartion matches any keyword in any categroy if yes then add that category to the transaction
also add the category name to the variable catagory_total and initial value =0
likecategory_total{
food:0
}
then now travers on the transactions and see the category and respectively add that amount to that category and at last return the full catregory_total object

in second ->
see the transactions in which user is reciever and simply just sum the amount that he recieved and save in any varaiable 

*/
const getInsights = async (req, res) => {

  const { fromDate, toDate, categories } = req.body;

  console.log("i am getting request for insights");
  
  console.log(fromDate,toDate,categories)
  const userId = req.user.id; // Convert userId to ObjectId
  const objectId = new mongoose.Types.ObjectId(userId); // Initialize category totals
  let category_total = {};

  categories.forEach((category) => {
    category_total[category.name] = 0;
  }); // Define pipeline
  category_total["other"] = 0;
  const pipeline = [
    {
      $match: {
        date: { $gte: new Date(fromDate), $lte: new Date(toDate) },
        // $or: [{ sender: objectId }, { receiver: objectId }],
        sender: objectId
      },
    },
    {
      $addFields: {
        category: {
          $reduce: {
            input: categories,
            initialValue: "other",
            in: {
              $cond: {
                if: {
                  $gt: [
                    {
                      $size: {
                        $filter: {
                          input: "$$this.keywords",
                          as: "keyword",
                          cond: {
                            $gt: [
                              { $indexOfCP: ["$narration", "$$keyword"] },
                              -1,
                            ],
                          },
                        },
                      },
                    },
                    0,
                  ],
                },
                then: "$$this.name",
                else: "$$value",
              },
            },
          },
        },
      },
    },
  ];

  const pipeline2 = [
    {
      $match: {
        date: { $gte: new Date(fromDate), $lte: new Date(toDate) },
        receiver: objectId,
      },
    },
  ];
  try {
    const results = await transaction.aggregate(pipeline); // First pipeline: Process debit transactions
    console.log(results[0]);
    console.log(results[1]);
    console.log(results);
    results.forEach((transaction) => {
      console.log(transaction.sender);
      console.log(transaction.category);
      console.log(transaction.amount);

      if (transaction.sender?.equals(userId) && transaction.category) {
        category_total[transaction.category] += transaction.amount;
      }
    });

    const results2 = await transaction.aggregate(pipeline2);
    // Second pipeline: Process credit transactions
console.log("result2")
    console.log(results2)


    const totalCredits = results2.reduce(
      (sum, transaction) => sum + transaction.amount,
      0
    );
 console.log(totalCredits)

    res.status(200).json(
      new ApiResponse(
        200,
        {
          category_total,
          totalCredits,
        },
        "Insights given successfully"
      )
    );
  } catch (err) {
    res.status(404).json(new ApiError(404, "Error in getInsights:"));
  }
};

const profile = async(req,res) => {
  const userWithoutPassword = req.user;
  console.log("returned user is ",userWithoutPassword);
  
return res.status(200).json(new ApiResponse(200,{userWithoutPassword},"Profile fetched successfully"))
  // const sender_id = req.user._id; // Sender ID from authenticated user
  // console.log("Sender ID:", sender_id);
  // try{
  // const sender = await user.findById(sender_id);
  // if (!sender) {
  //   return res.status(404).json(new ApiError(404, "Sender not found"));
  // }
  // return res.status(200).json(new ApiResponse(200,{sender},"Profile fetched successfully"))

  
// }catch(err){
//     console.log(err)
//   }
}

export { createTransaction, getInsights , profile};
