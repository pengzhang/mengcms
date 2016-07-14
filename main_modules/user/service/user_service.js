var User = require('../model/user')
var md5 = require('md5')
var sequelize = require('../../../database/db')

function UserService() {
}

UserService.prototype = {

    /**
     * [register description]
     * @param  {[type]}   user     [description]
     * @param  {Function} callback [description]
     * @return {[type]}            [description]
     * @todo 密码安全型加密
     */
    register: function (user, audit, callback) {
        //密码简单md5加密
        user.password = md5(user.password);
        if (audit) {
            user.status = 'pending';
        } else {
            user.status = 'active';
        }

        User.findOrCreate({
                where: {
                    $or: [
                        {username: user.username},
                        {mobile: user.username},
                        {email: user.username}
                    ]
                },
                defaults: user
            })
            .then(function (result) {
                if (result[1]) {
                    callback(false, result[0]);
                } else {
                    callback(true, '用户已存在');
                }

            }).catch(function (err) {
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
    login: function (username, password, callback) {
        User.findOne({
                where: {
                    $or: [
                        {username: username},
                        {mobile: username},
                        {email: username}
                    ]
                }
            })
            .then(function (user) {
                if (user) {
                    if (user.password == md5(password)) {
                        if (user.status != 'active') {
                            callback(true, '用户未激活或已删除')
                        } else {
                            callback(false, user.toJSON());
                        }
                    } else {
                        callback(true, '密码错误');
                    }
                } else {
                    callback(true, '用户不存在');
                }
            }).catch(function (err) {
            console.log(err)
            callback(true, '查询失败,请重试');
        });
    },
    /**
     * 根据ID获取用户信息
     * @param id
     * @param callback
     */
    getById: function (id, callback) {
        User.findOne({
                where: {id: id},
                attributes: {exclude: ['password']}
            })
            .then(function (user) {
                callback(false, user);
            }).catch(function (err) {
            console.log(err);
            callback(true, '查询失败,请重试')
        });
    },
    /**
     * 分页查询所有用户
     * @param  {[type]}   page     [description]
     * @param  {[type]}   size     [description]
     * @param  {Function} callback [description]
     * @return {[type]}            [description]
     */
    all: function (page, size, callback) {
        User.findAll({
                order: [
                    ['status', 'DESC']
                ],
                offset: (page - 1) * size,
                limit: size
            })
            .then(function (users) {
                callback(false, users.toJSON);
            }).catch(function (err) {
            console.error(err);
            callback(true, '查询失败,请重试');
        });
    },
    allAndTotal: function (page, size, search, sort, order, callback) {

        //组装条件
        var condition = {
            attributes: {exclude: ['password']},
            offset: page * size,
            limit: size * 1
        }
        if (sort & order) {
            condition.order = [
                [sort, order]
            ]
        } else {
            condition.order = [
                ['status', 'asc'],
                ['createdAt', 'desc'],
                ['updatedAt', 'desc']
            ]
        }

        if (search) {
            condition.where = {
                $or: [{
                    username: {
                        $like: '%' + search + '%'
                    }
                }, {
                    mobile: {
                        $like: '%' + search + '%'
                    }
                }, {
                    email: {
                        $like: '%' + search + '%'
                    }
                }, {
                    nickname: {
                        $like: '%' + search + '%'
                    }
                }]
            }
        }

        //查询
        var result = {}
        User.findAndCount(condition).then(function (obj) {
            result.total = obj.count;
            result.rows = obj.rows;
            callback(false, result)
        }).catch(function (err) {
            console.log(err);
            callback(true, '查询计数失败, 请重试')
        })
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
    search: function (keyword, page, size, callback) {
        User.findAll({
                where: {
                    $or: [
                        {username: keyword},
                        {mobile: keyword},
                        {email: keyword}
                    ]
                },
                order: [
                    ['status', 'DESC']
                ],
                offset: (page - 1) * size,
                limit: size
            })
            .then(function (users) {
                callback(false, users.toJSON);
            }).catch(function (err) {
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
    modify: function (id, user, callback) {
        User.update(user, {
                where: {
                    id: id
                }
            })
            .then(function (obj) {
                callback(false, obj);
            }).catch(function (err) {
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
    password: function (id, password, callback) {
        User.findOne({
            where: {id: id}
        }).then(function (user) {
            user.password = password;
            User.update(user, {
                    where: {
                        id: user.id
                    }
                })
                .then(function (users) {
                    callback(false, users.toJSON);
                }).catch(function (err) {
                console.error(err);
                callback(true, '更新密码失败,请重试');
            });

        }).catch(function (err) {
            console.error(err);
            callback(true, '查询密码失败,请重试');
        });
    },
    /**
     * 用户总数
     * @param callback
     */
    total: function (callback) {
        User.count().then(function (total) {
            callback(total);
        }).catch(function (err) {
            console.log(err);
            callback(0);
        })
    },
    today: function (callback) {
        var date = new Date();
        var start = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + " 08:00:00";
        User.count({
            where: {
                createdAt: {
                    $gte: new Date(start)
                }
            }
        }).then(function (total) {
            callback(total);
        }).catch(function (err) {
            console.log(err);
            callback(0);
        })
    },
    todayPer: function (callback) {
        var date = new Date();
        var start = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + " 08:00:00";
        User.count({
            where: {
                createdAt: {
                    $lt: new Date(start)
                }
            }
        }).then(function (total) {
            callback(total);
        }).catch(function (err) {
            console.log(err);
            callback(0);
        })
    },
    yesterday: function (callback) {
        var date = new Date(new Date().getTime() - 1 * 24 * 60 * 60 * 1000);
        var start = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + " 08:00:00";
        User.count({
            where: {
                createdAt: {
                    $gte: new Date(start)
                }
            }
        }).then(function (total) {
            callback(total);
        }).catch(function (err) {
            console.log(err);
            callback(0);
        })
    },
    yesterdayPer: function (callback) {
        var date = new Date(new Date().getTime() - 1 * 24 * 60 * 60 * 1000);
        var start = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + " 08:00:00";
        User.count({
            where: {
                createdAt: {
                    $lte: new Date(start)
                }
            }
        }).then(function (total) {
            callback(total);
        }).catch(function (err) {
            console.log(err);
            callback(0);
        })
    },
    week: function (callback) {
        var date = new Date(new Date().getTime() + 1 * 24 * 60 * 60 * 1000);
        var start = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + " 08:00:00";
        date = new Date(date.getTime() - 7 * 24 * 60 * 60 * 1000);
        var end = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + " 08:00:00";

        User.count({
            where: {
                $and: [
                    {
                        createdAt: {
                            $gte: new Date(end)
                        }
                    },
                    {
                        createdAt: {
                            $lte: new Date(start)
                        }
                    }
                ]
            }
        }).then(function (total) {
            callback(total);
        }).catch(function (err) {
            console.log(err);
            callback(0);
        })
    },
    weekPer: function (callback) {
        var date = new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000);
        var start = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + " 08:00:00";
        User.count({
            where: {
                createdAt: {
                    $lte: new Date(start)
                }
            }
        }).then(function (total) {
            callback(total);
        }).catch(function (err) {
            console.log(err);
            callback(0);
        })
    },
    month: function (callback) {
        var date = new Date(new Date().getTime() + 1 * 24 * 60 * 60 * 1000);
        var start = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + " 08:00:00";
        date = new Date(date.getTime() - 30 * 24 * 60 * 60 * 1000);
        var end = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + " 08:00:00";

        User.count({
            where: {
                $and: [
                    {
                        createdAt: {
                            $gte: new Date(end)
                        }
                    },
                    {
                        createdAt: {
                            $lte: new Date(start)
                        }
                    }
                ]
            }
        }).then(function (total) {
            callback(total);
        }).catch(function (err) {
            console.log(err);
            callback(0);
        })
    },
    monthPer: function (callback) {
        var date = new Date(new Date().getTime() - 30 * 24 * 60 * 60 * 1000);
        var start = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + " 08:00:00";
        User.count({
            where: {
                createdAt: {
                    $lte: new Date(start)
                }
            }
        }).then(function (total) {
            callback(total);
        }).catch(function (err) {
            console.log(err);
            callback(0);
        })
    },
    statChart: function (callback) {
        var stat = {};
        var date = new Date(new Date().getTime() + 1 * 24 * 60 * 60 * 1000);
        var start = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
        date = new Date(date.getTime() - 30 * 24 * 60 * 60 * 1000);
        var end = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();

        sequelize.query("select count(*) as num , DATE_FORMAT(createdAt,\'%Y%m%d\') as date from user where createdAt>=\'" + end + "\' and createdAt<=\'" + start + "\' GROUP BY DATE_FORMAT(createdAt,\'%Y%m%d\')"
            , {type: sequelize.QueryTypes.SELECT})
            .then(function (result) {
                var date = [];
                var count = [];
                result.forEach(function (obj) {
                    date.push(obj.date);
                    count.push(obj.num);
                })
                stat.date = date;
                stat.num = count;
                callback(false, stat);
            })
    }
}

new UserService().todayPer(function (data) {
    console.log(data)
})

module.exports = new UserService()