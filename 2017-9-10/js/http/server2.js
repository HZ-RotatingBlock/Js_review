let http = require("http");
let url = require("url");
let server = http.createServer(function(req,res){
    let urlStr = url.parse(req.url);
    switch(urlStr.pathname){
        case "/":
            res.writeHead(200,{
                "content-type":"text/html;charset=utf-8"
            })
            res.end("<h1>这是首页</h1>")
            break;
        case "/user":
            res.writeHead(200,{
                "content-type":"text/html;charset=utf-8"
            })
            res.end("<h1>个人中心</h1>")
            break;
        default: 
            res.writeHead(404,{
                "content-type":"text/html;charset=utf-8"
            })
            res.end("<h1>页面被吃掉了~</h1>")
            break;
    }
}).listen(8080,"localhost");
server.on("error",function(err){
    console.log(err);
})
server.on("listening",function(){
    console.log("listening...");
})