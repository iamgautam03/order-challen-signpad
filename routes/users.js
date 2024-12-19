var express = require('express');
const User = require('../models/User');
var router = express.Router();
var VerifyJwt =require('../middleware/VerifyJwt')

router.get('/', VerifyJwt,function(req, res, next) {
        res.statusCode=200;
        res.setHeader('content-type','application/json');
        res.send(req.user);
})
.get('/:id',(req,res,next)=>{

        User.findById(req.params.id)
            .then((User)=>{
                    res.statusCode=200;
                    res.setHeader('content-type','application/json');
                    res.send(User);
            })
            .catch(err=>{
                    next(err);
            })
})
module.exports = router;
