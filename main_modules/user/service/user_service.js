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
        User.findOrCreate({
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
        User.findOne({
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
                    callback(true, '用户不存在');
                }
            }).catch(function(err) {
                console.log(err)
                callback(true, '查询失败,请重试');
            });
    },
    /**
     * 分页查询所有用户
     * @param  {[type]}   page     [description]
     * @param  {[type]}   size     [description]
     * @param  {Function} callback [description]
     * @return {[type]}            [description]
     */
    all: function(page, size, callback) {
        User.findAll({
                order: [
                    ['status', 'DESC']
                ],
                offset: (page - 1) * size,
                limit: size
            })
            .then(function(users) {
                callback(false, users.toJSON);
            }).catch(function(err) {
                console.error(err);
                callback(true, '查询失败,请重试');
            });
    },
    /**
     * 搜索用户
     * 支持用户名,手机号,邮箱
     * @param  {[type]}   keyword  [description]
     * @param  {[type]}   page     [description]
     * @param  {[type]}   size     [description]
     * @param  {Function} callback [description]
     * @return {[type]}            [description]
     */
    search: function(keyword, page, size, callback) {
        User.findAll({
                where: {
                    $or: [
                        { username: keyword },
                        { mobile: keyword },
                        { email: keyword }
                    ]
                },
                order: [
                    ['status', 'DESC']
                ],
                offset: (page - 1) * size,
                limit: size
            })
            .then(function(users) {
                callback(false, users.toJSON);
            }).catch(function(err) {
                console.error(err);
                callback(true, '查询失败,请重试');
            });
    },
    /**
     * 修改用户信息
     * 不包括密码
     * @param  {[type]}   user     [description]
     * @param  {Function} callback [description]
     * @return {[type]}            [description]
     */
    modify: function(user, callback) {
        //更新信息, 不更新密码
        delete user.password;
        User
            .update({
                user,
                where: {
                    id: user.id
                }
            })
            .then(function(users) {
                callback(false, users.toJSON);
            }).catch(function(err) {
                console.error(err);
                callback(true, '更新失败,请重试');
            });
    },
    /**
     * 修改密码
     * @param  {[type]}   id       [description]
     * @param  {[type]}   password [description]
     * @param  {Function} callback [description]
     * @return {[type]}            [description]
     */
    password: function(id, password, callback) {
        User.findOne({
            where: { id: id }
        }).then(function(user) {
            user.password = password;
            User.update({
                    user,
                    where: {
                        id: user.id
                    }
                })
                .then(function(users) {
                    callback(false, users.toJSON);
                }).catch(function(err) {
                    console.error(err);
                    callback(true, '更新密码失败,请重试');
                });

        }).catch(function(err) {
            console.error(err);
            callback(true, '查询密码失败,请重试');
        });
    }
}

module.exports = new UserService()