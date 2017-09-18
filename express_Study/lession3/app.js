//爬虫扒取https://cnodejs.org/?tab=dev的贴子标题和链接
let express = require('express');
let superagent = require('superagent');
let cheerio = require('cheerio');
let app = express();
app.get('/', (req,res,next) => {
    superagent.get('https://cnodejs.org/?tab=dev').end( (err,sres) => {
        if(err){
            return next(err);
        }
        let $ = cheerio.load(sres.text);
        let items = [];
        $('#topic_list .topic_title').each( (index,value) => {
            let $value = $(value);
            items.push({
                title: $value.attr('title'),
                href: $value.attr('href')
            });
        });
        res.send(items);
    });  
});
let server = app.listen(8081, (req,res) => {
    let host = server.address().address;
    let port = server.address().port;
    console.log('服务器启动成功！访问地址为： http://%s%s',host,port);
});