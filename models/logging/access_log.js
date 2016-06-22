/************************************************

访问日志
author: 张鹏
date: 2016-06-22

url: 用户访问的URL
user_id: 用户ID, 如果用户未登录为0
ip: 用户IP地址
brower: 所使用的浏览器名称
system: 所使用的操作系统
device: 设备信息 电脑, 手机, 平板电脑....

************************************************/

var AccessLog = sequlize.define('access_log', {
    url: {
        type: Sequlize.STRING,
        field: 'url'
    },
    user_id: {
        type: Sequlize.BIGINT,
        field: 'user_id'
    },
    ip: {
        type: Sequlize.STRING,
        field: 'ip'
    },
    brower: {
        type: Sequlize.STRING,
        field: 'brower'
    },
    system: {
        type: Sequlize.STRING,
        field: 'system'
    },
    device: {
        type: Sequlize.STRING,
        field: 'device'
    }
}, {
    freezeTableName: true
})