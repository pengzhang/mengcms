var express = require('express');
var router = express.Router();
var UserService = require('../service/user_service')
var Authorize = require('../../../authorize')

router.get('/', Authorize.user, function(req, res, next) {
    res.render('user/views/user',{title: '用户中心'})
});


/**
 * 用户注册
 * @param  {[type]} req         [description]
 * @param  {[type]} res         [description]
 * @return {[type]}             [description]
 */
router.get('/register', function(req, res, next) {
    res.render('user/views/register', {
        title: '用户注册',
        success: req.flash('success'),
        error: req.flash('error')
    });
})

router.post('/register', function(req, res, next) {
    UserService.register(req.body, function(err, result) {
        if (err) {
            req.flash('error', result);
            res.redirect('/user/register');
        } else {
            req.flash('success', '注册成功');
            res.redirect('/user/login');
        }
    });
})

/**
 * 用户登录
 * @param  {[type]} req     [description]
 * @param  {[type]} res     [description]
 * @return {[type]}         [description]
 */
router.get('/login', function(req, res, next) {
    res.render('user/views/login', {
        title: '用户登录',
        username: req.flash('username'),
        success: req.flash('success'),
        error: req.flash('error')
    });
})

router.post('/login', function(req, res, next) {
    UserService.login(req.body.username, req.body.password, function(err, result) {
        if (err) {
            req.flash('username', req.body.username);
            req.flash('error', result);
            res.redirect('/user/login');
        } else {
            req.session.user = result.id;
            req.session.username = result.username;
            req.session.save();
            res.redirect('/user/');
        }

    });
})

/**
 * 获取用户信息
 * @param  {[type]} req       [description]
 * @param  {[type]} res       [description]
 * @param  {[type]} next){} [description]
 * @return {[type]}           [description]
 */
router.post('/get/:id', function(req, res, next) {
    var type = req.query.type;
    var userId = req.params.id;

    if (type && type == 'api') {
        res.send()
    } else {
        res.render()
    }
})

/**
 * 获取全部用户信息
 * @param  {[type]} req       [description]
 * @param  {[type]} res       [description]
 * @param  {[type]} next){} [description]
 * @return {[type]}           [description]
 */
router.post('/get/all/:page/:size', function(req, res, next) {
    var type = req.query.type;
    var page = req.params.page;
    var size = req.params.size;


    if (type && type == 'api') {
        res.send()
    } else {
        res.render()
    }
})

/**
 * 修改用户信息
 * @param  {[type]} req       [description]
 * @param  {[type]} res       [description]
 * @param  {[type]} next){} [description]
 * @return {[type]}           [description]
 */
router.post('/modify/info/:id', function(req, res, next) {
    var type = req.query.type;
    var userId = req.params.id;

    if (type && type == 'api') {
        res.send()
    } else {
        res.render()
    }
})

/**
 * 发送验证给用户
 * 
 * @param  {[type]} req       [description]
 * @param  {[type]} res       [description]
 * @param  {[type]} next){} [description]
 * @return {[type]}           [description]
 */
router.post('/send/verify/code', function(req, res, next) {
    var mode = req.query.mode;

    if (mode == 'email') {
        res.send()
    } else if (mode == 'mobile') {
        res.send()
    } else {
        res.send()
    }
})

/**
 * 激活手机或者邮箱
 * @param  {[type]} req       [description]
 * @param  {[type]} res       [description]
 * @param  {[type]} next){} [description]
 * @return {[type]}           [description]
 */
router.post('/validate/info/', function(req, res, next) {
    var mode = req.query.mode;
    var code = req.query.code;

    if (mode == 'email') {
        res.send()
    } else if (mode == 'mobile') {
        res.send()
    } else {
        res.send()
    }

})


/**
 * 忘记密码
 * @param  {[type]} req       [description]
 * @param  {[type]} res       [description]
 * @param  {[type]} next){} [description]
 * @return {[type]}           [description]
 */
router.get('/forget/password', function(req, res, next) {
    var type = req.query.type;
    if (type && type == 'api') {
        res.send()
    } else {
        res.render()
    }
})

/**
 * 找回密码
 * 第一步发送验证码
 * @param  {[type]} req       [description]
 * @param  {[type]} res       [description]
 * @param  {[type]} next){} [description]
 * @return {[type]}           [description]
 */
router.post('/find/1/password', function(req, res, next) {
    var mode = req.query.mode;

    /**
     * @todo 页面通过ajax判断跳转
     */
    if (mode == 'email') {
        res.send()
    } else if (mode == 'mobile') {
        res.send()
    } else {
        res.send()
    }
})

/**
 * 找回密码
 * 第二步验证
 * @param  {[type]} req       [description]
 * @param  {[type]} res       [description]
 * @param  {[type]} next){} [description]
 * @return {[type]}           [description]
 */
router.post('/find/2/password', function(req, res, next) {
    var mode = req.query.mode;

    /**
     * @todo 页面通过ajax判断跳转
     */
    if (mode == 'email') {
        res.send()
    } else if (mode == 'mobile') {
        res.send()
    } else {
        res.send()
    }
})

/**
 * 修改密码
 * @param  {[type]} req       [description]
 * @param  {[type]} res       [description]
 * @param  {[type]} next){} [description]
 * @return {[type]}           [description]
 */
router.post('/modify/password', function(req, res, next) {
    var type = req.query.type;
    /**
     * @todo 对比密码
     * @todo 保存密码
     */
    if (type == 'api') {
        res.send()
    } else {
        res.render()
    }
})


module.exports = router