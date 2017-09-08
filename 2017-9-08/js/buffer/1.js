// let arr = [1,2,3];
// // let bf = new Buffer.alloc(10);
// // console.log(Buffer.isBuffer(arr));
// console.log(Buffer.isBuffer(bf));

// let str1 = "nodejs";
// console.log(str1.length);
// console.log(Buffer.byteLength(str1));

// let str2 = "你好";
// console.log(str2.length);
// console.log(Buffer.byteLength(str2,"ascii"));

// let str1 = "你好";
// let str2 = "nodejs";
// let list = [new Buffer.from(str1),new Buffer.from(str2)];
// console.log(list);
// let bf = Buffer.concat(list,12);
// console.log(bf);

process.stdout.write("请输入内容： ");
process.stdin.resume();
process.stdin.on("data",function(chunk){
    console.log(chunk);
})