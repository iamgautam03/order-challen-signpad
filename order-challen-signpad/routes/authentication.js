const express = require('express')
const User = require('../models/User')
const userRouter = express.Router();

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
userRouter.route('/add-user').post((req,res) => {
    const Email = req.body.email;
    const Password = req.body.password;
    const BusinessName =req.body.businessName;
    const BusinessAddress = req.body.businessAddress;
    const GSTIN = req.body.gst;

    const newUser = new User({Email,Password,BusinessName,BusinessAddress,GSTIN});
    newUser.save()
        .then(() => res.json("User added"))
        .catch(err => res.status(400).json("error:"+err));

});
// url example : http://localhost:3000/auth/yashskukreja@gmail.com
userRouter.get('/:email',(req,res,next)=>{
    console.log(req.find);
    
    User.find({"Email":req.params.email})
    .then((User)=>{
        res.statusCode=200;
        res.setHeader('content-type','application/json');
        res.send(User);
    })
    .catch(err=>{
        next(err);
    })
})


module.exports = userRouter;