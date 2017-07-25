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