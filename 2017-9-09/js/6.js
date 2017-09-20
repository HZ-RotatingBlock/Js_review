setInterval(function(){
    let d = new Date();
    console.log("现在是: " + d.getFullYear() + "年" + d.getMonth() + 1 + "月" + d.getDate() + "日" +  d.getHours() + '时' + d.getMinutes() + "分" + d.getSeconds() + "秒");
},1000);