$(function(){
    var layer=layui.layer
    var form=layui.form

    // 定义表单校验规则
    form.verify({
        nickname:function(value){
            if(value.length>6){
                return '昵称的长度为1-6个字符！'
            }
        }
    })
    initUserInfo()


    function initUserInfo(){
        $.ajax({
            method:'get',
            url:'/my/userinfo',
            success:function(res){
                if(res.status!==0){
                    return layer.msg('获取用户信息失败！')
                }
                form.val('userInfo',res.data)
            }
        })
    }


    // 为表单绑定提交事件
    $('.layui-form').on('submit',function(e){
        e.preventDefault()  
        // 发起更新用户信息请求
            $.ajax({
                method:'post',
                url:'/my/userinfo',
                data:$(this).serialize(),
                success:function(res){
                    if(res.status!==0){
                        return layer.msg('更新用户信息失败！')
                    }
                    layer.msg('更新用户信息成功！')
                    // 信息更新完成之后，因为目前是在子页面，需要重新渲染父页面的文字、头像
                    parent.location.reload(); 
                    
                }
            })
    })
     


})