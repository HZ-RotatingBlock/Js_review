// console.log(process.execPath);
// console.log(process.env);
// console.log(process.pid);
// console.log(process.arch);
// // setInterval(function(){

// // },5000);
// setTimeout(function(){
//     process.exit();
// },500);
// function log(data){
//     process.stdout.write(data);
// }
// log("你好");
// process.stdin.resume();
// let a;
// let b;
// process.stdout.write("请输入a的值： ")
// process.stdin.on("data",(chunk) => {
//     if(!a){
//         a = Number(chunk);
//         process.stdout.write("请输入b的值： ")
//     }else{
//         b = Number(chunk);
//         process.stdout.write("结果是: " +  (a + b));
//     }
    
// });
// let bf = new Buffer.alloc(5);
// console.log(bf);
// bf[1] = 10;
// console.log(bf);
// let bf = new Buffer.from([1,2,3]);
// console.log(bf);
// let bf = new Buffer.from("nodeJS","utf-8");
// console.log(bf);
// for(let i = 0;i < bf.length;i++){
//     // console.log(bf[i].toString(16));
//     console.log(String.fromCharCode(bf[i]));
// }
// let str1 = "NodeJs";
// let bf1 = new Buffer.from(str1);

// console.log(str1.length);
// console.log(bf1.length);

// let str2 = "您好";
// let bf2 = new Buffer.from(str2);
// console.log(str2.length);
// console.log(bf2.length);
let str = "nodejs";
console.log(new Buffer.from(str));
let bf = new Buffer.alloc(5);
// bf.write(str);
// console.log(bf);
// bf.write(str,1);
// console.log(bf);