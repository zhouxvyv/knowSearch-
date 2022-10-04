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
var user
var paramters = getArgs()
// 页面初始化，根据来源信息，做出相应效果，如果是其他页面跳转来的，目标存放在todo词条中
function pageInitialization(){
    userInitialization()
    if(paramters.todo==="login"){
        clickToLogin()
    }
    else if(paramters.todo==="signin"){
        clickToSignUp()
    }
    else {
        backToTheEnd()
    }
}
pageInitialization()
function userInitialization(){
    $.ajax({
        url: "/getUserServlet.Servlet",
        type: "post",
        dataType: "json",
        data: {},
        success: function (res){
            if(res.success){
                user = res.user
                showUser()
            }
            else{
                console.log("还没有登录....")
            }
        }
    })
}
function showUser(){
    $("#noUserTarget").css("display","none")
    $("#userTarget").css("display","block")
    $("#userAvatar").attr("src",user.avatar)
    $("#userName>span").text(user.userName)
}


function clickToLogin(){
    console.log("登录")
    $(".mainSection").css("display","none")
    $("#login").css("display","block")
}

function clickToSignUp(){
    console.log("注册")
    $(".mainSection").css("display","none")
    $("#signin").css("display","block")
}

function backToTheEnd(){
    console.log("搜索内容")
    $(".mainSection").css("display","none")
    $("#search").css("display","block")
}



