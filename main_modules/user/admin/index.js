var express = require('express');
var router = express.Router();

router.get('/admin/', function(req, res, next){
	res.send('user admin')
})

module.exports = router