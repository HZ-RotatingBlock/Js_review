let fs = require("fs");
let filename = "2.new.txt";
fs.watch(filename,function(ev,fillname){
    console.log(ev);
    if(fillname){
        console.log(fillname + "发生了改变");
    }else{
        console.log("......");
    }
})