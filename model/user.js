const mongoose=require("mongoose")

const userSchema=new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId, //this will generate unique id for every student or user
    username:String,
    password:String,
    phone:Number,
    email:String,
    usertype:String
})

module.exports=mongoose.model("user",userSchema)