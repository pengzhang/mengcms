var User = require('../model/user')

function UserService(){

}

UserService.prototype = {
	/**
	 * 用户注册
	 * @param  {[type]}   user     [description]
	 * @param  {Function} callback [description]
	 * @return {[type]}            [description]
	 * @author zp
	 * @todo 密码加密
	 */
    register: function(user, callback) {
        User.create(user).then(function(result) {
            callback(false, result)
        }).catch(function(err) {
            callback(err)
        })
    }
}

module.exports = UserService


