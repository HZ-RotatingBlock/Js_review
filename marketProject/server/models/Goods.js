let mongoose = require('mongoose')

let goodsSchema = new mongoose.Schema({
  'productId': String,
  'productName': String,
  'salePrice': Number,
  'productImage': String,
  'checked': String,
  'productNum': Number
})

module.exports = mongoose.model('Good', goodsSchema)
