let express = require('express');
let router = express.Router();
let User = require('../models/User');
let Content = require('../models/Content');
//统一返回格式
let responseData;
//初始化
router.use( (req,res,next) => {
    responseData = {
        code: 0,
        message: ''
    }
    next();
});
//用户注册
router.post('/user/register', (req,res,next) => {
    let username = req.body.username;
    let password = req.body.password;
    let repassword = req.body.repassword;
    //用户是否为空
    if(username == ''){
        responseData.code = 1;
        responseData.message = '用户名不能为空';
        res.json(responseData);
        return;
    }
    // 密码是否为空
    if(password == ''){
        responseData.code = 2;
        responseData.message = '密码不能为空';
        res.json(responseData);
        return;
    }
    // 两次输入的密码不一致
    if(password != repassword){
        responseData.code = 3;
        responseData.message = '两次输入的密码不一致';
        res.json(responseData);
        return;
    }
    //用户名是否已经被注册(这里返回的是Promise对象)
    User.findOne({
        username: username
    }).then( (userInfo) => {
        if(userInfo){
            console.log(userInfo);
            //表示数据库中有该记录
            responseData.code = 4;
            responseData.message = '用户名已经被注册了';
            res.json(responseData);
            return;
        }
        //保存用户注册的信息到数据库中
        let user = new User({
            username: username,
            password: password
        });
        return user.save();
    }).then( (newUserInfo) => {
        responseData.message = '注册成功';
        res.json(responseData);
    }); 
});
//用户登录
router.use('/user/login', (req,res,next) => {
    let username = req.body.username;
    let password = req.body.password;
    if(username == '' || password == ''){
        responseData.code = 1;
        responseData.message = '用户名或密码不能为空';
        res.json(responseData);
        return;
    }
    User.findOne({
        username: username,
        password: password
    }).then( (userInfo) => {
        if(!userInfo){
            responseData.code = 2;
            responseData.message = '用户名或密码错误';
            res.json(responseData);
            return;
        }
        //正确则登录
        responseData.message = '登录成功';
        responseData.userInfo = {
            _id: userInfo._id,
            username: userInfo.username
        }
        req.cookies.set('userInfo', JSON.stringify({
            _id: userInfo._id,
            //响应前台的中文数据需要使用encodeURI进行编码后才可以传输并正确使用
            username: encodeURI(userInfo.username)
        }));
        res.json(responseData);
        return;
    });
});
// 退出
router.get('/user/logout', (req,res,next) => {
    req.cookies.set('userInfo',null);
    res.json(responseData);
});
//获取文章的所有评论
router.get('/comment',(req,res) => {
    let contentId = req.query.contentid || '';
    Content.findOne({
        _id: contentId
    }).then( (content) => {
        responseData.data = content.comments;
        res.json(responseData);
    });
});
// 评论提交
router.post('/comment/post', (req,res) => {
    // 内容的id
    let contentId = req.body.contentid || '';
    let postData = {
        username: req.userInfo.username,
        postTime: new Date(),
        content: req.body.content
    }
    // 查询当前这篇内容的信息
    Content.findOne({
        _id: contentId
    }).then( (content) => {
        content.comments.push(postData);
        return content.save();
    }).then( (newContent) => {
        responseData.message = '评论成功';
        responseData.data = newContent;
        res.json(responseData);
    })
});

module.exports = router;