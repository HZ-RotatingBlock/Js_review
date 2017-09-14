let mongoose = require("mongoose");
let contentsSchema = require("../schemas/contents");
// model方法创建一个模型,第一个参数是模型命名
module.exports = mongoose.model("Content",contentsSchema);