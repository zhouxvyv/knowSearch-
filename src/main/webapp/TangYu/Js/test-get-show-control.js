function getTestList(pageIndex){
    console.log(paramters.text)
    $.ajax({
        url: "/getTestPaperServlet.servlet",
        type: "post",
        dataType: "json",
        data: {
            text: paramters.text,
            pageIndex: pageIndex,
            pageSize: 10
        },
        success: function (res){
            console.log(res)
            countTest = res.testCount
            nowTestList = res.testList
            showPaginationPlugin()
            getCollectionTest()
        }
    })
}
function getCollectionTest(){
    $.ajax({
        url: "/getLikeTestServlet",
        type: "post",
        dataType: "json",
        data: {},
        success: function (res){
            collectionList = res.testIdList
            showPageMain(1)
        }
    })
}
function reloadCollectionTest(){
    $.ajax({
        url: "/getLikeTestServlet",
        type: "post",
        dataType: "json",
        data: {},
        success: function (res){
            collectionList = res.testIdList
        }
    })
}
function showPageMain(pageIndex) {
    $("#testResultList").css("display","none")
    $("#pageController").css("display","none")
    $("#loading").css("display","block")

    $.ajax({
        url: "/getTestPaperServlet.servlet",
        type: "post",
        dataType: "json",
        data: {
            text: paramters.text,
            pageIndex: pageIndex,
            pageSize: 10
        },
        success: function (res){
            console.log(res)
            var result_topic_list = res.topics
            countTest = res.testCount
            nowTestList = res.testList
            var html = "\n"
            var i=0
            for(;i<nowTestList.length;i++){
                html = html +
                    "                    <div class=\"test\" testName='"+nowTestList[i].testName+"' testId='"+ nowTestList[i].testId +"'>\n"

                if (hasCollect(nowTestList[i].testId)){
                    html = html + "                        <div>已收藏</div>\n"
                }else {
                    html = html + "                        <div>收藏</div>\n"
                }


                html = html +
                    "                        <span>"+ nowTestList[i].testName +"</span>\n" +
                    "                    </div>\n"


                if (nowTestList[i].topicId>0){
                    var hasTopic
                    for(var j=0;j< result_topic_list.length;j++){
                        if(result_topic_list[j].topicId===nowTestList[i].topicId){
                            hasTopic = result_topic_list[j]
                        }
                    }
                    html = html + "<div class='topic'>"+ nowTestList[i].topicNo+"、 "+hasTopic.topicTitle+"</div>"
                }
            }
            if(i<10)
                html = html+
"                    <div style=\"width: 100%;height: 40px;text-align: center;line-height: 60px;background: none;color: #cccccc\">\n" +
"                        没有更多了...\n" +
"                    </div>\n"
            $("#testResultList").html(html)
            $("#testResultList").css("display","block")
            $("#pageController").css("display","block")
            $("#loading").css("display","none")

            // 给试卷添加点击的事件
            $(".test div").click(function (e){
                console.log($(e.target).parent().attr("testId"))
                if(user===undefined) {
                    alert("请先登录")
                    return
                }
                $.ajax({//
                    url: "/turnLikeServlet",
                    type: "post",
                    dataType: "json",
                    data: {
                        testId: $(e.target).parent().attr("testId")
                    },
                    success: function (res){
                        if(res.success)
                            $(e.target).text(res.message)
                        reloadCollectionTest()
                    }
                })
            })
            $(".test span").click(function (e){
                window.open("examPage.html?testId="+$(e.target).parent().attr("testId")+"&testName="+$(e.target).parent().attr("testName"))
            })

            setTimeout(function (){
                MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
            },100)
            console.log(res)
        }
    })
}
function hasCollect(nowId){
    for(var i=0;i<collectionList.length;i++){
        if(nowId===collectionList[i].testId) return true
    }
    return false
}