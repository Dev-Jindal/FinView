import express from "express"
import cors from "cors";

import {router as transactionRouter} from "./routes/transaction.routes.js"
import {router as userRouter} from "./routes/auth.routes.js"
const app = express();


app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());

app.use('/user',userRouter);
app.use("/trans",transactionRouter)

export {app}