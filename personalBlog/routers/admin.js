//后台管理模块
let express = require("express");
let router = express.Router();

router.use( (req,res,next) => {
    if(!req.userInfo.isAdmin){
        //如果当前用户为非管理员的处理
        res.send('对不起，只有管理员才可以进入后台管理');
        return;
    }
    next();
});
router.get('/', (req,res,next) => {
    res.render('admin/index');
})
module.exports = router;