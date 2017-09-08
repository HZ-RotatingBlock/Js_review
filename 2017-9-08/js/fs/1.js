let fs = require("fs");
fs.open("./1.txt","r",function(err,fd){
    // console.log(err);
    // console.log(fd);
    if(err){
        console.log("文件打开失败！");
    }else{
        console.log("文件打开成功！");
        console.log(fd);
    }
})
fs.open("./1.txt","r",function(err,fd){
    console.log(fd);
});