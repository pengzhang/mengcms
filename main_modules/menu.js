/**===========================================
    管理菜单自动扫描注册
    @author: zp
    @date: 20160711
    @version: v0.1
 ===========================================*/

var fs = require("fs");
var path = require("path");

var menu = {
    admin: [],
    user: [],
    web:[]
}

fs.readdirSync(__dirname)
    .filter(function(file) {
        return (file.indexOf(".") === -1) && (file !== "index.js");
    })
    .forEach(function(file) {
        var json_path = path.join(__dirname, file) + '/menu.json';
        var exists = fs.existsSync(json_path)
        if (exists) {
            menu.admin.push(JSON.parse(fs.readFileSync(json_path)).admin);
            menu.web.push(JSON.parse(fs.readFileSync(json_path)).user);
            menu.user.push(JSON.parse(fs.readFileSync(json_path)).web);
        }
    });
module.exports = menu