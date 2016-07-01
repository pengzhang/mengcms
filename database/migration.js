var User = require('../main_modules/user/model/user')
var AccessLog = require('../main_modules/logging/model/access_log')

var Sync = function() {
    console.log('=================Sync Models To DataBase======================')
    AccessLog.sync()
        .then(function(result) {
            console.log('AccessLog sync finish.')
        }).catch(function(err) {
            console.log('AccessLog sync error.')
            console.error(err)
        })

    User.sync()
        .then(function(result) {
            console.log('User sync finish.')
        }).catch(function(err) {
            console.log('User sync error.')
            console.error(err)
        })
}

module.exports = Sync