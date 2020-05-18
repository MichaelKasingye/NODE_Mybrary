if(process.env.NODE_ENV !== 'production'){
  const dotenv = require('dotenv').config();
}

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const expressLayout = require('express-ejs-layouts');
const mongoose = require('mongoose');
var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('layout','layouts/layout');

app.use(expressLayout);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);


let mongoLdb = process.env.mongoLdb;
//let MONGOD_MLAB = process.env.mongoLdb;

//mongoose connect
mongoose
.connect(mongoLdb,
  { useUnifiedTopology: true ,
     useNewUrlParser: true })
.then(()=> console.log('Connected to Mongodb.....Michael..'))
.catch(err => console.log('failed Server to connect..'+(err)));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
