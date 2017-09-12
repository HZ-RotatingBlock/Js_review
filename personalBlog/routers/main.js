//前台管理模块
let express = require("express");
let router = express.Router();
router.get("/",function(req,res,next){
    console.log(req.userInfo);
    //render中第二个参数传入的数据就是分配给模板去使用的数据
    res.render("main/index",{
        userInfo: req.userInfo
    });
})
module.exports = router;