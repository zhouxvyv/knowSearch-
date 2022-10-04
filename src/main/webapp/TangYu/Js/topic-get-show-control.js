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
var paramters = getArgs()  // 存储url中的参数
var text = paramters.text

function getTopic(){
    $.ajax({
        url: "/findTopicByTextServlet",
        type: "post",
        dataType: "json",
        data: {
            text: text.replace(/[{}^_\|`\\]/g,"")
        },
        success:function (res){
            result_topic_list = res.topics;
            if(res.topics.length===0){
                alert("没有搜索到结果")
                if(user===0){
                    window.close()
                }else{
                    alert("/TangYu/html/uploadNoTopicPage.html?text="+text)
                    window.open("/TangYu/html/uploadNoTopicPage.html?text="+text,"_self")
                }
            }
            test_recommendation_list = res.tests;
            topic_recommendation_list = res.recommends
            showTopicList()
            showTestRecommendationList()
            showTopic(1)
        }
    })
}

//展示题目序号
function showTopicList(){
    var topicList_html = ""
    for (var i = 0; i < result_topic_list.length; i++) {
        topicList_html += "<div class='topic_no' >" +(i+1)+ "</div>"
    }
    $("#topicList").html(topicList_html)
    addControl_topic_no()
}
//控制题目切换
function addControl_topic_no(){
    $(".topic_no").click(function (e){
        //切换题目时隐藏答案
        $("#viewAnswer").html("<i class='bi bi-eye'></i>查看答案")
        $("#answer").css("display", "none")
        var self = $(e.target)
        var no = parseInt(self.text())
        showTopic(no)
    })
}

//接收题目序号 1,2,3...
//展示改题目 分支需要修改题目难度等
function showTopic(n){
    n=n-1
    topic_no = n
    var topic = result_topic_list[n]


    console.log(result_topic_list[n])
    $("#topicTitle").text(topic.topicTitle)  // 设置题目内容


    var options = JSON.parse(topic.topicOptions)  // 提出选项
    if(options.length>0){
        var options_html = ""
        for (var i = 0; i < options.length; i++) {
            options_html += "<p class='options'>"+ options[i].title +"、"+ options[i].main +"</p>"
        }
        $("#topicOptions").html(options_html)  // 设置选项内容
        $("#topicOptions").css("display","block")
    }else{
        $("#topicOptions").css("display","none")
    }

    MathJax.Hub.Queue(["Typeset", MathJax.Hub]);

    // 重置选择的序号
    $(".check_topic_no").removeClass("check_topic_no")
    $($(".topic_no")[n]).addClass("check_topic_no")
    // 显示题目的一些数据
    showTopicMessage(topic)
    showRecommendTopic(topic)
}
//显示题目时还要加载含有相同标签的题目
function showRecommendTopic(topic){
    var labels = topic.label
    var labelRegx = new RegExp(labels.replace(",","|"))
    var max = 4
    var html = "\n"
    for(var i=0;i<topic_recommendation_list.length&&max>0;i++){
        console.log(topic_recommendation_list[i].label+"  "+labelRegx.test(topic_recommendation_list[i].label))
        if(labelRegx.test(topic_recommendation_list[i].label)&&topic.topicId!==topic_recommendation_list[i].topicId){
            max--
            html = html +
"                   <div class=\"title\" onclick='toTheTopic(this)' thisTitle='"+ topic_recommendation_list[i].topicTitle +"'>\n" +
                topic_recommendation_list[i].topicTitle +
"                    </div>\n"
        }
    }
    if(max<=1){
        $("#testCenters").html(html)
        $("#testCentermain").css("display","block")
        setTimeout(function (){
            MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
        },100)
    }else {
        $("#testCentermain").css("display","none")
    }
}
function toTheTopic(e){
    var title = $(e).attr("thisTitle")
    title = title.replace(/[{}^_\|`]/g,"")
    window.open("topicResultPage.html?text="+title,"_self")
}
//只能通过showTopic调用
function showTopicMessage(topic){
    var n_answer = topic.answerNumber
    var n_answerOk = topic.answerOkNumber


    // 没有回答时
    if(n_answer==0){
        $("#difficulty").html(DifficultyStarhtml(3.5))
        $("#correctRate").html("还没有人做过")
    }// 按照大题正确率设置
    else{
        $("#difficulty").html(DifficultyStarhtml(1-n_answerOk/n_answer))
        // 设置正确率
        $("#correctRate").html("正确率："+n_answerOk/n_answer)
    }

}
//根据0-5分返回星级的html
function DifficultyStarhtml(n_star) {
    var fill_star = "<i class=\"bi bi-star-fill\"></i>"
    var half_star = "<i class=\"bi bi-star-half\"></i>"
    var star = "<i class=\"bi bi-star\"></i>"


    var html=""
    var floor = Math.ceil(n_star)
    while(n_star>1){
        n_star = n_star-1
        html += fill_star
    }
    if(n_star>=0.45){
        html += half_star
    }
    console.log(html)
    while(floor<5){
        floor++
        html += star
    }
    return html;
}


//加载题目的同时,加载推荐试卷
function showTestRecommendationList(){
    var html = "\n"
    for(var i=0;i<test_recommendation_list.length&&i<5;i++){
        html = html + "<div class='recommended_test' title='"+ test_recommendation_list[i].testName +"'>"+ test_recommendation_list[i].testName +"</div>\n"
    }
    console.log(html)
    $("#testPaperRecommendations").html(html)
}


//给显示答案添加事件
$("#viewAnswer").click(function (){
    var display_answer = $("#answer").css("display");
    if(display_answer==="block"){
        $("#answer").css("display","none")
        $("#viewAnswer").html("<i class='bi bi-eye'></i>查看答案")
    }
    else {
        showAnswer()
    }
})
// 显示答案，如果答案还未获取，则请求答案
function showAnswer(){
    var hasAnswer = result_topic_list[topic_no].topicAnswer
    if(hasAnswer!==""){
        $("#answer_main").html(result_topic_list[topic_no].topicAnswer)
        $("#explain_main").html(result_topic_list[topic_no].topicExplain)
        $("#answer").css("display","block")
        $("#viewAnswer").html("<i class='bi bi-eye-slash'></i>收起答案")

        setTimeout(function (){
            MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
        },100)
    }else{
        console.log(user)
        if (user==0)
            alert("还没有登录哦!!")

        $.ajax({
            url: "/readAnswerServlet",
            type: "post",
            dataType: "json",
            data: {topicId: result_topic_list[topic_no].topicId},
            success: function (res){
                // 如果拉取失败,提示
                if(!res.success){
                    alert(res.message)
                    return
                }
                userInitialization()
                result_topic_list[topic_no].topicAnswer=res.topicList[0].topicAnswer
                result_topic_list[topic_no].topicExplain=res.topicList[0].topicExplain
                $("#answer_main").html(result_topic_list[topic_no].topicAnswer)
                $("#explain_main").html(result_topic_list[topic_no].topicExplain)
                $("#answer").css("display","block")
                $("#viewAnswer").html("<i class='bi bi-eye-slash'></i>收起答案")
                setTimeout(function (){
                    MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
                },100)
            }
        })
    }
}