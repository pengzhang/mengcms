/**===========================================
    模块自动扫描注册
    @author: zp
    @date: 20160706
    @version: v0.1
 ===========================================*/

var fs = require("fs");
var path = require("path");

var main_modules = {
    modules: {},
    statics: {},
    privilege: {}
}

fs.readdirSync(__dirname)
    .filter(function(file) {
        return (file.indexOf(".") === -1) && (file !== "index.js");
    })
    .forEach(function(file) {
        main_modules.modules[file] = require(path.join(__dirname, file))
        main_modules.statics[file] = path.join(__dirname, file + '/public')
    });

console.log('================Scan Module Info List======================')
console.log(main_modules)


module.exports = main_modules