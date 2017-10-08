// let user = require('./User')
// console.log('userName' + user.userName)
// console.log(`I'm ${user.userName},say ${user.sayHello()}`)
let http = require('http')
let url = require('url')
let util = require('util')
http.createServer((req, res) => {
  res.statusCode = 200
  res.setHeader('content-type', 'text/plain;charset=utf8')
  console.log('url: ' + req.url)
  console.log('parse: ' + url.parse(req.url))
  console.log('inspect: ' + util.inspect(url.parse(req.url)))
  res.end(util.inspect(url.parse(req.url)))
}).listen(3000, '127.0.0.1', () => {
  console.log('服务器运行成功！')
})
