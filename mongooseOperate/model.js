let mongoose = require('mongoose');
let express = require('express');
let app = express();

let uri = 'mongodb://localhost:27019/mongooseOperate';
mongoose.connect(uri, (err) => {
    if(err){
        console.log("数据库连接失败");
    }else{
        console.log("数据库连接成功");
        //监听http请求
        app.listen(8081);
    }
});
//定义一个schema
let BookSchema = new mongoose.Schema({
    name: String,
    author: String,
    publichTime: Date
});
//创建model并注册
mongoose.model('Book',BookSchema);