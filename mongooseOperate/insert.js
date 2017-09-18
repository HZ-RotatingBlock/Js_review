let mongoose = require('mongoose');
require('./model.js');

let Book = mongoose.model('Book');

let book = new Book({
    name: 'MEAN Web Development',
    author: 'NodeJS',
    publishTime: new Date()
});
book.save( (err) => {
    if(err) console.log(err);
});