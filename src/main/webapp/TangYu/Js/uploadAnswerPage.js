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
    typeInitialization()
}
function typeInitialization(){
    if(paramters.type!=undefined&&paramters.type!="")
        $("#type").val(paramters.type)
    if(paramters.subject!=undefined&&paramters.subject!="")
        $("#subject").val(paramters.subject)
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

var noTopic
function getNoAnswerTopicByType(){
    $.ajax({
        url: "/getRandNoAnswerTopicServlet",
        type: "post",
        dataType: "json",
        data: {
            type: $("#type").val(),
            subject: $("#subject").val()
        },
        success: function (res){
            noTopic = res[0]
            showNoTopic()
            if(res.success){
                noTopic = res[0]
                showNoTopic()
            }
        }
    })
}
function showNoTopic(){
    $("#topicTitle").text(noTopic.topicTitle)
    var options = JSON.parse(noTopic.options)
    $("#topicSource span").text(noTopic.owner.userName)
    var html = "\n"
    var str = "ABCDEFGHIGKLMN"
    for (var i=0;i<options.length;i++){
        html = html+ "<div class='option'>"+ str[i] +"、"+ options[i] +"</div>\n"
    }
    $("#options").html(html)
    setTimeout(function (){
        MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
    },50)
}

function toSelectFile(e){
    console.log($(e).next())
    $(e).next().trigger("click")
}
function toShowImage(e){

    var file = e.files[0];
    //判断当前是否支持使用FileReader
    if(window.FileReader){
        //创建读取文件的对象
        var fr = new FileReader();
        //以读取文件字符串的方式读取文件 但是不能直接读取file
        //因为文件的内容是存在file对象下面的files数组中的
        //该方法结束后图片会以data:URL格式的字符串（base64编码）存储在fr对象的result中
        fr.readAsDataURL(file);
        fr.onloadend = function(){
            console.log(fr.result)
            $(e).next().children("img").attr("src",fr.result)
        }
    }/*
    $(e).next().children("img").attr("src",URL.createObjectURL($(e).files))*/
    $(e).next().css("display","block")
    $(e).prev().css("display","none")
}
function deleteFile(e){
    $(e).parent().remove()
}
function addImgInput(){
    $("#fileList").append("<div class=\"file\">\n" +
        "                            <div class=\"toSelectFile\" onclick=\"toSelectFile(this)\" style='padding: 4px 15px;border: 1px solid black;'>选择图片</div>\n" +
        "                            <input style=\"display: none\" onchange=\"toShowImage(this)\" type=\"file\" accept='image/x-png,image/gif,image/jpeg,image/bmp' name=\"resolve\">\n" +
        "                            <div class=\"showImg\" style=\"display: none;position: relative\">\n" +
        "                                <img src=\"\" alt=\"\" style=\"max-width: 100%;\">\n" +
        "                                <div onclick=\"deleteFile(this)\">删除</div>\n" +
        "                            </div>\n" +
        "                        </div>")
}
function submitAnswer(){
    var formData = new FormData();
    var inputs = $(".file input")
    for (var i=0;i<inputs.length;i++) {
        formData.append("files",inputs[i].files[0]);
    }
    var html = $("#cke_answer").find("iframe").contents().find("body")[0].innerHTML
    formData.append("answer",readDocument(html))
    formData.append("topicId",noTopic.topicId)
    if (html===""){
        alert("请不要提交空内容。。")
        return
    }
    $.ajax({
        url:'/addAnswerServlet',
        type:'post',
        data: formData,
        contentType: false,
        processData: false,
        success:function(res){
            if(res.success){
                userInitialization()
                reloadNoTopic()
            }
            if(res.getAsset){
                showGetAsset(res.assetCount,res.allAsset)
            }
        }
    })
}
function showGetAsset(newAsset,allAsset){
    console.log(newAsset,allAsset)
}
function reloadNoTopic(){
    getNoAnswerTopicByType()
    $("#cke_answer").find("iframe").contents().find("body")[0].innerHTML = ""
    $("#fileList").html("")
}


function readDocument(dmt){
    dmt = dmt.replace(/<img( class=\"([^\"]*)\")?( style=\"([^\"]*)\")?( data-cke-saved-src=\"([^\"]*)\")?( src=\"([^\"]*)\")? data-latex=\"([^\"]*)\">/g,"`$9`")
    dmt = dmt.replace(/<.r>/,"")

    dmt = dmt.replace("<sub></sub>","")
    dmt = dmt.replace(/<span[^>]*>/g,"")
    dmt = dmt.replace(/<\/span[^>]*>/g,"")
    dmt = dmt.replace(/([ >`]?)([^` <]+)(<sub>([^<]*)<\/sub>)(<sup>([^<]*)<\/sup>)/g,"$1`{$2}_{$4}^{$6}`")
    dmt = dmt.replace(/([ >`]?)([^` <]+)(<sup>([^<]*)<\/sup>)(<sub>([^<]*)<\/sub>)/g,"$1`{$2}_{$6}^{$4}`")
    dmt = dmt.replace(/([ >`]?)([^` <]+)(<sup>([^<]*)<\/sup>)/g,"$1`{$2}^{$4}`")
    dmt = dmt.replace(/([ >`]?)([^` <]+)(<sub>([^<]*)<\/sub>)/g,"$1`{$2}_{$4}`")
    return dmt;
}

function clickToLogin(){
    console.log("登录")
    window.open("homePage.html?todo=login","_self")
}

function clickToSignUp(){
    console.log("注册")
    window.open("homePage.html?todo=signin","_self")
}