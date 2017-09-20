let bf = new Buffer.from("nodejs");
console.log(bf.toString());
console.log(bf.toString("utf8",1));

let bf2 = new Buffer.from("你好");;
console.log(bf2.toString());
console.log(bf2.toString("utf8",3));

console.log(bf.toJSON());
