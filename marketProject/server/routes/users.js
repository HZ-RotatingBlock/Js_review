let express = require('express')
let router = express.Router()
require('./../util/util')
let Users = require('./../models/Users')
// 主页路由
router.get('/', (req, res, next) => {
  res.send('respond with a resource')
})

// 登录路由
router.post('/login', (req, res, next) => {
  let params = {
    userName: req.body.userName,
    userPwd: req.body.userPwd
  }
  Users.findOne(params).then((userDoc) => {
    if (!userDoc) {
      res.json({
        status: '1',
        msg: '发生了一个错误~ 请检查账户密码是否正确~'
      })
    } else {
      // 登录数据保存到cookie
      res.cookie('userId', userDoc.userId, {
        // cookie中的用户ID存放到根目录
        path: '/',
        // 存储周期
        maxAge: 1000 * 60 * 60
      })
      res.cookie('userName', userDoc.userName, {
        // cookie中的用户名存放到根目录
        path: '/',
        // 存储周期
        maxAge: 1000 * 60 * 60
      })
      // 数据存储到session
      // req.session.user = userDoc
      res.json({
        status: '0',
        msg: '登录成功',
        result: {
          userName: userDoc.userName
        }
      })
    }
  })
})
// 登出路由
router.post('/logout', (req, res, next) => {
  res.cookie('userId', '', {
    path: '/',
    maxAge: -1
  })
  res.json({
    status: '0',
    msg: '登出成功',
    result: ''
  })
})
// 登录检查
router.get('/checkLogin', (req, res, next) => {
  if (req.cookies.userId) {
    res.json({
      status: '0',
      msg: '',
      result: req.cookies.userName || ''
    })
  } else {
    res.json({
      status: '1',
      msg: '您还未登录',
      result: ''
    })
  }
})

router.get('/getCartCount', (req, res, next) => {
  if (req.cookies && req.cookies.userId) {
    let userId = req.cookies.userId
    Users.findOne({userId: userId}).then((doc) => {
      let cartList = doc.cartList
      let cartCount = 0
      cartList.map((item) => {
        cartCount += parseInt(item.productNum)
      })
      res.json({
        status: '0',
        msg: '',
        result: cartCount
      })
    }).catch((err) => {
      if (err) {
        res.json({
          status: '1',
          msg: err.message,
          result: ''
        })
      }
    })
  }
})
// 查询当前用户的购物车数据
router.get('/cartList', (req, res, next) => {
  let userId = req.cookies.userId
  Users.findOne({userId: userId}).then((doc) => {
    if (!doc) {
      res.json({
        status: '1',
        msg: '用户购物车数据获取失败',
        result: ''
      })
      return
    }
    res.json({
      status: '0',
      msg: '',
      result: doc.cartList
    })
  })
})
// 购物车删除
router.post('/cartDel', (req, res, next) => {
  let userId = req.cookies.userId
  let productId = req.body.productId
  Users.update({
    userId: userId
  }, {
    $pull: {
      'cartList': {
        'productId': productId
      }
    }
  }).then((result) => {
    res.json({
      status: '0',
      message: '',
      result: '删除成功'
    })
  }).catch((err) => {
    if (err) {
      res.json({
        status: '1',
        message: '删除失败',
        result: ''
      })
    }
  })
})
// 修改商品数量
router.post('/cartEdit', (req, res, next) => {
  let userId = req.cookies.userId
  let productId = req.body.productId
  let productNum = req.body.productNum
  let checked = req.body.checked

  Users.update({
    userId: userId,
    'cartList.productId': productId
  }, {
    // 更新子文档，$是占位符
    'cartList.$.productNum': productNum,
    'cartList.$.checked': checked
  }, (err, doc) => {
    if (err) {
      res.json({
        status: '1',
        message: err.message,
        result: ''
      })
    } else {
      res.json({
        status: '0',
        message: '更新成功',
        result: 'suc'
      })
    }
  })
})

router.post('/editCheckAll', (req, res, next) => {
  let userId = req.cookies.userId
  let checkAll = req.body.checkAll ? '1' : '0'
  // 批量更新
  Users.findOne({userId: userId}, (err, user) => {
    if (err) {
      res.json({
        status: '1',
        message: err.message,
        result: ''
      })
    } else {
      if (user) {
        user.cartList.forEach((item) => {
          item.checked = checkAll
        })
        user.save().then((result) => {
          res.json({
            status: '0',
            message: '',
            result: 'suc'
          })
        }).catch((err1) => {
          res.json({
            status: '1',
            message: err1.message,
            result: ''
          })
        })
      } else {
        res.json({
          status: '0',
          message: '',
          result: 'suc'
        })
      }
    }
  })
})
// 用户默认收获地址查询
router.get('/addressList', (req, res, next) => {
  let userId = req.cookies.userId
  Users.findOne({userId: userId}).then((doc) => {
    if (doc) {
      res.json({
        status: '0',
        msg: '',
        result: doc.addressList
      })
    }
  }).catch((err) => {
    res.json({
      status: '1',
      msg: err.message,
      result: ''
    })
  })
})

// 设置默认收货地址接口
router.post('/setDefault', (req, res, next) => {
  let userId = req.cookies.userId
  let addressId = req.body.addressId
  if (!addressId) {
    return
  }
  Users.findOne({userId: userId}).then((doc) => {
    if (doc) {
      let addressList = doc.addressList
      addressList.forEach((item) => {
        if (item.addressId === addressId) {
          item.isDefault = true
        } else {
          item.isDefault = false
        }
      })
      doc.save().then((doc1) => {
        res.json({
          status: '0',
          msg: '',
          result: ''
        })
      }).catch((err) => {
        res.json({
          status: '1',
          msg: err.message,
          result: ''
        })
      })
    }
  }).catch(() => {
    res.json({
      status: '1003',
      msg: 'addressId不存在',
      result: ''
    })
  })
})

// 删除地址接口
router.post('/delAddress', (req, res, next) => {
  let userId = req.cookies.userId
  let addressId = req.body.addressId
  Users.update({
    userId: userId
  }, {
    $pull: {
      addressList: {
        addressId: addressId
      }
    }
  }).then((doc) => {
    if (doc) {
      res.json({
        status: '0',
        msg: '',
        result: ''
      })
    }
  }).catch((err) => {
    res.json({
      status: '1',
      msg: err.message,
      result: ''
    })
  })
})

router.post('/payMent', (req, res, next) => {
  let userId = req.cookies.userId
  let orderTotal = req.body.orderTotal
  let addressId = req.body.addressId
  Users.findOne({userId: userId}).then((doc) => {
    if (doc) {
      let address = ''
      let goodsList = []
      // 获取当前用户的地址信息
      doc.addressList.forEach((item) => {
        if (addressId === item.addressId) {
          address = item
        }
      })
      // 获取用户购物车的购买商品
      doc.cartList.filter((item) => {
        if (item.checked === '1') {
          goodsList.push(item)
        }
      })
      // 系统平台码
      let platform = '622'
      // 生成随机数
      let r1 = Math.floor(Math.random() * 10)
      let r2 = Math.floor(Math.random() * 10)

      let sysDate = new Date().Format('yyyyMMddhhmmss')
      let createDate = new Date().Format('yyyy-MM-dd hh:mm:ss')

      let orderId = platform + r1 + sysDate + r2
      // 创建订单
      let order = {
        orderId: orderId,
        orderTotal: orderTotal,
        addressInfo: address,
        goodsList: goodsList,
        orderStatus: '1',
        createDate: createDate
      }
      doc.orderList.push(order)
      doc.save().then((doc1) => {
        res.json({
          status: '0',
          msg: '',
          result: {
            orderId: order.orderId,
            orderTotal: order.orderTotal
          }
        })
      }).catch((err) => {
        if (err) {
          res.json({
            status: '1',
            msg: err.message,
            result: ''
          })
        }
      })
    }
  }).catch((err) => {
    res.json({
      status: '1',
      msg: err.message,
      result: ''
    })
  })
})
// 根据订单ID查询订单信息
router.get('/orderDetail', (req, res, next) => {
  let userId = req.cookies.userId
  let orderId = req.query.orderId
  Users.findOne({userId: userId}).then((userInfo) => {
    if (userInfo) {
      let orderList = userInfo.orderList
      if (orderList.length > 0) {
        let orderTotal = 0
        orderList.forEach((item) => {
          if (item.orderId === orderId) {
            orderTotal = item.orderTotal
          }
        })
        // 若订单金额大于0则判断为存在，否则判断订单不存在，暂不考虑0元单的存在
        if (orderTotal > 0) {
          res.json({
            status: '0',
            msg: '',
            result: {
              orderId: orderId,
              orderTotal: orderTotal
            }
          })
        } else {
          res.json({
            status: '12002',
            mes: '无此订单',
            result: ''
          })
        }
      } else {
        res.json({
          status: '12001',
          mes: '当前用户未创建订单',
          result: ''
        })
      }
    }
  }).catch((err) => {
    if (err) {
      res.json({
        status: '1',
        mes: err.message,
        result: ''
      })
    }
  })
})

module.exports = router
