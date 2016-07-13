var express = require('express');
var router = express.Router();
var path = require('path');
var menu = require('../../admin.js');
var UserService = require('../service/user_service')
var Authorize = require('../../../authorize')

router.get('/admin/', Authorize.user, function(req, res, next) {
    var username = req.session.username;
    var user = req.session.user;
    res.render('user/views/admin/index', {
        title: '用户管理',
        admin: menu,
        current: 'user_menu',
        user: user,
        username: username
    })
})

/**
 * 获取用户列表
 *
 * limit, offset, search, sort, order
 *
 */
router.get('/admin/data', Authorize.user, function(req, res, next){
    var limit = req.query.limit? req.query.limit: 10;
    var offset  =req.query.offset? req.query.offset: 0;
    var search = req.query.search;
    var sort = req.query.sort;
    var order = req.query.order;
    UserService.allAndTotal(offset, limit, search, sort, order, function(err, users) {
        res.send(users)
    })
})



module.exports = router