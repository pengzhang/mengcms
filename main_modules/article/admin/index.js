var express = require('express');
var router = express.Router();
var menu = require('../../menu.js').admin;
var ArticleService = require('../service/article_service')
var Authorize = require('../../../authorize')

router.get('/admin/', function (req, res, next) {
    var userid = req.session.user;
    var username = req.session.username;
    res.render('article/views/admin/index', {
        title: "文章管理",
        menu: menu,
        username: username,
        userid: userid,
        current: 'article_menu',
        success: req.flash('success'),
        error: req.flash('error')
    })
})

module.exports = router