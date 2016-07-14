/**
 * AccessLog 访问日志
 * @type {AccessLog}
 * @author zp
 * @version v1.0
 */
var Sequelize = require("sequelize");
var sequelize = require('../../../database/db')
AccessLog = sequelize.define('access_log', {
    //用户访问的URL
    url: {
        type: Sequelize.STRING,
        field: 'url'
    },
    //用户ID, 如果用户未登录为0
    user_id: {
        type: Sequelize.BIGINT,
        field: 'user_id'
    },
    //用户IP地址 ipv4
    ip: {
        type: Sequelize.STRING,
        field: 'ip',
        validate: {
            // isIPv4: true
        }
    },
    //所使用的浏览器名称
    brower: {
        type: Sequelize.STRING,
        field: 'brower'
    },
    //所使用的操作系统
    system: {
        type: Sequelize.STRING,
        field: 'system'
    },
    //设备信息 电脑, 手机, 平板电脑....
    device: {
        type: Sequelize.STRING,
        field: 'device'
    }
}, {
    freezeTableName: true
})

module.exports = AccessLog