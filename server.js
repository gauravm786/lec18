const http=require("http")
const app=require("./app")
const server=http.createServer(app)

server.listen(3333,console.log("app is running"))


//to use postman in node.js
//go to extension and download thunder client 

//signup

//     "username":"Gaurav1",
//     "password":"gauravm@gm1",
//     "phone":9967600642,
//     "email":"gauravm.103@gmail.com",
//     "usertype":"Admin"
