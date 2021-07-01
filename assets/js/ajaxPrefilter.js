$.ajaxPrefilter(function(option) {
    option.url = 'http://api-breakingnews-web.itheima.net' + option.url;
    option.headers = {
        Authorization: localStorage.getItem('token') || ''
    }

})