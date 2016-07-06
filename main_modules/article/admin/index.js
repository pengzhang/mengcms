var express = require('express');
var router = express.Router();

router.get('/admin/', function(req, res, next){
	res.send('article admin')
})

module.exports = router