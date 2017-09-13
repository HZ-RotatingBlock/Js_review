//后台管理模块
let express = require("express");
let router = express.Router();
let User = require("../models/User");
router.use( (req,res,next) => {
    if(!req.userInfo.isAdmin){
        //如果当前用户为非管理员的处理
        res.send('对不起，只有管理员才可以进入后台管理');
        return;
    }
    next();
});
// 首页
router.get('/', (req,res,next) => {
    res.render('admin/index',{
        userInfo: req.userInfo
    });
})

// 用户管理
router.get('/user', (req,res) => {
    //从数据库当中读取所有的用户数据
    // limit(Number):限制获取的数据条数
    // skip():忽略数据的条数
    //每页显示两条
    //读取记录
    let page = Number(req.query.page || 1);
    let limit = 10;
    let skip = 0;
    let pages = 0;
    //数据库查询当前数据总条数
    User.count().then( (count) => {
        //计算总页数
        pages = Math.ceil( count / limit );
        //取最小值，若当前页数超页数总数则取当前页数值，防止超过总页数
        page = Math.min( page,pages );
        //同时取值不能小于1
        page = Math.max( page,1 ); 
        skip = (page - 1) * limit;
        User.find().limit(limit).skip(skip).then( (users) => {
            res.render('admin/user_index',{
                userInfo: req.userInfo,
                users: users,
                page: page,
                count: count,
                pages: pages,
                limit: limit
            })
        });
    });    
});
//分类首页
router.get('/category',(req,res,) => {
    res.render('admin/category_index',{
        userInfo: req.userInfo
    })
});
//分类的添加
router.get('/category/add', (req,res) => {
    res.render('admin/category_add',{
        userInfo: req.userInfo
    });
});
module.exports = router;