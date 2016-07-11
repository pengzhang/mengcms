var express = require('express');
var router = express.Router();
var auth = require('../../../authorize')

router.get('/', function(req, res, next){
	res.render('main/views/index',{title: '首页'})
});


module.exports = router