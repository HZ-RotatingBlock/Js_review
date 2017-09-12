let mongoose = require("mongoose");
let userSchema = require("../schemas/users");
// model方法创建一个模型,第一个参数是模型命名
module.exports = mongoose.model("User",userSchema);