let mongoose = require('mongoose');
require('./model.js');
let book = mongoose.model('Book');
book.findOne({author: 'Green'}, (err,data) => {
    if(err){
        console.log(err);
        return;
    }
    if(data){
        data.remove();
        console.log('删除成功！');
    }else{
        console.log('未找到查询值!');
    }
})