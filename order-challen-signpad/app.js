var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const config = require('./config')
const mongoose = require('mongoose');

const connectionString = "mongodb://localhost:27017/Order_challen_signPad";

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var orderRouter = require('./routes/orders')
var orderDetailRouter = require('./routes/orderDetails');
var authRouter = require('./routes/authentication');
var app = express();
const connection = mongoose.connect(config.Mongo);

connection.then((db)=>{
    console.log("Database connected Sucessfully");
})
.catch((err)=>{
    console.log(err);
})

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/auth',authRouter);
app.use('/api/orders',orderRouter);
app.use('/api/orders/orderDetails',orderDetailRouter);

module.exports = app;
