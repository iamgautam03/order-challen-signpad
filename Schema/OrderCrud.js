const mongoose = require('mongoose')
const Order = require('./orderSchema')

const connectionString = "mongodb://localhost:27017/Order_challen_signPad";

const connection = mongoose.connect(connectionString);

connection.then((db)=>{
    console.log('Database connected sucessfully')
})
.catch((err)=>{
    console.log(err);
})

Order.create({
    OrderId:"90001",
    OrderDate: new Date(),
    OrderTotal:100000,
    ReceiverName:"Rocco Jennson",
    ReceiverAddress:"Rocco_Jennson3043@deons.tech",
    ReceiverGSTIN:"07AAWFR0503R1ZK",
    CompanyId:"6241ad05d521e497ca523e57",
    GeneratedLink:"orderchallansign.com/?t=0fd2e237-5290-4503-9863-26495ae7097d"
})
.then(Order=>{
    console.log(Order);
})
.catch(error=>{
    console.log(error);
})

Order.find({})
.then((Order)=>{
    console.log(Order);
})
.catch(err=>{
    console.log(err);
})

