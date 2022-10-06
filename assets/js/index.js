$(function(){
    var layer=layui.layer

    // 获取用户信息
    initUserInfo()

    $('#btnlogout').on('click',function(){
        layer.confirm('确认退出?', {icon: 3, title:'提示'}, function(index){            
            localStorage.removeItem('token')
            location.href='/login.html'
            layer.close(index)
        });
    })

    // 定义获取用户信息的函数
    function initUserInfo(){
        $.ajax({
            method:'get',
            url:'/my/userinfo',
            success:function(res){
                if(res.status!==0){
                    return layer.msg('获取用户信息失败！')
                }
                layer.msg('获取用户信息成功！')
                renderAvatar(res.data)
            }

        })
    }

    // 渲染图片头像和文字头像
    function renderAvatar(res){
        console.log(res)
        // 定义name作为欢迎词
        var name=res.nickname||res.username
        if(name.length>5){
            name=name.substring(0,8)+'*'
            console.log(name)
        }

        $('#welcome').html('欢迎&nbsp;&nbsp;'+name)
        if(res.user_pic===null){
            var first=name[0].toUpperCase()
            $('.text_avatar').html(first).show()
            $('.layui-nav-img').hide()
        }
        else{
            $('.layui-nav-img').attr('src',res.user_pic)
            $('.text_avatar').hide()
        }
    }

})