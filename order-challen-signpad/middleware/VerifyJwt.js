const jsonWebToken = require('jsonwebtoken');
const User = require('../models/User')
const config = require('../config')
module.exports = (req,res,next)=>{

    const header = req.headers.authorization.split(' ')[1];
    if(header==null){
        res.setHeader("content-type",'application/json');
        res.status(401)
            .send({error:"User not found"});
        next(err)
    }
    jsonWebToken.verify(header,config.Secret,(error,result)=>{
        if(error){
            res.setHeader("content-type",'application/json');
            res.status(400).send(error);
        }
        if(!result){
            res.setHeader("content-type",'application/json');
            res.status(401)
                .send({error:"User not found"});
        }
        User.findOne({Email:result.user.Email})
            .then(user=>{
                if(!user){
                    res.setHeader("content-type",'application/json');
                    res.status(401)
                        .send({error:"User not found"});
                }
                req.user = result.user;
                next()
            })
            .catch(err=>next(err))

    })
}