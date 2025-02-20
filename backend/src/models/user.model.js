import mongoose from "mongoose"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    password:{
        type:String,
        required:true,
        trim:true,

    },
    role:{
        type:String,
        required:true,
    },
    department:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true,
    }
},{timestamps:true,});

userSchema.pre("save",async function(next){
    if(!this.isModified("password"))return next(); //skip this if password is not moddified
    this.password = await bcrypt.hash(this.password,10);//if password is changed or updated then we should hash and save it into the database

    next();//save the password in the database....that is after hashing 

})

userSchema.methods.isPasswordCorrect = async function(password)
{
    return await bcrypt.compare(password,this.password); 
    //Here we didnt use the next() ? why we didn't use here
    //The reason behind it is this is simply comparing the password which was given by
    //user and the password which was saved in the database 
    //this compariosn doesnt involve the mongoDB life cycle comparison
}

userSchema.methods.generateAccessToken = function(){
    // Here why async operation is not used 
    // beacuse jwt.sign is not a asynchronous function and it does not involve any db calls 
    //It is clealry a synchronous operation 
    ///juwt.sign immedialtely return the string 
    // and it doesnot return any promise 
    try {
        const token = jwt.sign(
            {
                _id :this._id,
                email:this.email,
                username:this.username,
            },
            process.env.ACCESS_TOKEN_SECRET
            ,
            {
                expiresIn:43200 //12 hours
            }
        )
        return token;
        
    } catch (error) {
        console.log("error while generating the token");
        throw new Error("Failed to generate the accesstoken");
        
    }

}


export const User = mongoose.model("User",userSchema);
