/* 应用（启动）入口文件 */
//加载express模块
let express = require("express");
//加载模板
let swig = require("swig");
//加载数据库模块
let mongoose = require("mongoose");
//body-parse,用以处理post提交过来的数据
let bodyParse = require("body-parser");
//加载cookie模块
let Cookies = require("cookies");
//创建app应用 => 等同于NodeJS Http.createServer();
let app = express();

let User = require("./models/User");

//设置静态文件托管
//当用户访问的url以 /public开始,那么直接返回对应 __dirname + "/public" 下的文件
app.use("/public",express.static(__dirname + "/public"))

//静态文件处理部分
//配置应用模板 
//定义当前应用所使用的模板引擎
//第一个参数表示模板引擎的名称同时也是模板文件的后缀,第二个参数表示用于解析树模板内容的方法
app.engine("html",swig.renderFile);

//设置模板文件存放的目录，第一个参数必须是views,第二个参数是目录
app.set("views","./views");

//注册所使用的模板引擎,第一个参数必须是view engine,第二个参数和app.engine这个方法中定义的模板引擎的名称(第一个参数)是一致的
app.set("view engine","html");

//在开发过程中需要取消模板缓存以方便查看效果(默认是打开的)
swig.setDefaults({cache:false});

//bodyParse设置
app.use(bodyParse.urlencoded({extended:true}) );

//设置cookies(不论什么时候用户访问网站，都会走这个中间件)
app.use( (req,res,next) => {
    req.cookies = new Cookies(req,res);
    //解析登录用户的cookies信息
    req.userInfo = {};
    if(req.cookies.get('userInfo')){
        try{
            req.userInfo = JSON.parse(req.cookies.get('userInfo'));
            //获取登录用户的用户类型，是否是管理员
            User.findById(req.userInfo._id).then( (userInfo) => {
                req.userInfo.isAdmin = Boolean(userInfo.isAdmin);
                next();
            });
        }catch(e){
            next();
        };

    }else{
        next();
    }
    
})
//根据不同功能划分模块
app.use("/admin",require("./routers/admin"));
app.use("/api",require("./routers/api"));
app.use("/",require("./routers/main"));

//连接数据库
// mongoose.Promise = global.Promise;  
mongoose.connect("mongodb://localhost:27018/personalBlogConnection",{useMongoClient:true},function(err){
    if(err){
        console.log("数据库连接失败");
    }else{
        console.log("数据库连接成功");
        //监听http请求
        app.listen(8081);
    }
});
