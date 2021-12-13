const express=require("express")
const router=express.Router()
const mongoose=require("mongoose")
const Product=require("../model/product")
const checkAuth=require("../middleware/checkauth")


//get request
router.get("/",checkAuth,(req,res,next)=>{
Product.find() //.find() will find all the data in database and will display on the postman
.exec() //using exec() is an optional
.then(result=>{
res.status(200).json({
ProductData:result
// result
})
})

.catch(err=>{
console.log(err)
res.status(500).json({
error:err
})    
})
})


//get by id request
router.get("/:id",(req,res,next)=>{
    console.log(req.params.id)  //params.id will show  only single data out of multiple data with the help of id and here data will be shown in terminal
    Product.findById(req.params.id)
    .then(result=>{
        res.status(200).json({
            Product:result
    })
    })

    .catch(error=>{console.log(error)
    res.status(500).json({
        newProduct:error
    })    
    })
})


//post request
router.post("/",(req,res,next)=>{
   const product=new Product({       
    _id:new mongoose.Types.ObjectId, 
    code:req.body.code,
    title:req.body.title,
    description:req.body.description,
    mrp:req.body.mrp,
    sp:req.body.sp,
    discountPercent:req.body.discountPercent,
    imagePath:req.body.imagePath
   })

   product.save()

   .then(result=>{console.log(result)
   res.status(200).json({
       newProduct:result
   })
   })  

   .catch(err=>{console.log(err)
   res.status(500).json({
    newProduct:error
   })
   })
   
})


//delete request
router.delete("/:id",(req,res,next)=>{
    Product.remove({_id:req.params.id})
    .then(result=>{
        res.status(200).json({
            message:"product deleted",
            result:result          //returns response bydefault by the system or postman
        })
    })
    .catch(error=>{
        res.status(500).json({
            message:"error",
            error:err
        })
    })
})

// put request 
router.put("/:id",(req,res,next)=>{
    console.log(req.params.id)
    Product.findOneAndUpdate({_id:req.params.id},{
        $set:{
            code:req.body.code,
            title:req.body.title,
            description:req.body.description,
            mrp:req.body.mrp,
            sp:req.body.sp,
            discountPercent:req.body.discountPercent,
            imagePath:req.body.imagePath
        }
    })
    .then(result=>{
        res.status(200).json({
            message:"product updated",
            result:result
        })
    })
    .catch(error=>{
        res.status(500).json({
            message:"error",
            err:error
        })
    })
})

module.exports=router

