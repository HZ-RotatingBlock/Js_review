let http = require("http");
let fs = require("fs");
let url = require("url");
let querystring = require("querystring");
let server = http.createServer(function(req,res){
    let urlStr = url.parse(req.url);
    let htmlDir = __dirname;
    switch(urlStr.pathname){
        case "/":
            //首页
            sendData(htmlDir + "/html/index.html",req,res)
            break;
        case "/user":
            //个人中心
            sendData(htmlDir + "/html/user.html",req,res);
            break;
        case "/login":
            //个人中心
            sendData(htmlDir + "/html/login.html",req,res);
            break;
        case "/login/check":
            console.log(req.method);
            //个人中心
            console.log(querystring.parse(urlStr.query));
            if(req.method.toUpperCase() == "POST"){
                req.on("data",function(chunk){
                    str += chunk;
                });
                let str = "";
                req.on("end",function(){
                    console.log(str);
                    console.log(querystring.parse(str));
                })
            }
            break;
        default: 
            //处理其他情况
            break;
    }
}).listen(8080,"localhost");
function sendData(file,req,res){
    fs.readFile(file,function(err,data){
        if(err){
            res.writeHead(404,{
                "content-type":"text/html;charset=utf-8"
            });
            res.end("<h1>页面被吃掉了~</h1>")
        }else{
            res.writeHead(200,{
                "content-type":"text/html;charset=utf-8"
            });
            res.end(data);
        }
    })
}
server.on("error",function(err){
    console.log(err);
})
server.on("listening",function(){
    console.log("listening...");
})