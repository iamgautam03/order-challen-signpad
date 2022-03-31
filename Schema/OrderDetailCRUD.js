const mongoose = require('mongoose')
const OrderDetail = require('./OrderDetailSchema.js')
//const ObjectId = require('mongodb').ObjectId
const connectionString = "mongodb://localhost:27017/Order_challen_signPad";

const connection = mongoose.connect(connectionString);

connection.then((db)=>{
    console.log('Database connected sucessfully')
})
.catch((err)=>{
    console.log(err);
})

OrderDetail.create({
    OrderId: mongoose.Types.ObjectId("6245bc21b58e84a6909d295d"),
    ItemName:"Mi TV",
    ItemQuantity:1,
    ItemPrice:50000
})
.then(Order=>{
    console.log(OrderDetail);
})
.catch(error=>{
    console.log(error);
})

OrderDetail.find({})
.then((Order)=>{
    console.log(OrderDetail);
})
.catch(err=>{
    console.log(err);
})
