let eventproxy = require('eventproxy');
let express = require('express');
let superagent = require('superagent');
//cheerio模块相当于nodejs中使用的JQuery
let cheerio = require('cheerio');
// url 模块是 Node.js 标准库里面的
// http://nodejs.org/api/url.html
let url = require('url');
let app = express();

let cnodeUrl = 'https://cnodejs.org/?tab=dev';
app.get('/', (req,sres) => {
  sres.setHeader('content-type','text/html;charset=utf8');
  superagent.get(cnodeUrl)
  .end(function (err, res) {
    if (err) {
      return console.error(err);
    }
    let topicUrls = [];
    let $ = cheerio.load(res.text);
    // 获取首页所有的链接
    $('#topic_list .topic_title').each(function (idx, element) {
      let $element = $(element);
      // $element.attr('href') 本来的样子是 /topic/542acd7d5d28233425538b04
      // 我们用 url.resolve 来自动推断出完整 url，变成
      // https://cnodejs.org/topic/542acd7d5d28233425538b04 的形式
      // 具体请看 http://nodejs.org/api/url.html#url_url_resolve_from_to 的示例
      //拼接url
      let href = url.resolve(cnodeUrl, $element.attr('href'));
      topicUrls.push(href);
    });
    // //打印帖子链接
    // console.log(topicUrls);
      // 得到 topicUrls 之后
    // 得到一个 eventproxy 的实例
    let ep = new eventproxy();
    // 命令 ep 重复监听 topicUrls.length 次（在这里也就是 40 次） `topic_html` 事件再行动
    ep.after('topic_html', topicUrls.length, function (topics) {
        // topics 是个数组，包含了 40 次 ep.emit('topic_html', pair) 中的那 40 个 pair
        // 传递过来的topics使用map方法依次执行相应函数
        topics = topics.map(function (topicPair) {
            // 链接地址
            let topicUrl = topicPair[0];
            // 对应地址的网页html用以给cheerio操作DOM
            let topicHtml = topicPair[1];
            let $ = cheerio.load(topicHtml);
            //依次返回覆盖数组的元素
            return ({
            title: $('.topic_full_title').text().trim(),
            href: topicUrl,
            comment1: $('.reply_content').eq(0).text().trim(),
            author: $('.reply_author').eq(0).text().trim(),
            score: $('.up-count').eq(0).text().trim()
            });
        });
        console.log('操作结果:');
        console.log(topics);
        sres.send(topics);
        sres.end();
    });
    //遍历topicUrls数组中的每一个链接地址并使用superagent依次请求
    topicUrls.forEach(function (topicUrl) {
    superagent.get(topicUrl)
        .end(function (err, res) {
        //请求成功依次打印成功信息
        console.log('爬取 ' + topicUrl + '的内容成功');
        //触发'topic_html'事件并传递相应的数据数组即topicUrls中的而每一个链接地址topicUrl以及对应的网页html内容res.text
        ep.emit('topic_html', [topicUrl, res.text]);
        });
    });
  });
  
});
let server = app.listen(8081, (req,res) => {
  let host = server.address().address;
  let port = server.address().port;
  console.log('服务器启动成功！访问地址问： http://%s%s',host,port);
});

