function getArgs() {
    var args = {};
    var query = location.search.substring(1);
    // Get query string
    var pairs = query.split("&");
    // Break at ampersand
    for(var i = 0; i < pairs.length; i++) {//
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
var user
// 页面初始化，根据来源信息，做出相应效果，如果是其他页面跳转来的，目标存放在todo词条中
function pageInitialization(){
    userInitialization()
    noTopicInitialization()
}
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
    $("#asset>span").text(user.asset)
}


var noTopicList = []
var nowShow = 0
function noTopicInitialization(){
    $.ajax({
        url: "/getMyNoAnswerServlet",
        type: "post",
        dataType: "json",
        data: {},
        success: function (res){
            console.log(res)
            noTopicList = res.list
            showNoTopicList()
        }
    })
}
function showNoTopicList(){
    var html = "\n"
    for(var i=0;i<noTopicList.length;i++){
        html = html +
"                    <div class='noTopic' no='"+ i +"' topicId='"+ noTopicList[i].topicId +"' onclick='showNowNoTopic("+i+",this)'>\n"
        if(noTopicList[i].answerCount>0)
            html = html +"<span class='newAnswerCount' style='width: 13px;height: 13px;border-radius: 13px;font-size: 6px;text-align: center;line-height: 13px;display: block;position: absolute;z-index: 1000;right: 0px;top: 0px;background-color: red;color: white;font-weight: bold'>"+noTopicList[i].answerCount+"</span>"
        html = html +   "                        <div></div>\n" +
"                        <div>\n" +
                             noTopicList[i].topicTitle +
"                        </div>\n" +
"                    </div>\n"
    }
    $("#myNoTopicList").html(html)
}




function clickToLogin(){
    console.log("登录")
    window.open("homePage.html?todo=login","_self")
}

function clickToSignUp(){
    console.log("注册")
    window.open("homePage.html?todo=signin","_self")
}