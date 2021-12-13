const express=require("express")
const router=express.Router()
const mongoose=require("mongoose")
const User=require("../model/user")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")


//get request
router.get("/",(req,res,next)=>{
    User.find()
    .then(result=>{
        res.status(200).json({
            User:result
        })
    })
    .catch(err=>{
        res.status(500).json({
            error:err
        })
    })
})

router.post("/signup",(req,res,next)=>{                 //this is signup api and therefore its endpoint should be /signup
    bcrypt.hash(req.body.password,10,(err,hash)=>{
        if(err){
            return res.status(500).json({
                error:err
            })
        }
        else{
            const user=new User({
                _id: new mongoose.Types.ObjectId,
                username:req.body.username,
                password:hash,
                phone:req.body.phone,
                email:req.body.email,
                usertype:req.body.usertype,
                // usertypes:req.body.usertypes
            })
            user.save()
        
            .then(result=>{
                res.status(200).json({
                    new_user:result
                })
            })
            .catch(err=>{
                res.status(500).json({
                    error:err
                })
            })
        }
    })
})


router.post("/login",(req,res,next)=>{
    User.find({username:req.body.username}) //anything return from here will be stored in user below,username will get in array
    .exec() //after finding username .exec() will be executed/work
    .then(user=>{           
        //if we didnt get user
        if(user.length<1){
            res.status(401).json({
                message:"user not exist"
            })
        }
        //when we get user,//it will match password with the user 
        bcrypt.compare(req.body.password,user[0].password,(err,result)=>{
            if(!result) //not result means if password didnt match with user
            {
                return res.status(401).json({
                    message:"password maching fail"
                })
            }
            if(result)  //result means password match,then we install jwt(jason web token,which will help to make token) and send token(token is send to user) 
            {//to install jwt we type npm install jsonwebtoken on terminal
                const token=jwt.sign({
                    username:user[0].username, //with the help of token we will know whether the user is admin or any else,so we will include all the value except password
                    usertype:user[0].usertype,
                    // usertypes:user[0].usertypes,
                    email:user[0].email,
                    phone:user[0].phone
                    //with the help of above four values we will create token
                },
                //here we pass secret key
                "this is dummy text",  //this will be used at the time of verification because it is a secret code
                {
                    expiresIn:"24h" //after 24hrs token will be disappeared
                }
                )
                res.status(200).json({ //we send token with full information
                    username:user[0].username,
                    usertype:user[0].usertype,
                    // usertypes:user[0].usertypes,
                    email:user[0].email,
                    phone:user[0].phone,
                    token:token
                })
            }

        }) 
    })
    .catch(err=>{
        res.status(500).json({
            err:err
        })
    })

})

module.exports=router

// The exec() method executes a search for a match in a specified string. Returns a result array, or null.
// The exec() function helps in searching for strings and matching them. 
// You can easily search the regular expressions and patterns by making use of the exec() function. 
// It will search the string and then return it in the form of an array. 
// This array makes it a systematic result pattern. 
// As a result, it is also fast in retrieving the result. 
// If there is no match found then directly the result is returned as null. 
// It is a simple and fast way of finding text in JavaScript.

//compare() method is used to match password of the username