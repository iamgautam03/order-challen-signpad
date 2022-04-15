const express = require('express');
const orderRouter = express.Router();
const {generateLinkToken,verifyLinkToken} = require('../helpers/link');
const Order = require('../models/Order');
const OrderDetails = require("../models/OrderDetail");
orderRouter.use(express.json());
orderRouter.use(express.urlencoded({extended:false}));

orderRouter
.get('/',(req,res,next) => {
    Order.find({})
    .then((orders)=>{
        res.statusCode=200;
        res.setHeader('content-type','application/json');
        res.send(orders);
    })
    .catch(err=>next(err));
})
.post('/add', async(req, res, next) => {
    const orderData = {
        OrderId: req.body.orderId,
        OrderDate: req.body.orderDate,
        OrderTotal: req.body.total,
        ReceiverName: req.body.receiverName,
        ReceiverEmail: req.body.receiverEmail,
        ReceiverGSTIN: req.body.receiverGSTIN,
        CompanyId: req.body.companyId,
    };
    orderData.GeneratedLink = await generateLinkToken(req.body.orderId, req.body.companyId);
    console.log(orderData);

    Order.create(orderData).then((order) => {
        const items = req.body.orderDetails;
        items.forEach((item) => {
            const itemData = item;
            itemData.OrderId = order._id;
            OrderDetails.create(itemData)
                .then((OrderDetails) => {
                    console.log(OrderDetails);
                }).catch((err) => {
                    console.error(err);
                })
        });
        res.statusCode=200;
        res.setHeader('content-type','application/json');
        res.send({
            'status': 1,
            'link': order.GeneratedLink
        });
    }).catch((err) => {
        next(err);
    });
})
.get("/:OrderId",(req,res,next) => {
    Order.findOne({"OrderId":req.params.OrderId})
    .then((orders)=>{
        if(!orders) {
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
});

module.exports= orderRouter;