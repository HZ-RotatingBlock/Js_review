//多页面数据爬取(使用eventproxy控制并发)
let express = require('express');
let url = require('url');
let superagent = require('superagent');
let cheerio = require('cheerio');
let eventproxy = require('eventproxy');
let app = express();

let cnodeUrl = 'https://cnodejs.org/?tab=dev';

app.get('/', (req,sres) => {
    sres.setHeader('content-type','text/html;charset=utf8');
    superagent.get(cnodeUrl).end( (err,res) => {
        if(err){
            return console.error(err);
        }
        let topicUrls = [];
        let $ = cheerio.load(res.text);
        $('#topic_list .topic_title').each( (index,value) => {
            let $value = $(value);
            let href = url.resolve(cnodeUrl,$value.attr('href'));
            topicUrls.push(href);
        });
        // console.log(topicUrls);
        let ep = new eventproxy();
        ep.after('topic_html',topicUrls.length,(topics) => {
            topics = topics.map( (topicArray) => {
                let topicUrl = topicArray[0];
                let topichtml = topicArray[1];
                let $ = cheerio.load(topichtml);
                return ({
                    title: $('.topic_full_title').text().trim(),
                    href: topicUrl,
                    comment1: $('.reply_content').eq(0).text().trim(),
                    author: $('.reply_author').eq(0).text().trim(),
                    score: $('.up-count').eq(0).text().trim() 
                });         
            });
            console.log('操作结果:')
            console.log(topics);
            sres.send(topics);        
            sres.end();
        });
        topicUrls.forEach( (topicUrl) => {
            superagent.get(topicUrl).end( (err,res) => {
                console.log('爬取' + topicUrl + '内容成功！');
                ep.emit('topic_html',[topicUrl,res.text]);
            });
        });

    });
});
let server = app.listen(8081, (req,res) => {
    let host = server.address().address;
    let port = server.address().port;
    console.log('服务器启动成功！访问地址为： http://127.0.0.1',host,port);  
});