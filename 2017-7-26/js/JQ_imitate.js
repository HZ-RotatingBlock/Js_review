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