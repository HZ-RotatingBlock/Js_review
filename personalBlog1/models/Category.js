let mongoose = require('mongoose');
let categories = require('../schemas/categories');
module.exports = mongoose.model('Category',categories);