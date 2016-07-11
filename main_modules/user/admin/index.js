var express = require('express');
var router = express.Router();
var path = require('path');
var menu = require('../../admin.js');

router.get('/admin/', function(req, res, next){
	res.render('user/views/admin/index',{title:'用户管理',admin:menu,current:'user_menu'})
})

module.exports = router