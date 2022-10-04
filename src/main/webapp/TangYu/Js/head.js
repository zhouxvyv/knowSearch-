var head=$("#logout-status");
var show='';
$.post("/acquire.action",function (data){
    if(data.success)
    {
        show='<a href="../../project/html/home.html"><img src="'+data.list[0].avatar+'" class="userIcon"\n' +
            '                                 style="height: 40px;border-radius: 20px;margin-top: 5px;margin-left: 10px"></a>\n' +
            '                <a href="../../project/html/home.html" class="nav-link" style="margin-right: 20px ;text-decoration: none">'+data.list[0].userName+'</a>';
    }
    head.html(show);
})