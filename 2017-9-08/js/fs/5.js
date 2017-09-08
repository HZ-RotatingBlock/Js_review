let fs = require("fs");
let filename = "2.txt";
// fs.writeFile(filename,"hello mongoDB",function(){
//     console.log(arguments);
// })
// fs.appendFile(filename," hello nodejs easy",function(){
//     console.log(arguments);
// })

fs.access(filename,function(err){
    console.log(err);
})