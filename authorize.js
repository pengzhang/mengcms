/**===========================================
    权限控制
    @author: zp
    @date: 20160706
    @version: v0.1
 ===========================================*/

var Authorize = {}

//session 拦截器
Authorize.user = function(req, res, next) {
    if (req.session && req.session.user) {
        next();
    } else {
        req.session.originalUrl = req.originalUrl ? req.originalUrl : null; // 记录用户原始请求路径
        req.flash('error', '请先登录');
        res.redirect('/user/login'); // 将用户重定向到登录页面
    }
}

//管理员 session 拦截器
Authorize.admin = function(req, res, next) {
    if (req.session && req.session.user) {
        if (req.session.admin) {
            next();
        } else {
            req.session.originalUrl = req.originalUrl ? req.originalUrl : null; // 记录用户原始请求路径
            req.flash('error', '请用管理员登录');
            res.redirect('/user/login'); // 将用户重定向到登录页面
        }

    } else {
        req.session.originalUrl = req.originalUrl ? req.originalUrl : null; // 记录用户原始请求路径
        req.flash('error', '请先登录');
        res.redirect('/user/login'); // 将用户重定向到登录页面
    }
}

module.exports = Authorize;