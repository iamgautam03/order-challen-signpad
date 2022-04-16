const express = require('express')
const User = require('../models/User')
const {Password} = require("../config");
const bcrypt = require('bcrypt');
const userRouter = express.Router();
const config = require('../config')
const jsonWebToken = require('jsonwebtoken');
const encryptPassword =require('../middleware/EncryptPassword')
userRouter.use(express.json());
userRouter.use(express.urlencoded({extended:false}));

/* example to run on postman : 
url : http://localhost:3000/auth/add-user
json : 
{
    "email":"yashskukreja@gmail.com",
    "password":"878787878",
    "businessName":"Yash & Co.",
    "businessAddress":"Ahmedabad",
    "gst":"tf"
}
*/
userRouter
    .post('/register',async (req,res) => {
        console.log(req.body);
    const Email = req.body.email;
    const Password = await encryptPassword(req.body.password);
    const BusinessName =req.body.businessName;
    const BusinessAddress = req.body.businessAddress;
    const GSTIN = req.body.gstno;
    console.log(req.body);
        User.create({Email,Password,BusinessName,BusinessAddress,GSTIN})
        .then((user) => {
            console.log("inside user register")
            if(!user){
                res.status(400).json({
                    status:400,
                    error:"User not created"
                })
            }
            res.status(200).json({
            status:200,
            user:user
        })}
        )
        .catch(err => res.status(400).json({
            status:400,
            err:err
        }));

});
// url example : http://localhost:3000/auth/yashskukreja@gmail.com
userRouter
    .post("/login",(req,res,next)=>{
        User.findOne({
            Email:req.body.Email
        })
            .then(user=>{
                res.setHeader("content-type",'application/json')
                if(!user) {
                    res.status(400)
                        .send({status:401,error:"Your account not found"});
                }
                bcrypt.compare(req.body.Password,user.Password, (error,data)=>{
                  if(error){
                      res.status(400)
                          .send({status:400,error});
                  }
                  if(data==true) {
                      const token = jsonWebToken.sign({user: user}, config.Secret);
                      res.status(200)
                          .send({token});
                  }
                  else {
                      res.status(400)
                          .send({status:401,error:"password not matched"})
                  }
                })


            })
            .catch(err=>next(err))
    })

module.exports = userRouter;