/**
 * 用户中心
 * @type {User}
 * @author zp
 * @version v1.0
 */
var Sequelize = require("sequelize");
var sequelize = require('../../../database/db')
User = sequelize.define('user', {
    username: {
        type: Sequelize.STRING(50),
        field: 'username',
        validate: {
            // allowNull: false
        }
    },
    nickname: {
        type: Sequelize.STRING(20),
        field: 'nickname'
    },
    password: {
        type: Sequelize.STRING(50),
        field: 'password',
        validate: {
            // notNull: true
        }
    },
    email: {
        type: Sequelize.STRING(50),
        field: 'email'
    },
    mobile: {
        type: Sequelize.STRING(20),
        field: 'mobile',
        validate: {
            // isNumeric: true
        }
    },
    //wechat_openid: 微信公众号的openid, 用于微信的绑定
    wechat_openid: {
        type: Sequelize.STRING(30),
        field: 'wechat_openid'
    },
    address: {
        type: Sequelize.STRING,
        field: 'address'
    },
    //性别
    gender: {
        type: Sequelize.BOOLEAN,
        field: 'gender'
    },
    //头像
    avatar: {
        type: Sequelize.STRING,
        field: 'avatar'
    }

}, {
    freezeTableName: true
})

module.exports = User