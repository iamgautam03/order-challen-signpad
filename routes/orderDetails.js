const express = require('express')
const orderDetail = require('../models/OrderDetail')
const orderDetailRouter = express.Router();

orderDetailRouter.use(express.json());
orderDetailRouter.use(express.urlencoded({extended:false}));


orderDetailRouter
.get('/:orderId',(req,res,next)=>{
    console.log(req.find);
    orderDetail.find({"OrderId":req.params.orderId})
    .then((orderDetails)=>{
        res.statusCode=200;
        res.setHeader('content-type','application/json');
        res.send(orderDetails);
    })
    .catch(err=>{
        next(err);
    })
})



module.exports = orderDetailRouter;