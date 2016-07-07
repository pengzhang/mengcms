var User = require('../model/user')
var md5 = require('md5')

function UserService() {}

UserService.prototype = {

    /**
     * [register description]
     * @param  {[type]}   user     [description]
     * @param  {Function} callback [description]
     * @return {[type]}            [description]
     * @todo 密码安全型加密
     */
    register: function(user, callback) {
        //密码简单md5加密
        user.password = md5(user.password);
        User
            .findOrCreate({
                where: {
                    $or: [
                        { username: user.username },
                        { mobile: user.username },
                        { email: user.username }
                    ]
                },
                defaults: user
            })
            .then(function(result) {
                if (result[1]) {
                    callback(false, result[0]);
                } else {
                    callback(true, '用户已存在');
                }

            }).catch(function(err) {
                console.log(err);
                callback(true, '注册失败,请重试');
            });
    },
    /**
     * [login description]
     * @param  {[type]}   username [description]
     * @param  {[type]}   password [description]
     * @param  {Function} callback [description]
     * @return {[type]}            [description]
     */
    login: function(username, password, callback) {
        User
            .findOne({
                where: {
                    $or: [
                        { username: username },
                        { mobile: username },
                        { email: username }
                    ]
                }
            })
            .then(function(user) {
                if (user) {
                    if (user.password == md5(password)) {
                        callback(false, user.toJSON());
                    } else {
                        callback(true, '密码错误');
                    }
                } else {
                    callback(true, '用户不存在')
                }
            }).catch(function(err) {
                console.log(err)
                callback(true, '查询失败,请重试');
            });
    }
}

module.exports = new UserService()