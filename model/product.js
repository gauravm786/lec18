const mongoose=require("mongoose")

const productSchema=new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId, //this will generate unique id for every student or user
    code:Number,
    title:String,
    description:String,
    mrp:Number,
    sp:Number,
    discountPercent:Number,
    imagePath:String
})

module.exports=mongoose.model("product",productSchema)