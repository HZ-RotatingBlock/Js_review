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
    moveNum = parseInt(getStyle(obj,attr)) > target ? -moveNum : moveNum;
    clearInterval(obj.moveTimer);
    obj.moveTimer = setInterval(function(){
        let speed = parseInt(getStyle(obj,attr)) + moveNum;
        //值变化
        if ( speed > target && moveNum > 0 ||  speed < target && moveNum < 0  ) {
            speed = target;
        }
        obj.style[attr] = speed + "px";
        if(speed == target){
            clearInterval(obj.moveTimer);
            endFn && endFn();
        }
    },10);

}
//元素透明度变化(obj:操作对象;changeNum:变化速率;targetNum:目标值;endFn:回调函数)
function opacityTab(obj,changeNum,targetNum,endFn){
    changeNum = parseFloat(getStyle(obj,"opacity")) > targetNum ? -changeNum : changeNum;
    clearInterval(obj.opacity_timer);
    obj.opacity_timer = setInterval(function(){
        let objOpacity = parseFloat(getStyle(obj,"opacity")) + changeNum;
        //透明度变化
        if(objOpacity > targetNum && changeNum > 0 || objOpacity < targetNum && changeNum < 0){
            objOpacity = targetNum;
        }
        obj.style.opacity = objOpacity;
        if(objOpacity === targetNum){
            clearInterval(obj.opacity_timer);
            endFn && endFn();
        }
    },25);
}
//抖动函数
//obj:操作对象;attr：变化属性;shakeNum抖动频率;endFn:执行结束后的回调函数;
function shake(obj,attr,shakeNum,endFn){
    let shakeArr = [];
    let objStyle = parseInt(getStyle(obj,attr));
    let num = 0;
    for(let i = shakeNum;i >= 0;i--){
        shakeArr.push(i,-i);
    }
    shakeArr.push(0);
    let shakeArrLength = shakeArr.length;

    clearInterval(obj.shakeTimer);
    obj.shakeTimer = setInterval(function(){
        obj.style[attr] = objStyle + shakeArr[num % shakeArrLength] + "px";
        num++;                     
        if(num === shakeArrLength){
            clearInterval(obj.shakeTimer);
            endFn && endFn();
        }
    },10);
}
//时间函数（finishTimeObj:截止时间,clickObj：截止时间生效点击对象或定时器触发器,displayObj：剩余时间显示对象,endFn：回调函数）
function countDown(finishTimeObj,clickObj,displayObj,endFn){
    let iNew = new Date(finishTimeObj.value);
    clearInterval(clickObj.finishTimer);
    clickObj.finishTimer = setInterval(function(){
        let result = 0;
        let str = "";
        iNow = new Date();
        //毫秒=>秒
        result = Math.floor((iNew - iNow) / 1000);
        if(result >= 0){
            str = "剩余" + Math.floor(result / 86400) + "天" + Math.floor(result % 86400 / 3600) + "时" + Math.floor(result % 36400 % 3600 / 60) + "分" + result % 60 + "秒";
            displayObj.innerHTML = str;
            endFn && endFn();
        }else{
            clearInterval(clickObj.finishTimer);
        }
    },1000);
}
//数组的indexOf方法
//为数组编写indexOf()方法，arr为传入的数组，ele为所查元素;
function arrIndexOf(arr,ele){
    let arrLength = arr.length;
    for(let i = 0;i < arrLength;i++){
        if(arr[i] == ele){
            return i;
        }
    }
    return -1;
}
//随机生成 n 个 x ~ y 之间的不重复的整数
function randomProduce(n,x,y){
    var status = y - x > n ? true : false;
    var arr = [];
    var result = "";
    var middleEle = null;
    if(status){       
        for(let i = 0;i < n;i++){
            middleEle = Math.round(Math.random() * (y - x) + x);
            if(result.indexOf(middleEle) == -1){
                result += middleEle + ",";
            }else{
                i = i > 0 ? i-1 : 0;           
            }          
        }
        arr = result.split(",");
        //arr中大于长度n后的元素舍弃
        arr.length = n;
        return arr;
    }else{
        alert("生成区间差没有大于生成数量！不符合生成规则！");
    }
}
//兼容型的事件绑定函数封装-1
function bind(obj,eventName,fn){
    if(obj.addEvnetListener){
        obj.addEvnetListener(eventName,fn,false);
    }else{
        obj.attachEvent("on" + eventName,function(){
            fn.call(obj);
        });
    }
}
//兼容型的事件绑定函数封装-1(修改Object对象直接添加原型的方法)
Object.prototype.bind = function(eventName,fn){
    if(this.addEventListener){
        this.addEventListener(eventName,fn,false);
    }else{
        this.attachEvent("on" + eventName,function(){
            fn.call(this);
        });
    }
}
//拖拽封装(第一个参数是拖拽对象，第二个参数是拖拽对象的参考拖拽范围对象),注意：拖拽对象的参照位移为最接近它的position定位祖先元素
function dropFn(obj,rangeObj){
    obj.onmousedown = function(){                   
    //全部捕获，捕获所有的onmousedown事件至oBox上触发（在这里主要用于防止文字选中时拖拽引起的拖拽失败问题,当然其他妨碍oBox拖拽的元素如图片拖拽也会被解决）
        if(obj.setCapture){
            obj.setCapture();
        }
        document.onmousemove = function(ev){
            var ev = ev || event;
            var T = rangeObj == document.documentElement ? ev.clientY : ev.clientY - (document.documentElement.clientHeight - rangeObj.offsetHeight) / 2;
            var L = rangeObj == document.documentElement ? ev.clientX : ev.clientX - (document.documentElement.clientWidth - rangeObj.offsetWidth) / 2;
            var objWidth = obj.offsetWidth;
            var objHeight = obj.offsetHeight;
            //若要改为边界磁性吸附的效果则将各个条件中的objWidth / 2改为objWidth即可
            if(L < objWidth / 2){
                L = objWidth / 2;
            }else if(L > rangeObj.clientWidth - objWidth / 2){
                L = rangeObj.clientWidth - objWidth / 2;
            }
            if(T < objHeight / 2){
                T = objHeight / 2;
            }else if(T > rangeObj.clientHeight - objHeight / 2){
                T = rangeObj.clientHeight - objHeight / 2
            }
            obj.style.top = T - objHeight / 2 + "px";
            obj.style.left = L - objWidth / 2 + "px";     
        }
        document.onmouseup = function(){
            document.onmousemove = null;
            document.onmouseup = null;
            //释放全局捕获
            if(obj.releaseCapture){
                obj.releaseCapture();
            }
        }
        return false;
    }
} 