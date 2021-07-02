$(function() {
    var form = layui.form;
    var layer = layui.layer;
    form.verify({
        username: function(value, item) { //value：表单的值、item：表单的DOM对象
            if (!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)) {
                return '用户名不能有特殊字符';
            }
            if (/(^\_)|(\__)|(\_+$)/.test(value)) {
                return '用户名首尾不能出现下划线\'_\'';
            }
            if (/^\d+\d+\d$/.test(value)) {
                return '用户名不能全为数字';
            }

            //如果不想自动弹出默认提示框，可以直接返回 true，这时你可以通过其他任意方式提示（v2.5.7 新增）
            if (value.length > 6) {
                return '用户名不能超过6位';
            }
        }
    })
    getData();
    $('#data_form').submit(function(e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) return layer.msg(res.message)
                layer.msg(res.message)
                getData()
            }
        })
    })

    function getData() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success: function(res) {
                if (res.status !== 0) return layer.msg(res.message)
                    // layer.msg(res.message)
                form.val('data_form', res.data);
                window.parent.getInit()
            }
        })
    }

})