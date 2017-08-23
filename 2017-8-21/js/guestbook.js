window.onload = function(){
    var headerImg = ["header_1.png","header_2.png","header_3.png","header_4.png","header_5.png","header_6.png","header_7.png","header_7.png","header_8.png","header_9.png","header_10.png"];
    var userStatus = document.getElementById("user_status");
    var userStatusName = document.getElementById("user_status_name");
    var register = document.getElementById("register");
    var login = document.getElementById("login");
    var userHeader = document.getElementById("user_header");
    var returnContent = document.getElementById("return");
    var returnContentLi = returnContent.getElementsByTagName("li");
    var iPage = 1;
    //初始化
    updateUserStatus();
    updateGuestList();
    //更新/初始化留言列表
    /*
    post
        guestbook/index.php
            m: index
            a: send
            page: 获取留言页码
            n: 每页显示的条数
        返回:
            {
                code: 返回的信息代码 0 = 没有错误 1 = 有错误
                data: 返回成功留言的详细信息
                    {
                        cid: 留言ID
                        content: 留言内容
                        uid: 留言人的id
                        username: 留言人的名称
                        dataline: 留言的事件（秒）
                        support: 当天这条留言的顶的数量
                        oppose: 当前这条留言踩的数量
                    }
                message: 返回信息 具体的返回信息
            }
    */  
    var showmore = document.getElementById("showmore");
    var floorNum = 1;
    function updateGuestList(){
        ajax({
            method:"GET",
            url:"guestbook/index.php",
            data:{
                "m":"index",
                "a":"getList",
                "page":iPage,
                "n":2,
            },
            success:function(Data){
                let data = JSON.parse(Data);              
                if(!data.code){
                    let arrList = data.data.list;                 
                    if(data){
                        for(let i =  0;i < arrList.length;i++){
                            var returnTime = new Date(parseInt(arrList[i].dateline * 1000));
                            var newLi = document.createElement("li");
                            newLi.innerHTML = `<img class="return_header" src="images/${headerImg[Math.floor(Math.random() * 8)]}" alt="头像"/>
                                        <span class="return_username">${arrList[i].username}</span>
                                        <span class="return_time">${returnTime.toLocaleString()}</span>
                                        <span class="return_content">${arrList[i].content}</span>
                                        <span class="good">顶(${arrList[i].support})</span>
                                        <span class="bad">踩(${arrList[i].oppose})</span>`;
                            floorNum++;
                            if(returnContent.children[0]){
                                returnContent.insertBefore(newLi,returnContent.children[0]);
                            }else{
                                returnContent.appendChild(newLi);
                            }
                            
                        }                  
                        showmore.innerHTML = "显示更多";
                    }else{
                        if(iPage == 1){
                            showmore.innerHTML = "现在还没有留言,快来抢沙发吧~";
                        }                      
                        showmore.style.display = "none";
                    }
                }else{
                    showmore.innerHTML = "内容加载完了~";
                }
            }
        });
    }
    //更新用户状态
    function updateUserStatus(){
        var uid = getCookie("uid");
        var username = decodeURI(getCookie("username"));
        if(uid){
            register.style.display = "none";
            login.style.display = "none";
            userStatus.style.display = "block";
            userStatusName.innerHTML = username;
            userHeader.src = `images/${headerImg[Math.floor(Math.random() * 8)]}`;
        }else{
            userStatus.style.display = "none";
        }    
    }
    //验证用户名
    /*
    get
        guestbook/index.php
            m: index
            a:verifyUserName
            username: 要验证的用户名
        返回:
            {
                code: 返回的信息代码 0 = 没有错误 1 = 有错误
                message: 返回信息 具体的返回信息
            }
    */
    var oUsername1 = document.getElementById("username1");
    var oVerifyUserNameMsg = document.getElementById("verifyUserNameMsg");
    oUsername1.onblur = function(){
        ajax({
            method:"GET",
            url:"guestbook/index.php",
            data:{
                "m":"index",
                "a":"verifyUserName",
                "username":this.value,
            },
            success:function(Data){
                let data = JSON.parse(Data);
                oVerifyUserNameMsg.innerHTML = data.message;
                if(data.code){
                    oVerifyUserNameMsg.style.color = "#c03";
                }else{
                    oVerifyUserNameMsg.style.color = "#0073bc";
                }
            }
        });
    }
    //用户注册
    /*
    get
        guestbook/index.php
            m: index
            a: reg
            username: 要注册的用户名
            password: 注册的密码
        返回:
            {
                code: 返回的信息代码 0 = 没有错误 1 = 有错误
                message: 返回信息 具体的返回信息
            }
    */
    var btnReg = document.getElementById("btnReg");
    var oPassword1 = document.getElementById("password1");
    btnReg.onclick = function(){
        ajax({
            method:"POST",
            url:"guestbook/index.php",
            data:{
                "m":"index",
                "a":"reg",
                "username":encodeURI(oUsername1.value),
                "password":oPassword1.value,
            },
            success:function(Data){
                let data = JSON.parse(Data);
                if(data.code == 0){              
                    alert("恭喜您！注册成功！您可以在下方进行登录！");
                    oUsername1.value = "";
                    oPassword1.value = "";
                    verifyUserNameMsg.innerHTML = "";
                }else{
                    alert(oVerifyUserNameMsg.innerHTML);
                }
            }
        });
    }  
    //用户登录
    /*
    get
        guestbook/index.php
            m: index
            a: login
            username: 要登录的用户名
            password: 登录的密码
        返回:
            {
                code: 返回的信息代码 0 = 没有错误 1 = 有错误
                message: 返回信息 具体的返回信息
            }
    */
    var oUsername2 = document.getElementById("username2");
    var oPassword2 = document.getElementById("password2");
    var btnLogin = document.getElementById("btnLogin");
    btnLogin.onclick = function(){
        ajax({
            method:"POST",
            url:"guestbook/index.php",
            data:{
                "m":"index",
                "a":"login",
                "username":encodeURI(username2.value),
                "password":password2.value,
            },
            success:function(Data){
                let data = JSON.parse(Data);
                if(data.code == 0){
                    updateUserStatus();
                    alert("登录成功！");
                }else{
                    alert(data.message);
                }
            }
        });
    }
    //用户退出
    /*
    get
        guestbook/index.php
            m: index
            a: logout
        返回:
            {
                code: 返回的信息代码 0 = 没有错误 1 = 有错误
                message: 返回信息 具体的返回信息
            }
    */
    var exitLogin = document.getElementById("exitlogin");
    exitLogin.onclick = function(){
        ajax({
            method:"GET",
            url:"guestbook/index.php",
            data:{
                "m":"index",
                "a":"logout",
            },
            success:function(Data){
                let data = JSON.parse(Data);
                if(data.code == 0){
                    register.style.display = "block";
                    login.style.display = "block";
                    userStatus.style.display = "none";
                    alert("退出成功！");
                }else{
                    alert("服务器繁忙，请稍后再试~");
                }
                
            }
        });
    }
    //留言
    /*
    post
        guestbook/index.php
            m: index
            a: send
            content: 留言内容
        返回:
            {
                code: 返回的信息代码 0 = 没有错误 1 = 有错误
                data: 返回成功留言的详细信息
                    {
                        cid: 留言ID
                        content: 留言内容
                        uid: 留言人的id
                        username: 留言人的名称
                        dataline: 留言的事件（秒）
                        support: 当天这条留言的顶的数量
                        oppose: 当前这条留言踩的数量
                    }
                message: 返回信息 具体的返回信息
            }
    */
    var answerInput = document.getElementById("answer_input");
    var answerBtn = document.getElementById("answer_btn");    
    answerBtn.onclick = function(){
        ajax({
            method:"POST",
            url:"guestbook/index.php",
            data:{
                "m":"index",
                "a":"send",
                "content":encodeURI(answerInput.value),
            },
            success:function(Data){
                let data = JSON.parse(Data);              
                if(!data.code){
                    alert(data.message);
                    let returnContentLiLength = returnContentLi.length;
                    var newLi = document.createElement("li");
                    newLi.innerHTML = `<img class="return_header" src="${user_header.getAttribute("src")}" alt="头像"/>
                                    <span class="return_username">${data.data.username}</span>
                                    <span class="return_floor">${returnContentLiLength + 1}楼</span>
                                    <span class="return_content">${data.data.content}</span>
                                    <span class="good">顶(${data.data.support})</span>
                                    <span class="bad">踩(${data.data.oppose})</span>`;
                    returnContent.appendChild(newLi);
                }else{
                    alert("服务器繁忙，请稍后再试~");
                }
            }
        });
    }
    //点击显示更更多内容
    showmore.onclick = function(){
        iPage++;
        updateGuestList();
    }


}


//cookie获取
function getCookie(key){
    let arr1 = document.cookie.split("; ");
    for(let i = 0;i < arr1.length;i++){
        var arr2 = arr1[i].split("=");
        if(arr2[0] == key){
            return arr2[1];
        }
    }
    return;
}

//ajax封装
function ajax(obj){
    obj = obj || {};
    obj.method = obj.method.toUpperCase() || "POST";
    obj.url = obj.url || "";
    obj.async = obj.async || true;
    obj.data = obj.data || null;
    obj.success = obj.success || function(){};
    obj.error = obj.error || function(){};
    var request = null;
    var arr = [];
    if(obj.data != null){
        for(let key in obj.data){
            arr.push(key + "=" + obj.data[key]);
        }
    }
    var postData = arr.join("&");
    if(XMLHttpRequest){
        request = new XMLHttpRequest();
    }else{
        request = new ActiveXObject("Microsoft.XMLHTTP");
    }
    if(obj.method === "POST"){
        request.open(obj.method,obj.url,obj.async);
        request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
        request.send(postData);
    }else if(obj.method === "GET"){
        request.open(obj.method,obj.url + "?" + postData,obj.async);
        request.send(null);
    }
    request.onreadystatechange = function(){
        if (request.readyState == 4){
            if (request.status>=200&&request.status<300 || request.status==304){
                    if (obj.success){
                        obj.success(request.responseText);
                    }
                }else{
                    if (obj.error){
                        obj.error(request.status);
                    }
                }
            }
        }
    }