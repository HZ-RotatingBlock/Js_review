let mongoose = require('mongoose');
require('./model.js');
let book = mongoose.model('Book');

let cond = {
    $or: [
        {author: 'Green'},
        {author: 'Vue'}
    ]
};
book.find(cond, (err,data) => {
    if(err){
        console.log(err);
        return;
    }
    console.log('查询条件为： ' + cond + ' 满足条件的数据为： ' + data);
})