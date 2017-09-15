
$(function(){
     let $loginBox = $('#loginBox');
     let $registerBox = $('#registerBox');
     let $userInfo = $('#userInfo');
     //切换到注册面板
     $loginBox.find('a').on('click',() => {
         $registerBox.show();
         $loginBox.hide();
     })
     //切换到登录面板
     $registerBox.find('a').on('click',() => {
        $registerBox.hide();
        $loginBox.show();
    })
    //注册
    $registerBox.find('button').on('click',() => {
        //通过ajax提交请求
        $.ajax({
            type: 'post',
            url: '/api/user/register',
            data:{
                "username": $registerBox.find('[name = "username"]').val(),
                "password": $registerBox.find('[name = "password"]').val(),
                "repassword": $registerBox.find('[name = "repassword"]').val()
            },
            dataType: 'json',
            success: (result) => {
                $registerBox.find('.colWarning').html(result.message);
                console.log(result);
                if(!result.code){
                    //注册成功
                    setTimeout( () => {
                        $registerBox.hide();
                        $loginBox.show();
                    },1000);
                }
            }
        });
    });
    //登录
    $loginBox.find('button').on('click',() => {
        //通过ajax提交请求
        $.ajax({
            type: 'post',
            url: '/api/user/login',
            data:{
                "username": $loginBox.find('[name = "username"]').val(),
                "password": $loginBox.find('[name = "password"]').val()
            },
            dataType: 'json',
            success: (result) => {
                $loginBox.find('.colWarning').html(result.message);
                if(!result.code){
                    //登录成功
                    window.location.reload();
                }
            }
        });
    });
    //退出
    $('#logout').on('click',() => {
        $.ajax({
            url: '/api/user/logout',
            success: function(result){
                if(!result.code){
                    window.location.reload();
                }
            }
        })
    })
 });

