var user = 0


$("#imageSearch").click(function (){
    $("#readFile").change(function (){
        $("#searcherMain").ajaxSubmit({
            success: function (data) {
                window.open("/index3/html/home1topic.html?text="+data.key)
            },
            error: function (error) { alert("上传异常"); },
            type: "post", /*设置表单以post方法提交*/
            dataType: "json" /*设置返回值类型为文本*/
        })
    })
    $("#readFile").trigger("click")
})
function getArgs() {
    var args = {};
    var query = location.search.substring(1);
    // Get query string
    var pairs = query.split("&");
    // Break at ampersand
    for(var i = 0; i < pairs.length; i++) {
        var pos = pairs[i].indexOf('=');
        // Look for "name=value"
        if (pos == -1) continue;
        // If not found, skip
        var argname = pairs[i].substring(0,pos);// Extract the name
        var value = pairs[i].substring(pos+1);// Extract the value
        value = decodeURIComponent(value);// Decode it, if needed
        args[argname] = value;
        // Store as a property
    }
    return args;// Return the object
}
var paramters = getArgs()
$("#input").val(paramters.text)


$("#search").click(function (){
    window.open("home1topic.html?type=topic&text="+$("#input").val())
})

function getUser(){
    $.ajax({
        url: "/getUserServlet.Servlet",
        type: "post",
        dataType: "json",
        data: {

        },
        success: function (data){
            if(data.success){
                // 登录成功
                user = data.user
            }
            else {
                // 登录失败
            }
            showUser()
        }
    })
}
function showUser(){
    if(user === 0){
        $("#noUser").css("display", "block")
        $("#user").css("display", "none")
        $("#noAvatar").click(function (){
            showLogin()
        })
        $($("#noName div")[0]).click(function (){
            showLogin()
        })
        $("#noName div")[1].onclick=function (){
            window.open("register.html","_self")
        }
    }
    else {
        $("#user").css("display", "block")
        $("#noUser").css("display", "none")
        $("#avatar img").attr("src", user.avatar)
        $("#name p").text(user.userName)
        $("#name div").text(user.setting)
    }
}
function showLogin(){
    $("#mainer form").css("display","none")
    $("#loginContainer").css("display", "block")
}
function showSearch(){
    $("#mainer form").css("display","block")
    $("#loginContainer").css("display", "none")
}
// 尝试获取用户信息
getUser()

$("#close").click(function (){
    $("#loginContainer").css("display", "none")
    $("#mainer form").css("display","block")
})

$("#logout").click(function (){
    $.ajax({
        url: "/exitServlet.Servlet",
        type: "post",
        dataType: "json",
        success: function (data){
            if(data.success){
                window.open("home.html","_self")
            }
        }
    })
})
