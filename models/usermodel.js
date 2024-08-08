import mongoose from "mongoose";
import validator from "validator";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


const UserSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minLength:[3,"name must contain atleat 3 characters"],
        maxLength:[30,"name must not exceed 30 characters"]

    },
    email:{
        type:String,
        required:[true,"please provied email"],
        validate:[validator.isEmail,"please provied valid email"]
    },
    phone:{
        type:Number,
        required:[true,"please provied number"]
    },
    password:
    {
        type:String,
        required:[true,"please provied password"],
        minLength:[8,"password must contain atleat 3 characters"],
        maxLength:[32,"password must not exceed 30 characters"]
    },
    role:
    {
        type:String,
        required:[true,"please provied role"],
        enum:["Job Seeker","Employer"],
    },
    createdAt:
    {
        type:Date,
        default:Date.now,
    }
})

//Hasing the password
UserSchema.pre("save",async function(next){
    if(!this.isModified("password"))
        {
            next()
        }
        this.password= await bcrypt.hash(this.password,10);
})
//comparing password
UserSchema.methods.comparePassword=async function (enteredPassword)
{
    return await bcrypt.compare(enteredPassword,this.password)
};
//genrating jwt tokens for autorisation
UserSchema.methods.getJWTTokens=function(){
    return jwt.sign({id: this._id},process.env.JWT_SECRET_KEY,
       {  expiresIn: process.env.JWT_EXPIRE}
    )
}
export const User=mongoose.model ("User",UserSchema)