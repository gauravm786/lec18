const jwt = require("jsonwebtoken")

module.exports=(req,res,next)=>{
    //to check whether checkauth is working or not and it returns bearer "token"
    // const token=req.headers.authorization
    // console.log(token)

    try{
    const token=req.headers.authorization.split(" ")[1] //.split()will divide bearer and token seperately in the array and bearer will be  index[0] value and token will be index[1] value
    console.log(token)
    const verify=jwt.verify(token,"this is dummy text") //this verifies whether the token is of the registered user or not
    console.log(verify) //this will return data like jwt.io website
    if(verify.usertype=="Admin"){
        next()
    }
    else{
        return res.status(401).json({
            message:"not Admin"
        })
    }

}
    catch(error)
    {
        return res.status(401).json({
            Message:"invalid token"
        })
    }


}