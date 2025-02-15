import express from "express"
import {auth} from "../middlewares/auth.middlewares.js"
import { createTransaction,getInsights} from "../controllers/transaction.controller.js";
const router = express.Router();


router.post('/create', auth, createTransaction);
router.post('/insights', auth, getInsights);

export {router}