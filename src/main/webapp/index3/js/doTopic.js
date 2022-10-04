var user
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
    if(!user){
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
getUser()
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


getNoAnswerTopic()
function getNoAnswerTopic(){
    $.ajax({
        url: "/getRandNoAnswerTopicServlet",
        type: "post",
        dataType: "json",
        data: {},
        success: function (data){
            showTopic(data[0])
        }
    })
}
function showTopic(topic){
    console.log(topic)
    $("#image").attr("src",topic.topicImage)
    $("#title").text(topic.topicTitle)
    var str= "ABCDEFGHIJK"
    var html = ""
    $.map(topic.optionls,function (item,index){
        html= html+"<p class=\"option\">"+str[index]+"、"+item+"</p>"
    })
    $("#options").html(html)
    $("#topicId").val(topic.topicId)
}

$("#my_answer").change(function (){
    $("#answerInput").val($("#my_answer").val())
})
$("#change").click(function (){
    $("#file").trigger("click")
})
$("#file").change(function (){
    var objUrl = getObjectURL(this.files[0]) ; //获取图片的路径，该路径不是图片在本地的路径
    if (objUrl) {
        $("#answerImage").attr("src", objUrl) ; //将图片路径存入src中，显示出图片
    }
})


function getObjectURL(file) {
    var url = null ;
    if (window.createObjectURL!=undefined) { // basic
        url = window.createObjectURL(file) ;
    } else if (window.URL!=undefined) { // mozilla(firefox)
        url = window.URL.createObjectURL(file) ;
    } else if (window.webkitURL!=undefined) { // webkit or chrome
        url = window.webkitURL.createObjectURL(file) ;
    }
    return url ;
}
$("#submit").click(function (){
    $("#answerInput").val($("#my_answer").val())
    $("#submitAnswer").ajaxSubmit({
        success: function (data){
            console.log(data)
        },
        type: "post",
        dataType: "json"
    })
    window.open("doTopic.html","_self")
})
$("#turnTopic").click(function (){
    $.ajax({
        url: "/getRandNoAnswerTopicServlet",
        type:"post",
        dataType: "json",
        data: {
            type: $("#type").val(),
            subject: $("#subject").val()
        },
        success: function (data){
            showTopic(data[0])
        }
    })
})