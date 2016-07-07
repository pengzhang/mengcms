function alert_message(msg) {
    $('#alert').removeClass('alert-success hide');
    $('#alert').addClass('alert-warning');
    $('#alert').html(msg);
}

$(function() {
    $('#register').click(function() {

        var username = $('#username').val();
        var password = $('#password').val();
        var repeat = $('#repeat_password').val();

        if (!username || username.length < 6) {
            alert_message('请填写6个字符以上的用户名');
            return false;
        }
        if (!password || password.length < 6) {
            alert_message('请填写大于6位的密码');
            return false;
        }

        if (password != repeat) {
            alert_message('两次密码不一致');
            return false;
        }
    })
})

$(function() {
    $('#login').click(function() {
        var username = $('#username').val();
        var password = $('#password').val();
        if (!username) {
            alert_message('请填写用户名');
            return false;
        }
        if (!password || password.length < 6) {
            alert_message('请填写大于6位的密码');
            return false;
        }
    })
})