var head=$("#head");
var show='';
$.post("/acquire.action",function (data){
    if(data.success)
    {
        show='<div style="float: left;padding-left: 37px;padding-top: 2px;padding-bottom: 5px">\n' +
            '      <img id="return1" class="img1" src="../image/loge1.png" style="height: 38px;width: 87px">\n' +
            '      <span class="form-a">个人中心</span>\n' +
            '    </div>\n' +
            '    <div style="float: right;padding-right: 50px;padding-top: 10px">\n' +
            '      <!--<a class="home" href="../../index3/html/home.html">首页</a>-->\n' +
            '      <img class="form" src="'+data.list[0].avatar+'">\n' +
            '      <span class="form-text">'+data.list[0].userName+'</span>\n' +
            '    </div>'
    }
    head.html(show);
    setTimeout(function (){
        $("#return1").click(function (){

            location.href="/TangYu/html/homePage.html";
        })
    },200)
})