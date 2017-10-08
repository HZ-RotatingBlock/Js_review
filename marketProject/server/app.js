var express = require('express')
var path = require('path')
var logger = require('morgan')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
var nunjucks = require('nunjucks')
var mongoose = require('mongoose')

var app = express()
// nunjucks模板引擎设置
nunjucks.configure(path.join(__dirname, 'views'), {
  autoescape: true,
  express: app
})
app.set('view engine', 'html')

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
// 所有的操作都要经过此步骤
app.use((req, res, next) => {
  if (req.cookies.userId) {
    next()
  } else {
    // 判断原始的url
    console.log(`path:${req.path},originalUrl:${req.originalUrl}`)
    if (req.originalUrl === '/users/login' || req.originalUrl === '/users/logout' || req.path === '/goods/list') {
      next()
    } else {
      res.json({
        status: '10001',
        msg: '当前未登录',
        result: ''
      })
    }
  }
})
// 路由划分
app.use('/', require('./routes/index'))
app.use('/goods', require('./routes/goods'))
app.use('/users', require('./routes/users'))
// 数据库连接
mongoose.connect('mongodb://localhost:27022/db_demo')
// let db = mongoose.connection
// 链接监听
mongoose.connection.on('connected', (err) => {
  if (err) {
    console.log('数据连接失败！请重新连接！')
  } else {
    console.log('数据库连接成功！')
    app.listen(3000)
  }
})
// 链接断开监听
mongoose.connection.on('disconnected', () => {
  console.log('数据库已断开！')
})
module.exports = app
