const express = require('express');
const orderRouter = express.Router();

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

module.exports= orderRouter;