var useragent = require('useragent');
var requestIp = require('request-ip');
var AccessLog = require('../model/access_log.js')


var LogService = function() {

}

LogService.prototype = {
    accessLog: function(req) {
        var agent = useragent.parse(req.headers['user-agent']);
        var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
        var clientIp = requestIp.getClientIp(req);
        AccessLog.create({
            brower: agent.toString(),
            system: agent.os.toString(),
            device: agent.device.toString(),
            url: fullUrl,
            ip: clientIp
        }).then(function(created) {
            console.log('[access log] ' + JSON.stringify(created))
        }).catch(function(err) {
            console.error(err)
        })
    }
}


var logService = new LogService()

module.exports = logService
