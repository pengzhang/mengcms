var express = require('express');
var router = express.Router();
var auth = require('../authorize')

router.get('/', function(req, res, next){
	res.send('Hello MengCMS');
});


module.exports = router