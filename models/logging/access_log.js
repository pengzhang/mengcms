/**
 * AccessLog 访问日志
 * @type {AccessLog}
 * @author zp
 * @version v1.0
 */
var AccessLog = sequlize.define('access_log', {
    //用户访问的URL
    url: {
        type: Sequlize.STRING,
        field: 'url'
    },
    //用户ID, 如果用户未登录为0
    user_id: {
        type: Sequlize.BIGINT,
        field: 'user_id'
    },
    //用户IP地址 ipv4
    ip: {
        type: Sequlize.STRING(20),
        field: 'ip',
        validate: {
            isIPv4: true
        }
    },
    //所使用的浏览器名称
    brower: {
        type: Sequlize.STRING(30),
        field: 'brower'
    },
    //所使用的操作系统
    system: {
        type: Sequlize.STRING(50),
        field: 'system'
    },
    //设备信息 电脑, 手机, 平板电脑....
    device: {
        type: Sequlize.STRING(50),
        field: 'device'
    }
}, {
    freezeTableName: true
})