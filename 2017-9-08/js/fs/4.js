let fs = require("fs");
fs.open("./1.txt","r+",function(err,fd){
    if(err){
        console.log("文件读取失败！");
    }else{
        // let bf = new Buffer.from(" hello nodejs");
        // fs.write(fd,bf,0,bf.length,12,function(err,bytesWritten,buffer){
        //     console.log(arguments);
        // });
        fs.write(fd,"你好 nodeJS",5,"utf8");
        let bf1 = new Buffer.alloc(30);
        fs.read(fd,bf1,0,bf1.length,0,function(err,length,buffer){
            console.log("当前文件的内容为： " + bf1.toString());
        })
        //关闭文件
        // fs.close(fd,function(){

        // });
    }
});