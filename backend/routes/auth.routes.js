import express from "express"
import {register,login} from "../controllers/auth.controller.js"
import {auth} from "../middlewares/auth.middlewares.js"
import {profile} from "../controllers/transaction.controller.js"
const router = express.Router();

router.post("/register",register);
router.post("/login",login);
router.get('/profile',auth,profile);
export {router};