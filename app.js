var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var RedisStore = require('connect-redis')(session);


var ejs = require('ejs');
var engine = require('ejs-mate');
var useragent = require('useragent');
var requestIp = require('request-ip');
var AccessLog = require('./models/logging/access_log.js')


var routes = require('./routes/index');
var users = require('./routes/user/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('html', engine)
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: 'mengcms',
    resave: true,
    saveUninitialized: true,
    store: new RedisStore({
        host: "127.0.0.1",
        port: 6379
    }),
    cookie: {
        // secure: true,
        maxAge: 600000
    }
}))


app.use(function(req, res, next) {
    var agent = useragent.parse(req.headers['user-agent']);
    var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    var clientIp = requestIp.getClientIp(req);
    console.log(clientIp)
    AccessLog.create({
        brower: agent.toString(),
        system: agent.os.toString(),
        device: agent.device.toString(),
        url: fullUrl,
        ip: clientIp
    }).then(function(created) {
        console.log(JSON.stringify(created))
    }).catch(function(err) {
        console.error(err)
    })

    //session 拦截器
    if (req.session) {
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

app.use('/', routes);
app.use('/users', users);

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