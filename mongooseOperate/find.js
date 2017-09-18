let mongoose = require('mongoose');
require('./model.js');
let Book = mongoose.model('Book');
Book.find({},(err, data) => {
    if(err){
        console.log(err);
        return;
    }
    console.log('result:',data);

})