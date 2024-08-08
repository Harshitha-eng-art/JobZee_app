import { asyncHandler } from "./asynhandler.js";
import Errorhandler from "./error.js";
import jwt from 'jsonwebtoken';
import {User} from '../models/usermodel.js'

export const authorisation=asyncHandler(async(req,res,next)=>
{
    const {token}=req.cookies;
    //console.log(token);
    if(!token)
        {
            return next(new Errorhandler("User not authorised",400))
        }
    const decoded=jwt.verify(token,process.env.JWT_SECRET_KEY);
    req.user=await User.findById(decoded.id);
    next();
})