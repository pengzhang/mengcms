var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    // if (!req.session.user) {
    //     req.session.user = 'test_session';
    //     req.session.save()
    // }
    res.render('index', { title: 'Express' });
});

module.exports = router;