let mongoose = require("mongoose");
let categoriesSchema = require("../schemas/categories");
// model方法创建一个模型,第一个参数是模型命名
module.exports = mongoose.model("Category",categoriesSchema);