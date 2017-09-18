let mongoose = require('mongoose');
require('./model.js');
let book = mongoose.model('Book');
book.findOne({author:'NodeJS'}, (err,data) => {
    if(err){
        console.log(err);
        return;
    }
    data.author = 'Vue';
    data.save();
    console.log('findOne result: ' + data);
});