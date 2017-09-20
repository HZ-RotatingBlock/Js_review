let fs = require('fs');
// fs.mkdir("./test",function(){
//     console.log(arguments);
// })
// fs.rmdir("./test",function(){
//     console.log(arguments);
// })
fs.readdir("./",function(err,fileList){
    fileList.forEach(function(f){
        fs.stat(f,function(err,info){
            switch(info.mode){
                case 16822:
                    console.log("[文件夹]" + f);
                    break;
                case 33206:
                    console.log("[文件]" + f);
                    break;
                default:
                    console.log("其他类型" + f);
                    break;
            }
        })
    })
})