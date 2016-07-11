var index = require('./web/index')
var admin = require('./admin/index')

index.use(admin)
module.exports = index