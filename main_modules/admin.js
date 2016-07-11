/**===========================================
    管理菜单自动扫描注册
    @author: zp
    @date: 20160711
    @version: v0.1
 ===========================================*/

var fs = require("fs");
var path = require("path");

var admin = {
    menu: []
}

fs.readdirSync(__dirname)
    .filter(function(file) {
        return (file.indexOf(".") === -1) && (file !== "index.js");
    })
    .forEach(function(file) {
        var json_path = path.join(__dirname, file) + '/admin.json';
        var exists = fs.existsSync(json_path)
        if (exists) {
            admin.menu.push(JSON.parse(fs.readFileSync(json_path)).menu);
        }
    });
console.log(admin)
module.exports = admin