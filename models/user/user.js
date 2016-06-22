/*****************************************

 用户中心
 author: 张鹏
 date: 2016-06-22

 username: 用户名
 nickname: 昵称
 password: 密码
 email: 电子邮件
 wechat_openid: 微信公众号的openid, 用于微信的绑定
 address: 用户地址
 gender: 性别
 avatar: 头像

*****************************************/


var User = sequelize.define('user', {
    username: {
        type: Sequelize.STRING,
        field: 'username'
    },
    nickname: {
        type: Sequelize.STRING,
        field: 'nickname'
    },
    password: {
        type: Sequelize.STRING,
        field: 'password'
    },
    email: {
        type: Sequelize.STRING,
        field: 'email'
    },
    mobile: {
        type: Sequelize.STRING,
        field: 'mobile'
    },
    wechat_openid: {
        type: Sequelize.STRING,
        field: 'wechat_openid'
    },
    address: {
        type: Sequelize.STRING,
        field: 'address'
    },
    gender: {
        type: Sequelize.STRING,
        field: 'gender'
    },
    avatar: {
        type: Sequelize.STRING,
        field: 'avatar'
    }

}, {
    freezeTableName: true
})