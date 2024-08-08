import { asyncHandler } from '../middlewares/asynhandler.js';
import ErrorHandler from '../middlewares/error.js';
import { User } from '../models/usermodel.js';
import { sendToken } from '../utils/jwttokens.js';

export const register = asyncHandler(async (req, res, next) => {
    const { name, email, phone, password, role } = req.body;
    //console.log(email);
    if (!name || !email || !phone || !password || !role) {
        return next(new ErrorHandler("Please fill full form!", 400));
    }
    const isEmail = await User.findOne({ email });
    if (isEmail) {
        return next(new ErrorHandler("Email already registered!", 400));
    }
    const user = await User.create({
        name,
        email,
        phone,
        password,
        role,
    });
    sendToken(user, 201, res, "User Registered!");
});

  
export const login=asyncHandler(async(req,res,next)=>
{
    const {email,password, role}=req.body;
    //console.log(email);
    if(!email || !password || !role)
        {
           return next(new ErrorHandler("please provied email and password"))
        }

    const user = await User.findOne({ email });
    if(!user )
        {
            return next(new ErrorHandler("Invalid Email Or Password.", 400));
        }
    const isPasswordValid= await user.comparePassword(password)
    if(!isPasswordValid)
        {
            
            return next (new ErrorHandler("Invalid Password",400))
        }
        //console.log(role);
        //console.log(user.role)
    if(user.role !== role)
        {
            throw new ErrorHandler("incoorect role")
        }
        sendToken(user, 201, res, "User Logged In!");
});
export const logout=asyncHandler(async(req,res,next)=>{
    res.status(201).cookie("token"," ",{
        httpOnly:true,
        expires:new Date(Date.now())
    }
    ).json({success:true,
        message:"Log out Successful"
    });
})


export const getUser=asyncHandler(async(req,res,next)=>
{
    const user=req.user;
    res.status(200).json({
        success:true,
        user,
    })
}) 
