let mongoose = require('mongoose');
let contentsSchema = require('../schemas/content');
module.exports = mongoose.model('Content',contentsSchema);