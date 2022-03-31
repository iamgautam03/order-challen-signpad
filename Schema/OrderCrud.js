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

const OrderId = new mongoose.Types.ObjectId();

const crudOperatoin =  async ()=>{
await Order.create({
    _id:OrderId,
    OrderId:"90001",
    OrderDate: new Date(),
    OrderTotal:100000,
    ReceiverName:"Rocco Jennson",
    ReceiverAddress:"Rocco_Jennson3043@deons.tech",
    ReceiverGSTIN:"07AAWFR0503R1ZK",
    CompanyId:"6245dec4d74b3dac7f8aa034",
    GeneratedLink:"orderchallansign.com/?t=0fd2e237-5290-4503-9863-26495ae7097d"
})
.then(Order=>{
    console.log(Order);
})
.catch(error=>{
    console.log(error);
})
console.log("finding data")
await Order.find({})
.then((Order)=>{
    console.log(Order);
})
.catch(err=>{
    console.log(err);
})

console.log("updating signStatus");
await Order.findByIdAndUpdate(OrderId,{
    SignStatus:true
})
.then(order=>{
    console.log(order)
})
.catch(err=>{
    console.log(err);
})
console.log("finding data by id")
await Order.findById(OrderId)
.then(order=>{
    console.log(order);
})
.catch(err=>{
    console.log(err);
})

console.log("delete order by id")
await Order.findByIdAndDelete(OrderId)
.then(order=>{
    console.log(order);
})
.catch(err=>{
    console.log(err);
})


console.log("finding data by id")
await Order.findById(OrderId)
.then(order=>{
    console.log(order);
})
.catch(err=>{
    console.log(err);
})

}

crudOperatoin()