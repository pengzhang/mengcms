var express = require('express');
var router = express.Router();
var UserService = require('../service/user_service')()

router.get('/', function(req, res, next) {
    res.render('user/views/index',{title:'user'});
});


/**
 * 用户注册
 * @param  {[type]} req         [description]
 * @param  {[type]} res         [description]
 * @param  {[type]} next){  var user          [description]
 * @return {[type]}             [description]
 */
router.post('/register', function(req, res, next) {
    var user = req.body
    UserService.register(user, function(err, data) {
        if (err) {
            console.error(err)
            res.send('failure')

        } else {
            console.log(JSON.stringify(data))
            res.send('success')
        }
    })
})

/**
 * 用户登录
 * @param  {[type]} req     [description]
 * @param  {[type]} res     [description]
 * @param  {[type]} next){                 var type [description]
 * @return {[type]}         [description]
 */
router.get('/login', function(req, res, next) {
    var type = req.query.type;
    if (type == 'api') {
        res.send()
    } else {
        res.send('login')
    }
})

router.post('/login', function(req, res, next) {
    var type = req.query.type;
    if (type == 'api') {
        res.send()
    } else {
        res.render()
    }
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