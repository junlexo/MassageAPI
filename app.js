process.env.NODE_ENV='development';

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var appRoutes = require('./routes/app');
var userRoutes = require('./routes/user');
var postRoutes = require('./routes/post');
var adminRoutes = require('./routes/admin/admin');
var employGroup = require('./routes/admin/employee_group');
var treatmentType = require('./routes/admin/treatment_type');
var shopInfoRoutes = require('./routes/shop');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
// app.listen(9999)
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use(function (req, res, next) {
    // res.setHeader('Access-Control-Allow-Origin', '*');
    // res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE');
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT, OPTIONS, PATCH, DELETE");
        res.setHeader("Access-Control-Max-Age", "84000");
        res.setHeader("Access-Control-Allow-Headers", "x-requested-with, content-type");        
    next();
});

app.use('/', appRoutes);
app.use('/admin',adminRoutes);
app.use('/users', userRoutes); 
app.use('/posts', postRoutes);
app.use('/GroupEmployees',employGroup);
app.use('/TreatMentType',treatmentType);
app.use('/', appRoutes);
app.use('/shopinfo',shopInfoRoutes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.json({
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.json({
        message: err.message,
        error: {}
    });
});


module.exports = app;
