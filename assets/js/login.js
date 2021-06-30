$(function() {
    $('.register .btn').on('click', function() {
        $('.register').hide()
        $('.enroll').show()
    })
    $('.enroll .btn').on('click', function() {
        $('.register').show()
        $('.enroll').hide()
    })

    var form = layui.form;
    var layer = layui.layer;
    form.verify({
        un: function(value) {
            if (!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)) {
                return '用户名不能有特殊字符';
            }
            if (/(^\_)|(\__)|(\_+$)/.test(value)) {
                return '用户名首尾不能出现下划线\'_\'';
            }
            if (/^\d+\d+\d$/.test(value)) {
                return '用户名不能全为数字';
            }
        },
        pwd: [
            /^[\S]{6,16}$/, '密码必须6到12位，且不能出现空格'
        ],
        repwd: function(value) {
            if (value !== $('.enroll [name=password]').val()) {
                return '两次密码不一致！'
            }
        }
    })

    $('#f2').submit(function(e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: 'http://api-breakingnews-web.itheima.net/api/reguser',
            data: {
                username: $('.enroll [name=username]').val(),
                password: $('.enroll [name=password]').val(),
            },
            success: function(res) {
                if (res.status !== 0) return layer.msg(res.message);
                layer.msg('注册成功，请登录！');
                $('.enroll .btn').click()
            }
        })
    })

    $('#f1').on('submit', function(e) {
        e.preventDefault();
        $.ajax({
            method: "POST",
            url: 'http://api-breakingnews-web.itheima.net/api/login',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) return layer.msg(res.message)
                layer.msg(res.message);
                location.href = 'index.html'
            }
        })
    })
})