let express = require('express')
let router = express.Router()
let Goods = require('../models/Goods')
let Users = require('../models/Users')

// 查询商品列表数据
router.get('/list', (req, res, next) => {
  // 当前页
  let page = parseInt(req.query.page) || 1
  // 总页数
  let pageSize = parseInt(req.query.pageSize) || 8
  // 价格分类
  let priceLevel = req.query.priceLevel
  // 排序方式
  let sort = parseInt(req.query.sort) || 1
  // 数据忽略条数
  let skip = (page - 1) * pageSize
  // 筛选价格下限
  let priceGt = ''
  // 筛选价格上限
  let priceLte = ''
  let params = {}
  // 判断前端用户点击的筛选区间并设置上限下限
  if (priceLevel !== 'all') {
    switch (priceLevel) {
      case '0':
        priceGt = 0
        priceLte = 10000
        break
      case '1':
        priceGt = 0
        priceLte = 100
        break
      case '2':
        priceGt = 100
        priceLte = 500
        break
      case '3':
        priceGt = 500
        priceLte = 1000
        break
      case '4':
        priceGt = 1000
        priceLte = 2000
        break
      case '5':
        priceGt = 2000
        priceLte = 5000
        break
      case '6':
        priceGt = 5000
        priceLte = 10000
        break
    }
    // 供查询的限界条件
    params = {
      salePrice: {
        $gt: priceGt,
        $lte: priceLte
      }
    }
  }
  // 在数据库中匹配价格（salePrice）大于priceGt小于等于priceLte的数据同时忽略skip条数据显示，限制显示条数为pageSize
  let goodsModel = Goods.find(params).skip(skip).limit(pageSize)
  // 根据salePrice的sort（在这里是1，即正序）排序
  goodsModel.sort({'salePrice': sort})
  // 前面操作声明后到这里exec统一执行
  goodsModel.exec((err, doc) => {
    if (err) {
      res.json({
        status: 1,
        msg: err.message
      })
    } else {
      res.json({
        status: 0,
        msg: '',
        result: {
          count: doc.length,
          list: doc
        }
      })
    }
  })
})

// 加入商品购物车
router.post('/addCart', (req, res, next) => {
  // 假定用户id
  let userId = '100000077'
  // 通过获取当前用户点击加入购物车的商品通过post传过来的的商品id值
  let productId = req.body.productId
  // 匹配用户id
  Users.findOne({
    userId: userId
  }).then((userDoc) => {
    if (userDoc) {
      let goodsItem = ''
      userDoc.cartList.forEach((item, index) => {
        // 遍历用户信息中的购物车信息，匹配符合条件的商品并使其数量加 1
        if (item.productId === productId) {
          goodsItem = item
          item.productNum ++
        }
      })
      // 若用户信息中匹配到符合的购物车商品信息则保存数据到数据库并返回信息
      if (goodsItem) {
        userDoc.save().then((saveResult) => {
          if (!saveResult) {
            res.json({
              status: '1',
              msg: '错误'
            })
          } else {
            res.json({
              status: '0',
              msg: '',
              result: 'success'
            })
          }
        })
      } else {
        // 若未匹配到符合的购物车商品信息则在Goods（商品列表）中匹配商品信息并返回对应数据而后插入到用户信息的购物车列表中并保存数据到数据库
        Goods.findOne({
          productId: productId
        }, (err1, doc) => {
          if (err1) {
            res.json({
              status: '1',
              msg: err1.message
            })
          } else {
            if (doc) {
              doc.productNum = 1
              doc.checked = 1
              userDoc.cartList.push(doc)
              userDoc.save().then((saveResult) => {
                if (!saveResult) {
                  res.json({
                    status: '1',
                    msg: '错误'
                  })
                } else {
                  res.json({
                    status: '0',
                    msg: '',
                    result: 'success'
                  })
                }
              })
            }
          }
        })
      }
    }
  }).catch((err) => {
    if (err) {
      res.json({
        status: '1',
        msg: err.message
      })
      console.log('查询失败')
    }
  })
})

module.exports = router
