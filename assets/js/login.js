$(function(){
    // 实现注册登录页面切换
    $('#link_reg').on('click',function(){
        $('.login_box').hide()
        $('.reg_box').show()
    })

    $('#link_login').on('click',function(){
        $('.login_box').show()
        $('.reg_box').hide()
    })

    // 为表单项添加验证规则
    var layer=layui.layer
    var form=layui.form
    form.verify({
        pwd: [
            /^[\S]{6,12}$/
            ,'密码必须6到12位，且不能出现空格'
          ],
          repwd:function(value){
            if($('#reg_form [name=password]').val()!==value){
                return '两次密码不一致！'
            }
        },
    })
  
    // 发起注册用户请求
    $('#reg_form').on('submit',function(e){
        e.preventDefault()
        // 发起ajax请求
        $.ajax({
            method:'post',
            url:'/api/reguser',
            data:{
                username:$('#reg_form [name=username]').val(),
                password:$('#reg_form [name=password]').val()
            },
            success:function(res){
                if(res.status!==0){
                    return layer.msg('注册失败！')
                }
                layer.msg('注册成功！')

                // 模拟人的点击行为，回到登录页
                $('#link_login').click()
            }
        })
    })
    
    // 发起登录用户请求
    $('#login_form').on('submit',function(e){
        e.preventDefault()
        $.ajax({
            method:'post',
            url:'/api/login',
            data:$(this).serialize(),
            success:function(res){
                if(res.status!==0){
                    return layer.msg('登录失败！')
                }
                layer.msg('登录成功！')
                localStorage.setItem('token',res.token)
                location.href='/index.html'
            }
        })
    })

})