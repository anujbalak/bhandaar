import { Router } from "express";
import { getSignup, postSignup } from "../controllers/signupController.js";

const signupRouter = Router();

signupRouter.get('/', getSignup);
signupRouter.post('/', postSignup)

export default signupRouter