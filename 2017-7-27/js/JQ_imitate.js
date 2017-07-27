//jq美元选择符$模拟
function $(v){
    if(typeof v === "function"){
        window.onload = v;
    }else if(typeof v === "string"){
        return document.getElementById(v);
    }else if(typeof v === 'object'){
        return v;
    }
}
//指定元素样式获取
function getStyle(obj,attr){
    return obj.currentStyle ? obj.currentStyle[attr] : window.getComputedStyle(obj)[attr];
}
//元素变化
function doMove(obj,attr,moveNum,target,endFn){
    moveNum = parseInt(getStyle(obj,attr)) < target ? moveNum : -moveNum;
    clearInterval(obj.timer);
    obj.timer = setInterval(function(){
        let speed = parseInt(getStyle(obj,attr)) + moveNum;
        //正值变化
        if(speed > target && moveNum > 0){
            speed = target;
        }
        //负值变化
        if(speed < target && moveNum < 0){
            speed = target;
        }
        obj.style[attr] = speed + "px";
        if(speed == target){
            clearInterval(obj.timer);
            endFn && endFn();
        }
    },10);

}
//抖动函数
//obj:操作对象;attr：变化属性;shakeNum抖动频率;endFn:执行结束后的回调函数;
function shake(obj,attr,shakeNum,endFn){
    let shakeArr = [];
    let pos = parseInt(getStyle(obj,attr));
    let timer = null;
    let num = 0;
    for(let i = shakeNum;i > 0;i--){
        shakeArr.push(i,-i);
    }
    shakeArr.push(0);
    let shakeArrLength = shakeArr.length;

    clearInterval(timer);
    timer = setInterval(function(){
        obj.style[attr] = pos + shakeArr[num % shakeArrLength] + "px";
        num++;                     
        if(num === shakeArrLength){
            clearInterval(timer);
            endFn && endFn();
        }
    },10);
}