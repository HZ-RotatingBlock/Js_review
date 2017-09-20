let fs = require("fs");
let filedir = "./testFile/source";
fs.watch(filedir,function(ev,file){
    // console.log(ev + " / " + file);//这里不需要判断file是否有内容，应为变化的情况有可能是文件被删除
    //只要有一个文件发生了变化，我们就需要对这个文件夹下的所有文件进行读取，然后合并
    fs.readdir(filedir,function(err,dataList){
        let arr = [];
        dataList.forEach(function(f){
            let info = fs.statSync(filedir + "/" + f);
            //符合文件类型的文件则将其路径存入数组
            if(info.mode = 33206){
                arr.push(filedir + "/" + f);
            }
        })
        console.log(arr);
        //读取数组中的文件并合并
        let content = "";
        for(let f of arr){
            let c = fs.readFileSync(f);
            // console.log(c.toString());
            content += c.toString() + "\n";
        }
        console.log(content);
        fs.writeFile("./testFile/js/index.js",content);
    })
})