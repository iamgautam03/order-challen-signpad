const jwt = 'jsonwebtoken';
const UserPath = '../models/User';
const jsonWebToken = require(jwt);
const config = require('../config')
module.exports = (req,res,next)=>{

    console.log(UserPath)

    const header = req.headers.authorization.split(' ')[1];

    jsonWebToken.verify(header,config.Secret,(error,result)=>{
        if(error){
            res.setHeader("content-type",'application/json');
            res.status(400).send(error);
            return;
        }
        if(!result){
            res.setHeader("content-type",'application/json');
            res.status(401)
                .send({error:"User not found"});
         return;
        }
        const User = require(UserPath)
        User.findOne({Email:result.user.Email})
            .then(user=>{
                if(!user){
                    res.setHeader("content-type",'application/json');
                    res.status(401)
                        .send({error:"User not found"});
                    return
                }
                req.user = result.user;
                next()
            })
            .catch(err=>next(err))

    })
}