var express = require('express');
var router = express.Router();
var UserService = new(require('../../service/user/index'))()

/**
 * 用户注册
 * @param  {[type]} req         [description]
 * @param  {[type]} res         [description]
 * @param  {[type]} next){	var user          [description]
 * @return {[type]}             [description]
 */
router.post('/register', function(req, res, next) {
    var user = req.body
    UserService.register(user, function(err, data) {
        if (err) {
            console.error(err)
            res.send('failure')

        } else {
            console.log(JSON.stringify(data))
            res.send('success')
        }
    })
})

router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

module.exports = router