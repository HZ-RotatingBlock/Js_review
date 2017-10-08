let http = require('http')
let url = require('url')
// let util = require('util')
let fs = require('fs')
http.createServer((req, res) => {
  // res.statusCode = 200
  // res.setHeader('content-type', 'text/plain;charset=utf8')
  let pathname = url.parse(req.url).pathname
  console.log(pathname)
  fs.readFile(pathname.substring(1), (err, data) => {
    if (err) {
      res.writeHead(404, {
        'Contont-Type': 'text/html;charset=utf8'
      })
    } else {
      res.writeHead(200, {
        'Contont-Type': 'text/html;charset=utf8'
      })
      res.write(data.toString())
    }
    res.end()
  })
}).listen(3000, '127.0.0.1', () => {
  console.log('服务器运行成功！')
})
