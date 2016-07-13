var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var flash = require('connect-flash')
var RedisStore = require('connect-redis')(session);
var logService = require('./main_modules/logging/service/log_service')
var env = process.env.NODE_ENV || "development";
var redis_conf = require(path.join(__dirname, '.', 'config', 'redis.json'))[env];
var ejs = require('ejs');
var engine = require('ejs-mate');

//主模块
var index = require('./main_modules/main');
var main_modules = require('./main_modules/index.js');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'main_modules'));
app.engine('html', engine)
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(flash());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//session存储
app.use(session({
    secret: 'mengcms',
    resave: false,
    saveUninitialized: true,
    store: new RedisStore({
        host: redis_conf.host,
        port: redis_conf.port
    }),
    cookie: {
        // secure: true,
        maxAge: 600000
    }
}));

//记录访问日志
app.use(function(req, res, next) {
    var re=/\.(swf|gif|jpg|bmp|jpeg|png|js|css|ttf)/gi;
    if(!re.exec(req.url))
        logService.accessLog(req);
    next();
});


//自动注册路由
app.use('/', index);
for (var key in main_modules.modules) {
    app.use('/' + key, main_modules.modules[key]);
    app.use('/' + key + '/static', express.static(main_modules.statics[key]));
}


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;