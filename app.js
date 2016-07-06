var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var RedisStore = require('connect-redis')(session);
var logService = require('./main_modules/logging/service/log_service')
var env = process.env.NODE_ENV || "development";
var redis_conf = require(path.join(__dirname, '.', 'config', 'redis.json'))[env];
var ejs = require('ejs');
var engine = require('ejs-mate');

//主模块
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
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//session存储
app.use(session({
    secret: 'mengcms',
    resave: true,
    saveUninitialized: true,
    store: new RedisStore({
        host: redis_conf.host,
        port: redis_conf.port
    }),
    cookie: {
        // secure: true,
        maxAge: 600000
    }
}))

//权限控制
app.use(function(req, res, next) {
    //记录访问日志
    logService.accessLog(req);

    //session 拦截器
    if (req.session && req.session.user) {
        console.log(req.session.user)
            // next();

    }
    // if (req.session.user) { // 判断用户是否登录
    //     next();
    // } else {
    //     // 解析用户请求的路径
    //     var arr = req.url.split('/');
    //     // 去除 GET 请求路径上携带的参数
    //     for (var i = 0, length = arr.length; i < length; i++) {
    //         arr[i] = arr[i].split('?')[0];
    //     }
    //     // 判断请求路径是否为根、登录、注册、登出，如果是不做拦截
    //     if (arr.length > 1 && arr[1] == '') {
    //         next();
    //     } else if (arr.length > 2 && arr[1] == 'user' && (arr[2] == 'register' || arr[2] == 'login' || arr[2] == 'logout')) {
    //         next();
    //     } else { // 登录拦截
    //         req.session.originalUrl = req.originalUrl ? req.originalUrl : null; // 记录用户原始请求路径
    //         req.flash('error', '请先登录');
    //         res.redirect('/user/login'); // 将用户重定向到登录页面
    //     }
    // }

    next();
});

//自动注册路由
for (var key in main_modules.modules) {
    app.use('/' + key, main_modules.modules[key]);
    app.use('/' + key + '/static', express.static(main_modules.statics[key]))
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