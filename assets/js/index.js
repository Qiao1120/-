$(function() {
    var layer = layui.layer;
    $('.quit').on('click', function() {
        layer.confirm('确定退出吗?', { icon: 3, title: '提示' }, function(index) {
            localStorage.removeItem('token');
            location.href = 'login.html'
            layer.close(index);
        });


    })
    getInit()

})

function getInit() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        success: function(res) {
            if (res.status !== 0) return layer.msg(res.message)
            getPhoto(res.data)
        }
    })
}

function getPhoto(data) {
    var text = data.username[0].toUpperCase()
    $('.Text_img').html(text)
    $('.welcome').html('欢迎' + '\t' + data.username);
    if (data.user_pic.length == 0) {
        $('.Text_img').show();
        $('.layui-nav-img').hide()
    } else {
        $('.Text_img').hide();
        $('.layui-nav-img').attr('src', data.user_pic).show()
    }
}