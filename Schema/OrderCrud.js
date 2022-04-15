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

// const OrderDatas = {
//     _id:new mongoose.Types.ObjectId(),
//     OrderId:"90001",
//     OrderDate: new Date(),
//     OrderTotal:100000,
//     ReceiverName:"Rocco Jennson",
//     ReceiverAddress:"Rocco_Jennson3043@deons.tech",
//     ReceiverGSTIN:"07AAWFR0503R1ZK",
//     CompanyId:"6245dec4d74b3dac7f8aa034",
//     GeneratedLink:"orderchallansign.com/?t=0fd2e237-5290-4503-9863-26495ae7097d"
// }

const createOrder = async (orderData)=>{
    await Order.create(orderData)
    .then(result=>{
        console.log(result);
    })
    .catch(error=>{
        console.log(error);
    })
}

const searchOrder = async (data)=>{
    
console.log("finding data")
await Order.findOne(data)
.then((Order)=>{
    console.log("a:=" +Order);
})
.catch(err=>{
    console.log(err);
})
}

const searchOrderID = async (Id)=>{
    
    console.log("finding data")
    await Order.findById(Id)
    .then((Order)=>{
        console.log(Order);
    })
    .catch(err=>{
        console.log(err);
    })
    }
    
const updateOrder = async (id,updateOrderData)=>{
    await Order.findByIdAndUpdate(id,updateOrderData)
    .then(order=>{
        console.log(order)
    })
    .catch(err=>{
        console.log(err);
    })
}

const deleteAllOrder = async (data)=>{
    await Order.remove(data)
    .then(result=>{
        console.log(result);
    })
    .catch(err=>{
        console.log(err);
    })
}

const OrderdeleteById = async (id)=>{
    await Order.findByIdAndDelete(id)
    .then(result=>{
        console.log(result);
    })
    .catch(err=>{
        console.log(err);
    })
}

async function call(){
    // console.log("create order")
    // await createOrder(OrderDatas);   

    console.log("display all Orders");
    await searchOrder({
      });

    // console.log("updating signStatus");
    // await updateOrder(OrderDatas._id,{  SignStatus:true })

    // console.log("finding data by id")
    // await searchOrderID(OrderDatas._id)

    // console.log("delete order by id")
    // await OrderdeleteById(OrderDatas._id)
}

call()
