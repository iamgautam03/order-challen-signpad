const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const OrderDetailSchema = new Schema({
    OrderId:{
        type:Schema.Types.ObjectId,
        required:true
    },
    ItemName:{
        type:String,
        required:true
    },
    ItemQuantity:{
        type:Number,
        required:true
    },
    ItemPrice:{
        type:Number,
        required:true
    }
},{
    timestamp:true
})


const OrderDetail = mongoose.model("OrderDetail",OrderDetailSchema)

module.exports = OrderDetail;