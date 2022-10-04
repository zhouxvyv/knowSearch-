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

$("#title").change(function (){
    $("#lastSearchImg").css("display","none")
    $("#titleInput").val($("#title").text())
})

$(".option_frame button").click(function (e){
    $(e.target).parent().remove()
    setTimeout(function (){
        var label = $(".option_frame label")
        for(var i=0;i<label.length;i++){
            var str = "ABCDEFGHIJKLMN"
            $(label[i]).text(str.charAt(i)+"、")
        }
    })
})

$("#add_option").click(function (){
    frashOptions()
    var options = $("#ls_option").html()
    options=options+"\n" +
        "                    <div class=\"option_frame\">\n" +
        "                        <label>A、</label>\n" +
        "                        <input type=\"text\" class=\"option\" name=\"option\">\n" +
        "                        <button>移除</button>\n" +
        "                    </div>";
    $("#ls_option").html(options)
    setTimeout(function (){
        showOptions()
        var label = $(".option_frame label")
        for(var i=0;i<label.length;i++){
            var str = "ABCDEFGHIJKLMN"
            $(label[i]).text(str.charAt(i)+"、")
            console.log(str.charAt(i)+"、"+i)
        }
    })
    setTimeout(function (){
        $(".option_frame button").click(function (e){
            var label = $(".option_frame label")
            $(e.target).parent().remove()
            setTimeout(function (){
                console.log(label[0])
                for(var i=0;i<label.length;i++){
                    var str = "ABCDEFGHIJKLMN"
                    $(label[i]).text(str.charAt(i)+"、")
                }
            })
        })
    },30)
})

$("#submit").click(function (){
    $("#uploadTopic").ajaxSubmit({
        url: "/uploadNoAnswerTopicServlet",
        type: "post",
        dataType: "json",
        success: function (data){
            console.log(data)
        }
    })
    setTimeout(function (){
        window.open("uploadNoAnswerTopic.html","_self")
    },500)
})

var values = []
function frashOptions(){
    values = []
    var optionItem = $(".option")
    for(var i=0;i<optionItem.length;i++){
        values.push($(optionItem[i]).val())
    }
    values.push("")
    console.log(values)
}
function showOptions(){
    var optionItem = $(".option")
    for(var i=0;i<optionItem.length;i++){
        $(optionItem[i]).val(values[i])
    }

}

getLastFindTopic()
function getLastFindTopic(){
    $.ajax({
        url: "/project/html/record.do",
        type: "post",
        dataType: "json",
        data: { num: 0},
        success: function (data){
            console.log(data)
            if(data.list[0]){
                var longTime = new Date().getTime()-new Date(data.list[0].time).getTime()
                if(longTime<1000*60*3)
                showLastSearch(data.list[0])
                else setTimeout(function (){
                    showCheckTopic(topics[0])
                    $($(".noTopic")[0]).addClass("check")
                },600)
            }
        }
    })
}
// 显示最后查找的内容
function showLastSearch(search){
    $("#title").text(search.title)
    $("#lastSearchImg").attr("src",search.image)
    $("#titleInput").val(search.title)
}


var topics = ""
getMyNoAnswerTopic()
function getMyNoAnswerTopic(){
    $.ajax({
        url: "/getMyNoAnswerServlet",
        type: "post",
        dataType: "json",
        data: "",
        success: function (data){
            console.log(data)
            showNoTopic(data.list)
            topics = data.list;
        }
    })
}
function showNoTopic(list){
    var topicsh = $("#ls_last").html()
    $.map(list,function (item, index){
        topicsh = topicsh+ "\n" +
            "            <div class=\"noTopic\">\n" +
            "                <img src=\""+item.topicImage+"\" alt=\"\">\n" +
            "                <p topicId='"+item.topicId+"'>"+ item.topicTitle +"</p>\n" +
            "                <t>"+ item.type +"</t>\n" +
            "                <div topicId='"+item.topicId+"'>移除</div>" +
            "            </div>"
    })
    $("#ls_last").html(topicsh)
    setTimeout(function (){
        $(".noTopic div").click(function (e){
            $(e.target).parent(".noTopic").remove()
            $.ajax({
                url: "/removeNoAnswerTopicServlet",
                type: "post",
                dataType: "json",
                data: {
                    topicId: $(e.target).attr("topicId")
                },
                success: function (data){
                    console.log(data)
                }
            })
        })
        $(".noTopic p").click(function (e){
            $("#lastSearchImg").remove()
            var showTopicId = parseInt($(e.target).attr("topicId"))
            for(var i=0;i<topics.length;i++){
                if(topics[i].topicId==showTopicId){
                    showCheckTopic(topics[i])
                    console.log(topics[i])
                }
            }
            $(".noTopic").removeClass("check")
            $($(e.target)).parent(".noTopic").addClass("check")

        })
    })
}
function showCheckTopic(topic){
    $("#titleInput").val(topic.topicTitle)
    $("#title").text(topic.topicTitle)
    $("#lastSearchImg").attr("src",topic.tipicImage)
    var optionsHtml = ""
    for(var i=0;i<topic.optionls.length;i++){
        optionsHtml = optionsHtml+"\n" +
            "                    <div class=\"option_frame\">\n" +
            "                        <label>A、</label>\n" +
            "                        <input type=\"text\" class=\"option\" name=\"option\">\n" +
            "                        <button>移除</button>\n" +
            "                    </div>"
    }
    $("#ls_option").html(optionsHtml)
    values=topic.optionls
    $("#topicId").val(topic.topicId)
    showOptions()
    $(".option_frame button").click(function (e){
        var label = $(".option_frame label")
        $(e.target).parent().remove()
        setTimeout(function (){
            console.log(label[0])
            for(var i=0;i<label.length;i++){
                var str = "ABCDEFGHIJKLMN"
                $(label[i]).text(str.charAt(i)+"、")
            }
        })
    })
    setTimeout(function (){
        var label = $(".option_frame label")
        console.log(label[0])
        for(var i=0;i<label.length;i++){
            var str = "ABCDEFGHIJKLMN"
            $(label[i]).text(str.charAt(i)+"、")
        }
    })

    showTopicAllAnswer(topic.topicId)
}
function showTopicAllAnswer(topic_id){
    $.ajax({
        url: "/getAnswerOfNoTopicServlet",
        type: "post",
        dataType: "json",
        data: {
            topicId: topic_id
        },
        success: function (data){
            showAnswer(data)
        }
    })
}
function showAnswer(answers){
    var answersh = ""
    $.map(answers,function (item,index){
        answersh = answersh+"\n" +
            "            <div class=\"answer\">\n" +
            "                <div>答案"+index+"</div>\n" +
            "                <p>"+item.answer+"</p>\n" +
            "                <img src=\""+item.image+"\" alt=\"\">\n" +
            "            </div>"
    })
    $("#answers").html(answersh)
}

