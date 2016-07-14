var express = require('express');
var router = express.Router();
var path = require('path');
var menu = require('../../admin.js');
var UserService = require('../service/user_service')
var Authorize = require('../../../authorize')

/**
 * 管理用户列表
 */
router.get('/admin/', Authorize.user, function (req, res, next) {
    var username = req.session.username;
    var userid = req.session.user;
    res.render('user/views/admin/index', {
        title: '用户管理',
        admin: menu,
        current: 'user_menu',
        userid: userid,
        username: username,
        success: req.flash('success'),
        error: req.flash('error')
    })
})

/**
 * 获取用户列表
 *
 * limit, offset, search, sort, order
 */
router.get('/admin/data', Authorize.user, function (req, res, next) {
    var limit = req.query.limit ? req.query.limit : 10;
    var offset = req.query.offset ? req.query.offset : 0;
    var search = req.query.search;
    var sort = req.query.sort;
    var order = req.query.order;
    UserService.allAndTotal(offset, limit, search, sort, order, function (err, users) {
        res.send(users);
    })
})

/**
 * 添加用户
 */
router.get('/admin/add', Authorize.user, function (req, res, next) {
    var username = req.session.username;
    var userid = req.session.user;
    res.render('user/views/admin/add', {
        title: '添加用户',
        admin: menu,
        current: 'user_menu',
        userid: userid,
        username: username
    });
})

router.post('/admin/add', Authorize.user, function (req, res, next) {
    UserService.register(req.body, false, function (err, result) {
        if (err) {
            req.flash('error', '添加用户失败');
            res.redirect('/user/admin/add');
        } else {
            req.flash('success', '添加用户成功');
            res.redirect('/user/admin');
        }

    })
})

/**
 * 修改用户
 */

router.get('/admin/modify/:id', Authorize.user, function (req, res, next) {
    var username = req.session.username;
    var userid = req.session.user;
    UserService.getById(req.params.id, function (err, user) {
        if (err) {
            res.redirect('/user/admin');
        } else {
            res.render('user/views/admin/modify', {
                title: '修改用户',
                admin: menu,
                current: 'user_menu',
                userid: userid,
                username: username,
                user: user
            });
        }
    })
})

router.post('/admin/modify/:id', Authorize.user, function (req, res, next) {
    UserService.modify(req.params.id, req.body, function (err, result) {
        if (err) {
            req.flash('error', '修改用户信息失败');
            res.redirect('/user/admin/modify/'+req.params.id);
        } else {
            req.flash('success', '修改用户信息成功');
            res.redirect('/user/admin');
        }
    })
})


/**
 * 移除用户
 */
router.get('/admin/remove/:id', Authorize.user, function(req, res, next){
    UserService.modify(req.params.id, {'status':'deleted'}, function(err, result){
        if(err){
            res.status(500).send('删除失败')
        }else{
            res.send('删除成功');
        }
    })
})


module.exports = router