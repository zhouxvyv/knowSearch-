var paperList = new Array(30);
var cnt = 1;

function creatQue(ID, description, type,times, state, uploadDate) {
    this.ID = ID;
    this.description = description;
    this.type=type;
    this.times = times;
    this.state = state;
    this.uploadDate = uploadDate;
    return this;
}

creatQue.prototype = {
    initFullTable: function () {
        var fullStr = '<tr class="ui-state-default">\n' +
            '                                    <td id="' + this.ID + '">' + this.ID + '</td>\n' +
            '                                    <td id="info' + this.ID + '" class="queInfoManage">' + this.description + '</td>\n' +
            '                                    <td id="type' + this.ID + '" style="text-align: center">' + this.type + '</td>\n'+
            '                                    <td style="text-align: center">' + this.times + '</td>';
        //state==1 已上线
        //state==0 停用
        if (this.state === 1) {
            fullStr += ' <td style="text-align: center"><span style="text-align: center" class="zhifou-dot dot-online"></span> 已上线</td>';
        } else {
            fullStr += '<td style="text-align: center"><span style="text-align: center" class="zhifou-dot dot-offline"></span> 停用</td>';
        }
        fullStr += '                                    <td style="text-align: center">\n' +
            '                                        <a class="opBtn" id="preview' + this.ID + '" onclick="message(' + this.ID + ')" style="padding-left: 10px">预览</a>\n' +
            '                                        <a class="opBtn" id="Add' + this.ID + '" onclick="addToPaperList(' + this.ID + ')" style="padding-left: 10px">添加</a>\n' +
            '                                    </td>\n' +
            '                                </tr>';
        $("#tbodyMain").append(fullStr);
    }
}

function addToPaperList(id) {
    var str = this.initNewTable(id);
    /*var a="#info"+id;
    var str=$(a).html();*/
    $("#tbodyNew").append(str);
    setTimeout(function () {
        MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
    }, 300);
    var aStr = "#Add" + id;
    var seqStr = '<tr id="seq' + cnt + '">\n' +
        '    <td>' + cnt + '</td>\n' +
        '</tr>';
    $("#tbodySEQ").append(seqStr);

    $(aStr).attr("disabled", true).css("pointer-events", "none");
    $(aStr).addClass("disableA");

    $("#initPreviewPaper").css("display", "block");
    cnt++;


}

function initNewTable(id) {
    var infoStr = "#info" + id;
    var typeStr="#type"+id;
    var newStr = '<tr id="queListTarget' + id + '">\n' +
        '                                                    <td class="queType">' + $(typeStr).text() + '</td>\n' +
        '                                                    <td class="queInfoManage">' + $(infoStr).text() + '</td>\n' +
        '                                                    <td>\n' +
        '                                                        <a onclick="deleteQue(' + id + ')" style="padding-left: 10px;" class="classRed">移除</a>\n' +
        '                                                    </td>\n' +
        '                                                </tr>'
    return newStr;
}

function deleteQue(id) {
    var str = "#queListTarget" + id;
    var aStr = "#Add" + id;
    $(str).remove();
    $(aStr).attr("disabled", false);
    $(aStr).css("pointer-events", "auto");
    $(aStr).removeClass("disableA");
    cnt--;
    var seqStr = "#seq" + cnt;
    $(seqStr).remove();
    if (cnt <= 1) {
        $("#initPreviewPaper").css("display", "none");
    }
    /*console.log($(obj).parent().parent()[0].$(".IDTarget").text);
    $(obj).parent().parent().parent()[0].removeChild($(obj).parent().parent()[0]);
    $(obj).removeClass()*/
}

function message(id) {
    var info = "#info" + id;
    PostbirdAlertBox.alert({
        'title': '提示',
        'content': '' + $(info).text() + '',
        'okBtn': '好的',
        'contentColor': '#6C767D',
        'onConfirm': function () {
            console.log("回调触发后隐藏提示框");

        }

    });

}

$(function () {
    //去首页
    to_page(1);
});

function to_page(pn) {
    $.ajax({
        url: "/selectBGQuesServlet",
        data: "pn=" + pn,
        type: "GET",
        success: function (result) {
            var data = result.page.list;
            console.log(data);
            for (var i = 0; i < data.length; i++) {
                var Que = new creatQue(data[i].topicId, data[i].topicTitle, data[i].topicType,data[i].searchTimes, data[i].state, data[i].uploadDate)
                Que.initFullTable();
            }
            setTimeout(function () {
                MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
            }, 300);
            //console.log(result);
            //显示分页信息
            build_page_info(result);
            //显示分页导航栏
            build_page_nav(result);
        }
    });
}

function build_page_info(result) {
    console.log(result.page);
    $("#page_info_area").empty();
    $("#page_info_area").append("当前" + (result.page.nextPage - 1) +
        "页,总" + result.page.lastPage +
        "页")
}

function build_page_nav(result) {
    $("#page_nav_area").empty();
    var ul = $("<ul></ul>").addClass("pagination");
    var firstPageLi = $("<li class=\"page-item\"></li>").append($("<a class=\"page-link\"></a>").append("首页").attr("onlclick", "initNewPage()"));
    var prePageLi = $("<li class=\"page-item\"></li>").append($("<a class=\"page-link\"></a>").append("«"));
    //当为第一页时，首页导航栏禁用
    if (result.page.hasPreviousPage == false) {
        firstPageLi.addClass("disabled");
        prePageLi.addClass("disabled");
    } else {
        firstPageLi.click(function () {
            to_page(1);
        });
        prePageLi.click(function () {
            to_page(result.page.prePage);
        });
    }
    var nextPageLi = $("<li class=\"page-item\"></li>").append($("<a class=\"page-link\"></a>").append("»"));
    var lastPageLi = $("<li class=\"page-item\"></li>").append($("<a class=\"page-link\"></a>").append("末页").attr("onlclick", "initNewPage()"));
    //当为最后一页时，末页禁用
    if (result.page.hasNextPage == false) {
        nextPageLi.addClass("disabled");
        lastPageLi.addClass("disabled");
    } else {
        nextPageLi.click(function () {
            $("#tbodyMain").empty();
            to_page(result.page.nextPage);
        });
        lastPageLi.click(function () {
            $("#tbodyMain").empty();
            to_page(result.page.pages);
        });
    }
    ul.append(firstPageLi).append(prePageLi);

    $.each(result.page.navigatepageNums, function (index, ele) {
        var navPageLi = $("<li class=\"page-item\"></li>").append($("<a class=\"page-link\"></a>").append(ele).attr("onlclick", "initNewPage()"));
        //让当前页码高亮显示
        if (result.page.pageNum == ele) {
            navPageLi.addClass("active");
        }
        navPageLi.click(function () {
            $("#tbodyMain").empty();
            to_page(ele);
        });
        ul.append(navPageLi);
    });

    ul.append(nextPageLi).append(lastPageLi);
    var navPage = $("<nav></nav>").append(ul);
    navPage.appendTo("#page_nav_area");
}

function initPreviewPaper() {
    var a = $("#tbodyNew").children();
    $.each(a, function (i) {
        var str = a[i].id;
        str = str.substring(13);
        paperList[i] = str;
    })
    $.ajax({
        url: "/queryByQueIdServlet",
        data: {paperList: paperList},
        success: function (result) {
            $("#page1").css("display", "none");
            $("#infoTarget").append(initPaperInfo());
            $("#queTarget2").append(initPaperView(result));
            mathJaxTimeout();
            $("#num1").removeClass("number_cur");
            $("#num2").addClass("number_cur");
            $("#page2").css("display", "block");
        }
    })
}

var queSeqCnt = 1;

function initPaperView(result) {
    var queList = result.queList;
    var str = '';
    queList.map(function (item, index) {
        str += '<div class="clearfix">\n' +
            '    <i class="que-li" id="que_' + queSeqCnt + '">' + queSeqCnt + '</i>';
        if (item.topicType === "单选题") {
            str += '    <i class="que-type">[ 单选题 ]</i>';
        } else if (item.topicType === "问答题") {
            str += '    <i class="que-type">[ 问答题 ]</i>';
        } else {
            str += '    <i class="que-type">[ 多选题 ]</i>';
        }

        str += '    <div class="clearfix que-que formula" style="line-height: 35px;padding-right: 15px">\n' +
            '        <p class="que-main">' + item.topicTitle + '</p>\n' +
            '    </div>\n' +
            '</div>\n' +
            '<div class="clearfix">\n' +
            '    <ul class="fl" style="padding-left: 10px">';
        var obj = JSON.parse(item.topicOptions);

        $.each(obj, function (i, index2) {
            str += '<li>\n' +
                '            <label class="fl before">\n' +
                '                <div>\n' +
                '                    &nbsp;&nbsp;' + index2.title + '&nbsp;&nbsp;' + index2.main + '\n' +
                '                </div>\n' +
                '            </label>\n' +
                '            <div class="clear"></div>\n' +
                '        </li>'
        });
        str += '    </ul>\n' +
            '</div>';
        str += '<br>'
        queSeqCnt++;
    })
    return str;
}

function initPaperInfo() {
    var str ='';
    if($("#paperName").val().replace(/\s*/g,"")===''){
        str+='            <div id="queType" class="ans" style="width: 90%;margin-left: 20px"><span style="font-weight: bolder">试卷名&nbsp;：&nbsp;&nbsp;&nbsp;</span><span style="color: #c45549;font-weight: bolder"><i class="fa fa-exclamation-triangle" aria-hidden="true"></i> 您尚未输入试卷名，请返回编辑页面</span></div>';
    }else{
        str+=        '<div id="queName2" class="ans" style="width: 90%;margin-left: 20px"><span style="font-weight: bolder">试卷名&nbsp;：&nbsp;&nbsp;&nbsp;</span>' + $("#paperName").val() + '</div>';
    }
    str+= '    <div id="subject" class="ans" style="width: 90%;margin-left: 20px;margin-top: 10px"><span style="font-weight: bolder">学科&nbsp;：&nbsp;&nbsp;&nbsp;</span>高等数学</div>\n' +
        '    <div id="difficulty" class="ans" style="width: 90%;margin-left: 20px;margin-top: 10px"><span style="font-weight: bolder">难度&nbsp;：&nbsp;&nbsp;&nbsp;</span>中等</div>';
    return str;

}

function mathJaxTimeout() {
    setTimeout(function () {
        MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
    }, 300);
}

function backStep1() {
    $("#page2").css("display", "none");
    $("#page1").css("display", "block");
    $("#queTarget2").empty();
    $("#infoTarget").empty();
    $("#num1").addClass("number_cur");
    $("#num2").removeClass("number_cur");
    queSeqCnt = 1;
}
function nextStep2(){
    var paperName=$("#paperName").val();

    $.ajax({
        url: "/insertPaperServlet",
        data: {
            'paperList': paperList,
            paperName: paperName,
        },
        success: function (result) {
            $("#page2").css("display", "none");
            var infoStr=initFinalPaperInfo(result)
            $("#finalPaperInfo").append(infoStr);
            $("#page3").css("display", "block");
            $("#num3").addClass("number_cur");
            $("#num2").removeClass("number_cur");
        }
    })
}
function getNow(Mytime) { return Mytime < 10 ? '0' + Mytime : Mytime; }
function initFinalPaperInfo(result){
    var myDate = new Date();
    var year = myDate.getFullYear();
    var month = myDate.getMonth() + 1;
    var date = myDate.getDate();
    var h = myDate.getHours();
    var m = myDate.getMinutes();
    var s = myDate.getSeconds();
    var Now = year + '-' + getNow(month) + "-" + getNow(date) + " " + getNow(h) + ':' + getNow(m) + ":" + getNow(s);
    var str='<div id="info" class="ans" style="width: 90%;margin-left: 20px"><span style="font-weight: bolder">试卷识别信息&nbsp;：&nbsp;&nbsp;&nbsp;</span>'+$("#paperName").val()+'·高等数学·中等难度</div>\n' +
        '                            <div id="queId" class="ans" style="width: 90%;margin-left: 20px;margin-top: 10px"><span style="font-weight: bolder">试卷编号&nbsp;：&nbsp;&nbsp;&nbsp;</span>'+result+'</div>\n' +
        '                            <div id="operator" class="ans" style="width: 90%;margin-left: 20px;margin-top: 10px"><span style="font-weight: bolder">管理员编号&nbsp;：&nbsp;&nbsp;&nbsp;</span>10011</div>\n' +
        '                            <div id="insertDate" class="ans" style="width: 90%;margin-left: 20px;margin-top: 10px"><span style="font-weight: bolder">添加时间&nbsp;：&nbsp;&nbsp;&nbsp;</span>'+Now+'</div>'
    return str;
}

function backToPage1(){
    location.reload();
}