//前台管理模块
let express = require("express");
let router = express.Router();
let Category = require('../models/Category');
router.get("/",function(req,res,next){
    //读取所有的分类信息
    Category.find().then( (categories) => {
        // console.log(categories);
        //render中第二个参数传入的数据就是分配给模板去使用的数据
        res.render("main/index",{
            userInfo: req.userInfo,
            categories: categories
        });
    })
    
})
module.exports = router;