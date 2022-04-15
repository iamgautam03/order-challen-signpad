const express = require('express');
const orderRouter = express.Router();
const { verifyLinkToken,generateLinkToken } = require('../helpers/link')
const Order = require('../models/Order')
orderRouter.use(express.json());
orderRouter.use(express.urlencoded({extended:false}));


orderRouter
.get('/',(req,res,next)=>{
    Order.find({})
    .then((orders)=>{
        res.statusCode=200;
        res.setHeader('content-type','application/json');
        res.send(orders);
    })
    .catch(err=>next(err));
})
.get("/:OrderId",(req,res,next)=>{
    Order.findOne({"OrderId":req.params.OrderId})
    .then((orders)=>{
        if(!orders){
            res.statusCode=404;
            res.setHeader('content-type','application/json');
            res.send({
                "error":"Data not found"
            });
        }
        res.statusCode=200;
        res.setHeader('content-type','application/json');
        res.send(orders);
    })
    .catch(err=>next(err));
})
.get('/token/:token',async (req,res,next)=>{
    
    // const token = await generateLinkToken("6246c492219d326d633df9ee","6246c492219d326d633df9ee");
    // console.log(token);
    const order = await verifyLinkToken(decodeURIComponent( req.params.token))
    console.log(order);

    res.setHeader('content-type','application/json');
    if(!order){
        res.statusCode=404;
        res.send({
            "error":"Data not found"
        });
    }
    res.statusCode=200;    
    res.send(order);
    // res.statusCode=200;
    // res.setHeader('content-type','application/json');
    // res.send(encodeURIComponent( token));
})

module.exports= orderRouter;