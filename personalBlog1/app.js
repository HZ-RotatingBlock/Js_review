let express = require('express');
let multer = require('multer');
let Cookies = require('cookies');
let bodyParser = require('body-parser');
let swig = require('swig');
let mongoose = require('mongoose');
let app = express();
let User = require('./models/User');
//静态文件配置
app.use('/public',express.static(__dirname + '/public'))
// 模板引擎配置
app.engine('html',swig.renderFile);
app.set('views','./views');
app.set('view engine','html');
//模板缓存取消（便于调试）
swig.setDefaults({cache: false});
//bodyParser设置
app.use(bodyParser.urlencoded({extended:true}));
//cookies设置
app.use( (req,res,next) => {
    req.cookies = new Cookies(req,res);
    req.userInfo = {};
    // 解析用户cookies信息
    if(req.cookies.get('userInfo')){
        try{
            req.userInfo = JSON.parse(req.cookies.get('userInfo'));
            //获取当前登录的用户类型，检查是否为管理员
            User.findById(req.userInfo._id).then( (userInfo) => {
                req.userInfo.isAdmin = Boolean(userInfo.isAdmin);
                next();
            })
        }catch(e){}
    }else{
        next();
    }
});

//路由划分
app.use('/admin',require('./routers/admin'));
app.use('/api',require('./routers/api'));
app.use('/',require('./routers/main'));

//监听前台同时连接数据库
mongoose.connect('mongodb://localhost:27020/personalBlog',{useMongoClient:true},(err) => {
    if(err){
        console.log('数据库连接失败，请检查设置！');
    }else{
        console.log('数据库连接成功！');
        app.listen(8081);
    }
})