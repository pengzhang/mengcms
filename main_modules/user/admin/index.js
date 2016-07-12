var express = require('express');
var router = express.Router();
var path = require('path');
var menu = require('../../admin.js');
var UserService = require('../service/user_service')
var Authorize = require('../../../authorize')

router.get('/admin/', function(req, res, next) {
    UserService.all(1, 20, function(users) {
        res.render('user/views/admin/index', {
            title: '用户管理',
            admin: menu,
            current: 'user_menu',
            users: users
        })
    })
})

module.exports = router