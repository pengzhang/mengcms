//在调用方法中添加
//var API_URL_CREATE = '';
//var API_URL_UPDATE = '';
//var API_URL_DELETE = '';
//var API_URL_GET = '';

var API_URL_UPDATE = '/user/admin/modify?id=';
var API_URL_DELETE = '/user/admin/remove?id=';
var API_URL_GET = '/user/admin/data';

var $table = $('#table').bootstrapTable({url:API_URL_GET}),
    $modal = $('#modal').modal({show: false}),
    $alert = $('.alert').hide();

$(function () {
    // create event
    $('.create').click(function () {
        showModal($(this).text());
    });

    $modal.find('.submit').click(function () {
        var row = {};

        $modal.find('input[name]').each(function () {
            row[$(this).attr('name')] = $(this).val();
        });
        $modal.find('select[name]').each(function () {
            row[$(this).attr('name')] = $(this).val();
        });
        $.ajax({
            url: $modal.data('id') ? API_URL_UPDATE + ($modal.data('id')) : API_URL_CREATE,
            type: 'post',
            contentType: 'application/json',
            data: JSON.stringify(row),
            success: function () {
                $modal.modal('hide');
                $table.bootstrapTable('refresh');
                showAlert(($modal.data('id') ? '修改' : '创建') + ' 成功', 'success');
            },
            error: function () {
                $modal.modal('hide');
                showAlert(($modal.data('id') ? '修改' : '创建') + ' 失败!', 'danger');
            }
        });
    });
});

function statusFormatter(value) {
    if(value == 'active'){
        return '<span class="label label-success">正常</span>';
    }else if(value == 'pending'){
        return '<span class="label label-info">等待审核</span>';
    }else if(value == 'deleted'){
        return '<span class="label label-danger">已删除</span>';
    }else{
        return '<span class="label label-warning">未知</span>';
    }

}
function queryParams(params) {
    $.extend(params);
    return params;
}

function actionFormatter(value) {
    return [
        '<a class="update" style="color: #333;margin-right: 5px;" href="javascript:" title="修改"><i class="glyphicon glyphicon-edit"></i></a>',
        '<a class="remove" style="color: red;margin-left: 5px;" href="javascript:" title="删除"><i class="glyphicon glyphicon-remove-circle"></i></a>',
    ].join('');
}

// update and delete events
window.actionEvents = {
    'click .update': function (e, value, row) {
        showModal($(this).attr('title'), row);
    },
    'click .remove': function (e, value, row) {
        if (confirm('真的要删除吗?')) {
            $.ajax({
                url: API_URL_DELETE + row.id,
                type: 'get',
                success: function () {
                    $table.bootstrapTable('refresh');
                    showAlert('删除成功!', 'success');
                },
                error: function () {
                    showAlert('删除失败!', 'danger');
                }
            })
        }
    }
};

function showModal(title, row) {
    row = row || {
        name: '',
        stargazers_count: 0,
        forks_count: 0,
        description: ''
    }; // default row value

    $modal.data('id', row.id);
    $modal.find('.modal-title').text(title);
    for (var name in row) {
        $modal.find('input[name="' + name + '"]').val(row[name]);
        $modal.find('select[name="' + name + '"]').val(row[name]);
    }
    $modal.modal('show');
}

function showAlert(title, type) {
    $alert.attr('class', 'alert alert-' + type || 'success')
          .html('<i class="glyphicon glyphicon-check"></i> ' + title).show();
    setTimeout(function () {
        $alert.hide();
    }, 3000);
}


function sub10Formatter(value) {
    if(value){
        return value.substring(0,10);
    }
    return '';
}
function sub20Formatter(value) {
    if(value){
        return value.substring(0,20);
    }
    return '';
}
function sub80Formatter(value) {
    if(value){
        if(value.length>50){
            return value.substring(0,80)+'...[未显示'+(value.length-80)+'字]';
        }
        return value;
    }
    return '';
}