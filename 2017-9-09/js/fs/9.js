
let projectData = {
    "name":"testFile",
    "fileData":[
        {
            "name":"css",
            "type":"dir"
        },
        {
            "name":"js",
            "type":"dir"
        },
        {
            "name":"images",
            "type":"dir"
        },
        {
            "name":"index.html",
            "type":"file",
            "contents":"<!DOCTYPE html>\n<html>\n\t<head>\n\t<title>自动化构建测试</title>\n\t</head>\n<body>\n\t\t<h1>你好</h1>\n</body>\n</html>"
        }
    ]
}
let fs = require("fs");
if(projectData){
    fs.mkdirSync(projectData.name);
    let fileData = projectData.fileData;
    if(fileData && fileData.forEach){
        fileData.forEach(function(f){
            let path = projectData.fileData + "/" + f.name;
            let contents = f.contents || "";
            switch(f.type){
                case "dir":
                    fs.mkdirSync(path);
                    break;
                case "file":
                    fs.writeFileSync(path,contents);
                    break;
                default:
                    break;
            }
        })
    }
}