//搭建一个http的服务器用于处理用户发送的http请求
//需要node提供一个http模块
//加载一个http模块
let http = require("http");
//通过http模块下的createServer创建并返回一个web服务器对象
let server = http.createServer(function(req,res){
    console.log("有客户请求了");
    res.writeHeader(200,"hello nodeJS",{
        "content-type":"text/html;charset=utf-8"
    })
    res.write("<h1>hello</h1>");
    res.end();
});

server.on("error",function(err){
    console.log(err);
})
server.on("listening",function(){
    console.log("listening...");
})
// server.on("request",function(req,res){
    
// })
server.listen(8080,"localhost");
// console.log(server.address());