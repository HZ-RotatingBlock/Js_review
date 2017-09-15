let prepage = 10;
let page = 1;
let pages = 0;
let comments = [];
//提交评论
$("#messageBtn").on("click",function(){
    $.ajax({
        type: 'POST',
        url: '/api/comment/post',
        data: {
            contentid: $("#contentId").val(),
            content: $("#messageContent").val()
        },
        success: (responseData) => {
            $("#messageContent").val('');
            comments = responseData.data.comments.reverse();
            renderComment();
        }
    });
});

//页面重载时获取该文章的所有评论
$.ajax({
    url: '/api/comment',
    data: {
        contentid: $("#contentId").val()
    },
    success: (responseData) => {
        comments = responseData.data.reverse();
        renderComment();
    }
});

$('.pager').delegate('a','click',function(){
    if($(this).parent().hasClass('previous')){
        page--;
    }else{
        page++;
    }
    renderComment();
});


function renderComment(){
    $("#messageCount").html(comments.length);
    pages = Math.max(Math.ceil(comments.length / prepage),1);
    let start = Math.max(0,(page - 1) * prepage);
    let end = Math.min(start + prepage,comments.length);
    let $lis = $('.pager li');
    $lis.eq(1).html(page + ' / ' + pages);
    if(page <= 1){
        page = 1;
        $lis.eq(0).html('<span>没有下上一页了</span>');
    }else{
        $lis.eq(0).html('<a href="javascript:;">上一页</a>');
    }
    if(page >= pages){
        page = pages;
        $lis.eq(2).html('<span>没有下一页了</span>');
    }else{
        $lis.eq(2).html('<a href="javascript:;">下一页</a>');
    }
    //无评论时
    if(comments.length == 0){
        $(".messageList").html('<div class="messageBox"><p>目前还没有评论，来成为第一个评论的人吧~</p></div>');
    }else{
        let html = '';
        for(let i = start;i < end;i++){
            html += `<div class="messageBox">
                        <p class="name clear"><span class="fl">${decodeURI(comments[i].username)}</span><span class="fr">${formatData(comments[i].postTime)}</span></p><p>${comments[i].content}</p>
                    </div>`;
        }
        $(".messageList").html(html);
    }  
    
}
//格式化时间
function formatData(d){
    let date1 = new Date(d);
    let minutes = date1.getMinutes();
    let seconds = date1.getSeconds();
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    return `${date1.getFullYear()}年${date1.getMonth() + 1} 月${date1.getDate()}日  ${date1.getHours()}:${minutes}:${seconds}`;
}
