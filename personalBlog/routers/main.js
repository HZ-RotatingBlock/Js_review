//前台管理模块
let express = require("express");
let router = express.Router();
let Category = require('../models/Category');
let Content = require('../models/Content');

let data;
//处理通用的数据
router.use( (req,res,next) => {
    data = {
        userInfo: req.userInfo,
        categories: []
    };
    Category.find().then( (categories) => {
        data.categories = categories;
        next();
    });
})
//首页
router.get("/",function(req,res,next){
    data.category = req.query.category || '';
    data.count = 0;
    data.page = Number(req.query.page || 1);
    data.limit = 3;
    data.skip = 0;
    //数据库条件查找where()方法的查找值
    let where = {};
    if(data.category){
        where.category = data.category;
    }
    //读取所有的分类信息
    Content.where(where).count().then( (count) => {
        data.count = count;
        //计算总页数
        data.pages = Math.ceil( data.count / data.limit );
        //取最小值，若当前页数超页数总数则取当前页数值，防止超过总页数
        data.page = Math.min( data.page,data.pages );
        //同时取值不能小于1
        data.page = Math.max( data.page,1 ); 
        let skip = (data.page - 1) * data.limit;
        //数据库条件查找where()    
        return Content.where(where).find().limit(data.limit).skip(skip).populate(['category','user']).sort({addTime: -1});
    }).then( (contents) => {
        data.contents = contents;
        //render中第二个参数传入的数据就是分配给模板去使用的数据
        res.render("main/index",data);
    });
    
});
//文章详情页
router.get('/view',(req,res) => {
    let contentId = req.query.contentid || '';
    Content.findOne({
        _id: contentId
    }).then( (content) => {
        data.content = content;
        content.views++;
        content.save();
        res.render('main/view',data);
    })
});
module.exports = router;