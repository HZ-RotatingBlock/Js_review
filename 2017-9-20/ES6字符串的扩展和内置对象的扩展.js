// *********************************Symbol数据类型********************************
//Symboln不能使用new去调用，因为他是一个原始类型的值，不是对象
// let s1 = Symbol();
// let s2 = Symbol();
// console.log(typeof s1);
// console.log(s1 == s2);
//symbol接受一个字符串作为参数，仅仅表示对Symbol的描述，本身不代表任何意义，主要是为了在控制台显示，或者转为字符串的时候比较容易区分
// let s3 = Symbol('hello');
// let s4 = Symbol('js');
// console.log(s3);
// console.log(s4);

// console.log(Symbol('momo') === Symbol('momo'));
// console.log(String(Symbol('hello')));
// console.log((Symbol('nodejs').toString()));

// console.log(!!Symbol());
//Symbol不能转化为数字,且不能使用任何运算符和运算方法进行运算
// console.log(Number(Symbol()));
// console.log(Symbol('momo') * 100);
//以下写法拿不到对应键的值
// const data = {
//     [Symbol()]:123,
//     a: 1,
//     b: 2
// }
// console.log(data);
// //Symbol不能被for...in循环，虽然不能被遍历，但也不是私有的属性，可以通过Object.getOwnPropertySymbols方法获得一个对象的Symbol属性,该方法返回一个数组,表示该对象下的所有Symbol的集合
// for(let i in data){
//     console.log(i);
// }
// console.log(Object.getOwnPropertySymbols(data));
// console.log(data[Object.getOwnPropertySymbols(data)[0]]);

// *****************************************************************
// 1. repeat() 对字符串作重复操作
// let str = '0';
// let str2 = str.repeat(10);
// // console.log(str2);

// 2. includes() 判断字符串中是否有指定的值，返回值为Boolean
// let str = 'hello';
// console.log(str.includes('ll'));
// console.log(str.includes('sadf'));

// 3.startsWith() 判断字符串是否以指定字符开头，返回值为Boolean类型
// let str = 'hello';
// console.log(str.startsWith('h'));
// console.log(str.startsWith('d'));

// 4. endsWith() 判断字符串是否以指定字符结尾，返回值为Boolean类型
// let str = 'hello';
// console.log(str.endsWith('o'));
// console.log(str.endsWith('d'));

// *************************对数组的扩展****************************
// 1. Array.from() 将类数组转换为数组
// 2. Array.of() 创建一个数组
// 3. find() 对数组进行筛选，查找数组中符合条件的元素，返回第一个符合条件的元素，都不符合返回undefinded
// const arr = [1,2,3,4];
// let res = arr.find(function(a){
//     return a < 2;
// });
// console.log(res);

// 4. findIndex() 对数组进行筛选，查找数组中符合条件的元素的下标，返回第一个符合条件的元素的下标，都不符合返回-1
// const arr = [1,2,3,4];
// let res = arr.findIndex(function(a){
//     return a < 2;
// });
// console.log(res);

// 5. fill() 给定一个值对数组进行填充,接收三个参数，第一个必选，后两个可选，第一参数为为数组每个元素填充的内容，后两个分别指从数组哪个元素开始填充，以及到数组哪个元素结束填充(不包括结束位置)
// const arr = [1,2,3,4];
// arr.fill('absfdgdf',1,2);
// console.log(arr);

// *************************内置对象的扩展****************************
// 1.对象的简洁表示法
// let a = 1;
// // const obj = {
// //     a: a
// // }
// // 类似以上的对象总若对象当中的属性及属性值相同，则可以简写为:
// // const obj = {a};
// //------------
// const obj = {
//     //原始的
//     fn: function(){
//         console.log(1);
//     },
//     //以上声明对象中的方法的形式可以简写为以下形式
//     //简写的
//     fn2(){
//         console.log(2);
//     }
// }
// 2. Object.is() 判断两个数据是否一样(外表)
// console.log(Object.is(NaN,NaN));//true
// 3. Object.assign() 用于对象的合并，将源对象的所有可枚举属性，复制到目标对象(若有重复属性则目标对象会被覆盖)
// let obj1 = {a:1};
// let obj2 = {a:2,b:3};
// let obj3 = {c:'sdgfgd'};
// Object.assign(obj1,obj2,obj3); //{ a: 2, b: 3, c: 'sdgfgd' }
// console.log(obj1);
// console.log(obj2);
// console.log(obj3);

// *************************函数的扩展****************************
// 1. 为函数参数指定默认值
// function fn(a,b){
//     a = a || 10;
//     b = b || 20;
//     console.log(a + b);
// }
// fn();//30
// fn(0,10);//20,在这里a的值0被'||'符判断为false所以a值为10而不是0
// 解决上述问题的ES6方法：
// function fn(a = 10,b = 20){
//     console.log(a + b);
// }
// fn();//30
// fn(0,10);//10

// 2. rest参数形式
// 形式为('...参数名'),用于获取函数的多余参数，这样就不需要使用arguments对象了，rest参数搭配的变量是一个数组，该变量将多余的参数放入数组中
// EE6中不再提倡使用arguments这个对象
//----------原始形式
// function sum(){
//     let args = arguments;
//     let res = 0;
//     for(let i = 0;i < args.length;i++){
//         res += args[i];
//     }
//     console.log(res);
// }
// sum(1,2,3,4,5,6);
//----------rest形式,PS:在rest之前可以传递其他参数，但是rest之后不可以,例子如下
// function sum(a,...arr){
//     let res = a;
//     for(let i = 0;i < arr.length;i++){
//         res += arr[i];
//     }
//     console.log(res);
// }
// sum(10,1,2,3,4,5);//25

// 2. 箭头函数
//箭头函数方法
// const fn = a => a;
// //原始方法
// const fn2 = function(a){
//     return a;
// }

// 多参数时
// const fn = (a,b) => a + b;
// console.log(fn(1,2));//3

// 函数体有多行代码时
// const fn = (a,b) => {
//     a = a * 2;
//     b = b * 2;
//     return a + b;
// }
// console.log(fn(1,2));//6

//当箭头函数的返回值是对象时,需要使用小括号把他们包裹起来如下
// const fn = (a,b) => ({a,b}) //{a:1,b:2}
// console.log(fn(1,2));
//箭头函数常用于回调函数中
//原始写法
// let arr = [3,5,7,2,5,7,4,2,5,6];
// arr.sort(function(a,b){
//     return a - b;
// });
// console.log(arr);
//箭头函数写法
// let arr = [3,5,7,2,5,7,4,2,5,6];
// arr.sort((a,b) => a-b);
// console.log(arr);

//------------------------------箭头函数使用注意事项-------------------------
// 1. 箭头函数没有自己的this对象，所以在使用的时候，其内部的this就是定义时所在环境的对象，而不是使用所在环境的对象；因此不能使用call，appay,bind取改变其内部的this指向
// function fn(){
//     setTimeout(function(){
//         console.log(this);//this指向window
//     },1000);
//     setTimeout(() => {
//         console.log(this);//this指向定义时所在环境对象
//     },1000);
// }
// let obj = {a:1};
// fn.call(obj);//此时箭头函数的setTimeout的this指向了obj,与此同时非箭头函数的this指向了window

// 2.箭头函数体内没有arguments对象，若要使用类似于arguments的，则可以用Rest参数代替
// function fn(...arr){
//     setTimeout = (() => {
//         console.log(arr);
//     },1000);
// }
// fn(1,2,3);

// const fn = (...arr) => arr;
// console.log(fn(1,2,3));

// 3.箭头函数不可以当做构造函数，即不可以使用new命令，否则会抛出一个错误
// const Fn = (a,b) => a + b;
// const f = new Fn(1,2);//error

// 4. 箭头函数不能当做Generator函数使用

//------------------------------Promise的使用-------------------------

let imgs = [
    'http://img1.gamersky.com/image2017/09/20170916_zl_91_6/gamersky_02origin_03_201791621382FE.jpg',
    'http://img1.gamersky.com/image2017/09/20170916_zl_91_8/gamersky_01origin_01_20179162146723.jpg',
    'http://img1.gamersky.com/image2017/09/20170916_zl_91_8/gamersky_06origin_11_2017916214662F.jpg'
];
let testUl = document.getElementById("test");
//图片预加载封装
function loadImg(url){
    const p = new Promise(function(resolve,reject){        
        const img = new Image();
        img.src = url;
        img.onload = function(){
            resolve(this);
        }
        img.onerror = function(){
            reject(new Error('图片加载失败'));
        }
    });
    return p;
}

// const p = new Promise(function(resolve,reject){
//     const img = new Image();
//     img.src = imgs[0];
//     img.onload = function(){
//         resolve(this);
//     }
//     img.onerror = function(err){
//         reject(new Error('图片加载失败'));
//     };
// });
// console.log(123);
// p.then(function(img){
//     console.log('加载完成！');
//     document.body.appendChild(img);
// }).catch(function(err){

// }); 
// console.log(456);


//------------------Promise.all-----------------
// let str = '';
// let arr = [];
// for(let i = 0;i < imgs.length;i++){
//     str += `<li style="background-image:url(${imgs[i]});">`;
//     arr.push(loadImg(imgs[i]));
// }
// const allDone = Promise.all(arr);
// allDone.then(function(){
//     testUl.innerHTML = str;
// }).catch(function(err){
//     console.log(err);
// })
//------------------Promise.resolve-----------------
//将对象转换为Promise对象，然后就立即执行thenable对象的then方法
// Promise.resolve({
//     then(resolve,reject){
//         const img = new Image();
//         img.src = imgs[1];
//         img.onload = function(){
//             resolve(this);
//         }
//     }
// }).then(function(img){
//     document.body.appendChild(img);
// });