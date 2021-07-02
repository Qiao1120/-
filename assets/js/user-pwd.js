$(function() {
    var form = layui.form;
    var layer = layui.layer;
    form.verify({
        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        new: function(v) {
            if ($('#pwd_form [name=password]').val() == v) {
                return '新密码不能和原密码一样'
            }
        },
        re: function(v) {
            if ($('#pwd_form [name=newpassword]').val() !== v) {
                return '两次密码不一致'
            }
        }
    });

    $('#pwd_form').on('submit', function(e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/my/updatepwd',
            data: {
                oldPwd: $('#pwd_form [name=password]').val(),
                newPwd: $('#pwd_form [name=newpassword]').val()
            },
            success: function(res) {
                if (res.status !== 0) return layer.msg(res.message)
                layer.msg(res.message)
            }
        })
    })


})