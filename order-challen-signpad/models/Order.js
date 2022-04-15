const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const OrderSChema = new Schema({
    OrderId:{
        type:String,
        required:true
    },
    OrderDate:{
        type:Date,
        required:true
    },
    OrderTotal:{
        type:Number,
        required:true
    },
    ReceiverName:{
        type:String,
        required:true
    },
    ReceiverEmail:{
        type:String,
        required:true
    },
    ReceiverAddress:{
        type:String,
        // required:true
    },
    ReceiverGSTIN:{
        type:String
    },
    CompanyId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"user"
    },
    GeneratedLink:{
        type:String
    },
    SignStatus:{
        type:Boolean,
        default:false
    },
    SignData:{
        type:Buffer
    },
    SignDataContentType:{
        type:String
    }
},{
    timestamp:true
})


const Order = mongoose.model("Order",OrderSChema)

module.exports = Order;