var user=""
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
    window.open("home1topic.html?type="+paramters.type+"&text="+$("#input").val(),"_self")
})
$("#TypeIsTest").click(function (){
    window.open("home1topic.html?type=test&text="+$("#input").val(),"_self")
})
$("#TypeIsTopic").click(function (){
    window.open("home1topic.html?type=topic&text="+$("#input").val(),"_self")
})

function goShowMain(){
    if(paramters.type==="topic" || paramters.type === undefined || paramters.type === "undefined"){
        $("#TypeIsTopic").addClass("checkedType")
        $("#topicsList").css("display", "block")
        getTopic()
    }
    else if(paramters.type==="test"){
        $("#TypeIsTest").addClass("checkedType")
        $("#testPaperList").css("display", "block")
        $("#pageTest").css("display", "block")
        getTest()
    }
    else {

    }
}
goShowMain()



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
    if(user === ""){
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
function toLogin(){
    window.open("home.html","_self")
}


function getTopUser(){
    $.ajax({
        url: "/findTopUserServlet.servlet",
        type: "post",
        dataType: "json",
        data: {},
        success: function (data){
            showTopUser(data)
        },
        error: function (data){
        }
    })
}
function showTopUser(topUsers){
    var topUserHtml = ""
    if(topUsers[0]){
        topUserHtml = topUserHtml+"\n" +
            "                    <div class=\"user\">\n" +
            "                        <div><img src=\""+topUsers[0].avatar+"\" alt=\"\"></div>\n" +
            "                        <div><p style=\"margin: 0\">"+topUsers[0].user_name+"</p><p style=\"margin: 0\">今日刷题:"+topUsers[0].count+"</p></div>\n" +
            "                    </div>"
    }

    if(topUsers[1]){
        topUserHtml = topUserHtml+"\n" +
            "                    <div class=\"user\">\n" +
            "                        <div><img src=\""+topUsers[1].avatar+"\" alt=\"\"></div>\n" +
            "                        <div><p style=\"margin: 0\">"+topUsers[1].user_name+"</p><p style=\"margin: 0\">今日刷题:"+topUsers[1].count+"</p></div>\n" +
            "                    </div>"
    }


    if(topUsers[3]){
        topUserHtml = topUserHtml+"\n" +
            "                    <div class=\"user\">\n" +
            "                        <div><img src=\""+topUsers[3].avatar+"\" alt=\"\"></div>\n" +
            "                        <div><p style=\"margin: 0\">"+topUsers[3].user_name+"</p><p style=\"margin: 0\">今日刷题:"+topUsers[3].count+"</p></div>\n" +
            "                    </div>"
    }
    $(".mainerUser").html(topUserHtml)
}
getTopUser()









// 关于Topic展示的js内容,仅仅包含数条搜索到的结果
var last = 0;
var now = 0;
var max = 0;
var showHid = 0;
var topics;
function getTopic(){
    $.ajax({
        url: "/findTopicByTextServlet",
        dataType: "json",
        type: "post",
        data: {
            text: paramters.text
        },
        success: function (data){
            if (data.success){
                topics = data.topics;
                max = data.topics.length
                showTopic(data.topics)

                setTimeout(function (){
                    $("#topic-ul li").click(function (e){
                        $("#topic-ul li").removeClass("check")
                        $(e.target).addClass("check")
                        var i = parseInt($(e.target).text())
                        $(".topic").css("display","none")
                        $(".topic")[i-1].style.display="block"
                    })

                    $("#topic-items .topic .detail .readAnswer").click(function (e){
                        var ans = $(e.target).parents(".topic").find(".answerMain")
                        var display = ans.css("display")
                        if(display==="none")
                            ans.css("display","block")
                        else ans.css("display","none")
                    })

                    $("#topic-ul div.noTopic").click(function (){
                        window.open("/index3/html/uploadNoAnswerTopic.html")
                    })
                })




                /*
                $(".last").click(function (e){
                    now = (last+max-1)%max
                    runTopic()
                    MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
                })
                $(".next").click(function (e){
                    now = (last+1)%max
                    runTopic()
                    MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
                })
                $(".getAnswer").click(function (e){
                    showHid++
                    if(showHid%2===1){
                        $(e.target).text("隐藏答案")
                        $(e.target).nextAll().css("opacity","1")
                        $(e.target).nextAll().css("display","block")
                        $("#topicsList").css("height",$($(".topic")[now]).css("height"))
                    }else {
                        $(e.target).text("查看答案")
                        $(e.target).nextAll().css("opacity","0")
                        setTimeout(function (){
                            $(e.target).nextAll().css("display","none")
                            $("#topicsList").css("height",$($(".topic")[now]).css("height"))
                        },1000)
                    }
                })*/
            }
        }
    })
}
function showTopic(topics){
    var lisHtml = ""
    var listTopic = ""
    for (var i = 0; i < topics.length; i++) {
        var topic = topics[i]
        var options = topic.topicOptions
        var optionString = ""
        for (var j = 0; j < options.length; j++) {
            option = options[j]
            optionString = optionString+"<p class=\"option\">"+ option.title+"."+ option.main +"</p>\n"
        }
        var correctRate = 0
        if(topic.answerNumber!=0)
            correctRate = topic.answerOkNumber/topic.answerNumber
        if (topic.topicExplain === "")
            topic.topicExplain = "略"
        if(i==0){
            listTopic = listTopic+"<li class=\"check\">"+(i+1)+"</li>"
            lisHtml = lisHtml + "<li class=\"topic\" style=\"display: block\">"
        }
        else {
            listTopic = listTopic+"<li>"+(i+1)+"</li>"
            lisHtml = lisHtml + "<li class=\"topic\">"
        }


        lisHtml = lisHtml + "    <p class=\"title\">【"+    topic.topicType    +"】"+   topic.topicTitle   +"</p>\n" +
            "                        <div class=\"options\">\n" +
                                          optionString  +
            "                        </div>\n" +
            "                        <div class=\"detail\">\n" +
            "                            <p>考点:线性代数</p>\n" +
            "                            <p>正确率:"+   correctRate   +"</p>\n" +
            "                            <p class='readAnswer' style='cursor: pointer'>查看答案</p>\n" +
            "                            <p topicId='"+   topic.topicId   +"'>检错</p>\n" +
            "                        </div>\n" +
            "                        <div class=\"answerMain\" style='display: none;'>\n" +
            "                            <p>答案: "+   topic.topicAnswer   +"</p>\n" +
            "                            <p>解析: 略</p>\n" +
            "                        </div>\n" +
            "                    </li>"

    }
    listTopic =listTopic+"<div class=\"noTopic\">没有找到,请人答<img style='width: 20px;height: 20px;' src='/index3/image/noTopic.gif' alt=''></div>"
    $("#topic-items").html(lisHtml)
    $("#topic-ul").html(listTopic)
}
// 关于Test展示的js内容
var testPapers
var size = 10
function getTest(){
    $.ajax({
        url: "/getTestPaperServlet.servlet",
        type: "post",
        dataType: "json",
        data: {
            text: paramters.text,
        },
        success: function (data) {
            testPapers = data

            $("#testPaperPaginayor").jqPaginator({
                totalPages: Math.ceil(data.length/size),
                visiblePages: 5,
                currentPage: 1,
                first: '<li class="first"><a href="javascript:void(0);">首页<\/a><\/li>',
                prev: '<li class="prev"><a href="javascript:void(0);">上一页<\/a><\/li>',
                next: '<li class="next"><a href="javascript:void(0);">下一页<\/a><\/li>',
                last: '<li class="last"><a href="javascript:void(0);">末页<\/a><\/li>',
                page: '<li class="page"><a href="javascript:void(0);">{{page}}<\/a><\/li>',
                onPageChange: function(n) {
                    $("#demo2-text").html(n)
                    getTestPaper(n,size)
                }
            })

        }
    })
}
function getTestPaper(n,size){
    $.ajax({
        url: "/getTestPaperServlet.servlet",
        type: "post",
        dataType: "json",
        data: {
            text: paramters.text,
            pageIndex: n,
            pageSize:size
        },
        success: function (data){
            testPapers=data
            $.ajax({
                url: "/getLikeTestServlet",
                type: "post",
                dataType: "json",
                data: {},
                success: function (data1){
                    var likeTestId = data1.testIdList;
                    showTestPaper(data,likeTestId)
                }
            })
        },
        error: function (){

        }
    })
}
function showTestPaper(testPapers,likeList){
    var testListHtml = ""
    $.map(testPapers, function (item,index){
        if(!item.avgGrade)
            item.avgGrade=0
        var color= "green"
        if(item.avgGrade<80)
            color="yellowgreen"
        if(item.avgGrade<60)
            color="yellow"
        if(item.avgGrade<40)
            color="orange"
        if(item.avgGrade<20)
            color="red"
        if(item.avgGrade==0)
            color="black"
        testListHtml = testListHtml + "\n" +
            "                <li><!--题目-->\n" +
            "                        <h4 class=\"title\">"+item.testName+"</h4>\n" +
            "                        <div class=\"goTest\" testId='"+item.testId+"' testName='"+item.testName+"'>开始考试</div>\n" +
            "                        <span class=\"kind\">科目: "+item.subjectName+"</span>\n" +
            "                        <span class=\"readCount\">人次: "+item.count+"</span>\n" +
            "                        <span class=\"commentCount\" style='color: "+color+"'>平均分: "+item.avgGrade+"</span>\n";
        if(isIn(item.testId,likeList))
            testListHtml = testListHtml + "                        <span class=\"like\" testId=\""+item.testId+"\">已收藏</span>\n"
        else
            testListHtml = testListHtml + "                        <span class=\"like\" testId=\""+item.testId+"\">收藏</span>\n"
        testListHtml = testListHtml + "                </li>"
    })
    $("#testPaperList").html(testListHtml)
    setTimeout(function (){
        $("#testPaperList li .like").click(function (e){
            if(user===""){
                alert("请先登录!!!")
            }
            else{
                var testId = $(e.target).attr("testId")
                $.ajax({
                    url: "/turnLikeServlet",
                    type: "post",
                    dataType: "json",
                    data: {
                        testId: testId
                    },
                    success: function (data){
                        $(e.target).html(data.message)
                    }
                })
            }
        })
        $("#testPaperList li .goTest").click(function (e){
            var testId = $(e.target).attr("testId")
            var testName = $(e.target).attr("testName")
            if(user===""){
                alert("请先登录")
            }
            else{
                if(toN==0)
                    window.open("/TangYu/html/Practice.html?testId="+testId+"&testName="+testName+"&date=2111-11-11")
                if(toN==1)
                    window.open("/TangYu/html/Practice.html?testId="+testId+"&testName="+testName+"&date=2222-11-11")
                if(toN==2)
                    window.open("/TangYu/html/Practice.html?testId="+testId+"&testName="+testName+"&date=2333-11-11")
                toN++
            }
        })
    })
}
var toN =0
function isIn(id,list){
    for(var i = 0;i<list.length;i++){
        if(list[i].testId === id) return true;
    }
    return false;
}
function toDayTest(){
    if(user===""){
        alert("请先登录!!!")
    }
    else {
        window.open("../../TangYu/html/DailyPracticeToday.html")
    }
}
$("#toDotopic").click(function (){
    window.open("doTopic.html")
})

setTimeout(function (){
    MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
},1000)

setTimeout(function (){
    MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
},2000)

setTimeout(function (){
    MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
},3000)





