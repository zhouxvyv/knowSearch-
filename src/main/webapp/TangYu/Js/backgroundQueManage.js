var cnt = 0;
var queList = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I']
var queType = '2';
var tmp = '';
var amount = 4;
var staticAmount = 4;
var interruptTarget = -1;
var curGuiedInfo;
var queDescrption = '';
var queOptionList = [];
var queAns = '';
var queExplaination = '';
var queId = '';
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
                var Que = new creatQue(data[i].topicId, data[i].topicTitle, data[i].topicType, data[i].searchTimes, data[i].state, data[i].uploadDate)
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

function creatQue(ID, description, type, times, state, uploadDate) {
    this.ID = ID;
    this.description = description;
    this.type = type;
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
            '                                    <td id="type' + this.ID + '" style="text-align: center">' + this.type + '</td>\n' +
            '                                    <td style="text-align: center">' + this.times + '</td>';
        //state==1 已上线
        //state==0 停用
        if (this.state === 1) {
            fullStr += ' <td id="state'+this.ID+'" style="text-align: center"><span style="text-align: center" class="zhifou-dot dot-online"></span> 已上线</td>';
        } else {
            fullStr += '<td id="state'+this.ID+'" style="text-align: center"><span style="text-align: center" class="zhifou-dot dot-offline"></span> 停用</td>';
        }
        fullStr += '                                    <td id="op'+this.ID+'" style="text-align: center">\n' +
            '                                        <a href="#" id="preview' + this.ID + '" onclick="opQueWithID(' + this.ID + ')" style="padding-left: 10px">修改</a>';
        if(this.state===1){
            fullStr+='<a href="#" id="preview' + this.ID + '" onclick="setTestState1(' + this.ID + ')" style="padding-left: 10px;color: red">停用</a>';
        }else{
            fullStr+='<a href="#" id="preview' + this.ID + '" onclick="setTestState0(' + this.ID + ')" style="padding-left: 10px;color: #0ea759">上线</a>';
        }
        fullStr+='                                    </td>\n' +
            '                                </tr>';
        $("#tbodyMain").append(fullStr);
    }
}
$(function () {
    $("#amountRange").on("input", function () {
        //在输入框中打印输入的值
        $("#amountResult").text($(this).val());
        tmp = $('input[type=range][id=amountRange]').val();
        amount = parseInt(tmp);
        staticAmount = amount;
    });
    $("input[id='inlineRadio8']").change(function () {//监听题目类型radio
        var ansTmp = $('input[type=radio][id="inlineRadio8"]:checked').val();
        if (ansTmp === '1') {
            $("#choiceAmount").css("display", "none");
            queType = '1';
        } else if (ansTmp === '2') {
            $("#choiceAmount").css("display", "block");
            queType = '2'
        }

    })
    $("input[id='inlineRadio7']").change(function () {//监听题目类型radio
        var ansTmp = $('input[type=radio][id="inlineRadio7"]:checked').val();
        if (ansTmp === '1') {
            $("#choiceAmount").css("display", "none");
            queType = '1';
        } else if (ansTmp === '2') {
            $("#choiceAmount").css("display", "block");
            queType = '2'
        }
    })

});

function a() {
    var find1 = $("#cke_body").find("iframe").contents().find("body");
    var document1 = find1.html();
    var str = '<div id="queInfo' + cnt + '" class="test" style="width:90%;margin-left: 4%;margin-bottom: 10px;font-size: 16px;color: #6C757D;padding:20px;border: 1px solid #d5d5da">';
    str += document1;
    str += '</div>'
    var btnDiv = "<div class='test' style=\"float:right;margin-top: 0px;\">\n" +
        "                            <button id=\"btnRefac" + (cnt + 1) + "\" onclick=\"deleteType2(" + (cnt + 1) + ")\" style=\"margin-top: 0px;margin-right: 6%;width: 40px;height:25px;background-color: #cc544e;color: #FFFFFF;border: 0px;float: right;border-radius: 0.3rem;font-weight: bolder;\n" +
        "                            \">修改\n" +
        "                            </button>\n" +
        "                        </div>"
    if (queType === '2' && amount > 0) {
        $("#quesMain").append(btnDiv)
        if (cnt === 0) {
            $("#quesMain").append(str);
            $("#quesMain").append("<div id='guiedInfo" + cnt + "' class='test info_before' >请输入选项" + queList[cnt] + "</div>")
            $("#btnAppend").text("保存选项内容");
            $("#descriptionInfo").text("题目描述预览 ：");
            $("#descriptionInfo").addClass("info_after");
            $("#cke_body").find("iframe").contents().find("body").text("");
            queDescrption = readDocument(document1);
            cnt++;
        } else {
            $("#amountRange").prop('disabled', true);
            $("#quesMain").append(str);
            $("#quesMain").append("<div name='option' id='guiedInfo" + cnt + "' class='test info_before' style=\"margin-left: 4%;margin-bottom: 10px;font-size: 16px;\">请输入选项" + queList[cnt] + "</div>")
            $("#btnAppend").text("保存选项内容");
            var curGuiedId = "#guiedInfo" + (cnt - 1);
            var info = "选项" + queList[cnt - 1] + "预览 ： ";
            $(curGuiedId).text(info)
            $(curGuiedId).addClass("info_after")
            $("#cke_body").find("iframe").contents().find("body").text("");
            cnt++;
            amount--;
            if (amount <= 0) {
                $("#quesMain .test").last().text("请输入题目答案");
                $("#quesMain .test").last().add('name', 'ans')
            }
            queOptionList[cnt - 1] = readDocument(document1);
        }
    } else if (amount == 0) {
        $("#quesMain").append(btnDiv)
        $("#quesMain").append(str);
        $("#quesMain").append("<div name='exp' id='guiedInfo" + cnt + "' class='test info_before' >请输入题目解析</div>")
        $("#btnAppend").text("保存选项内容");
        var curGuiedId = "#guiedInfo" + (cnt - 1);
        var info = "答案预览 ： ";
        $(curGuiedId).text(info)
        $(curGuiedId).addClass("info_after")
        $("#cke_body").find("iframe").contents().find("body").text("");
        cnt++;
        amount--;
        queAns = readDocument(document1);
    } else if (amount == -1) {
        $("#quesMain").append(btnDiv)
        $("#quesMain").append(str);
        $("#btnAppend").text("保存选项内容");
        var curGuiedId = "#guiedInfo" + (cnt - 1);
        var info = "解析预览 ： ";
        $(curGuiedId).text(info)
        $(curGuiedId).addClass("info_after")
        $("#cke_body").find("iframe").contents().find("body").text("");
        cnt++;
        amount--;
        queExplaination = readDocument(document1);

    }
    window.scrollTo(0, document.documentElement.clientHeight);
}//end function a

function interrupt() {
    var targetId = "#guiedInfo" + (interruptTarget - 1);
    var guiedInfoId = "#guiedInfo" + interruptTarget;
    var queInfoId = "#queInfo" + interruptTarget;
    var find1 = $("#cke_body").find("iframe").contents().find("body");
    var document1 = find1.html();
    var str = '<div id="queInfo' + interruptTarget + '" class="test" style="width:90%;margin-left: 4%;margin-bottom: 10px;font-size: 16px;color: #6C757D;padding:20px;border: 1px solid #d5d5da">';
    var btnString = "<div class='test' style=\"float:right;margin-top: 0px;\">\n" +
        "                            <button id=\"btnRefac" + (interruptTarget + 1) + "\" onclick=\"deleteType2(" + (interruptTarget + 1) + ")\" style=\"margin-top: 0px;margin-right: 6%;width: 40px;height:25px;background-color: #cc544e;color: #FFFFFF;border: 0px;float: right;border-radius: 0.3rem;font-weight: bolder;\n" +
        "                            \">修改\n" +
        "                            </button>\n" +
        "                        </div>";
    str += document1;
    str += '</div>'
    $(queInfoId).remove();
    if (interruptTarget !== 0 && (interruptTarget - 1) < staticAmount) {
        $(targetId).removeClass("info_warrning");
        var info = "选项" + queList[interruptTarget - 1] + "预览 ： ";
        $(targetId).text(info)
        $(str).insertAfter(targetId);
        $(btnString).insertAfter(targetId)
        queOptionList[interruptTarget] = readDocument(document1);
    } else if (interruptTarget === 0) {
        $("#descriptionInfo").removeClass("info_warrning");
        $("#descriptionInfo").text("题目描述预览 ：");
        $(str).insertAfter("#descriptionInfo");
        $(btnString).insertAfter("#descriptionInfo")
        queDescrption = readDocument(document1);
    } else if ((interruptTarget - 1) === staticAmount) {
        $(targetId).removeClass("info_warrning");
        var info = "答案预览 ： ";
        $(targetId).text(info)
        $(str).insertAfter(targetId);
        $(btnString).insertAfter(targetId)
        queAns = readDocument(document1);
    } else {
        $(targetId).removeClass("info_warrning");
        var info = "解析预览 ： ";
        $(targetId).text(info)
        $(str).insertAfter(targetId);
        $(btnString).insertAfter(targetId)
        queExplaination = readDocument(document1);
    }
    $("#cke_body").find("iframe").contents().find("body").text("");
    $("#btnAppend").removeAttr("onclick");
    $("#btnAppend").attr("onclick", "a()");
}

function deleteQue() {
    $("#quesMain .test").last().remove();
    $("#quesMain .test").last().remove();
    $("#cke_body").find("iframe").contents().find("body").text("");
    if (cnt !== 0) {
        cnt--;
    }
}

function deleteType2() {
    interruptTarget = parseInt(arguments[0]) - 1;
    var id = '#btnRefac' + arguments[0];
    var queInfoId = "#queInfo" + interruptTarget;
    var preGUiedId = "#guiedInfo" + (interruptTarget - 1);
    curGuiedInfo = $(preGUiedId).text();
    $(queInfoId).addClass("info_changing");

    $(id).remove();
    if (interruptTarget !== 0 && (interruptTarget - 1) < staticAmount) {
        var tmpGUiedInfo = "正在修改选项" + queList[interruptTarget - 1] + "，请输入";
        $(preGUiedId).addClass("info_warrning");
        $(preGUiedId).text(tmpGUiedInfo)
        $("#btnAppend").removeAttr("onclick");
        $("#btnAppend").attr("onclick", "interrupt()");
    } else if (interruptTarget === 0) {
        $("#descriptionInfo").addClass("info_warrning");
        $("#descriptionInfo").text("正在修改题目描述，请输入");
        $("#btnAppend").removeAttr("onclick");
        $("#btnAppend").attr("onclick", "interrupt()");
    } else if ((interruptTarget - 1) === staticAmount) {
        var tmpGUiedInfo = "正在修改答案内容，请输入";
        $(preGUiedId).addClass("info_warrning");
        $(preGUiedId).text(tmpGUiedInfo)
        $("#btnAppend").removeAttr("onclick");
        $("#btnAppend").attr("onclick", "interrupt()");
    } else {
        var tmpGUiedInfo = "正在修改答案解析，请输入";
        $(preGUiedId).addClass("info_warrning");
        $(preGUiedId).text(tmpGUiedInfo)
        $("#btnAppend").removeAttr("onclick");
        $("#btnAppend").attr("onclick", "interrupt()");
    }
    var userInputInfo = $(queInfoId).html();
    $("#cke_body").find("iframe").contents().find("body").html(userInputInfo);
    window.scrollTo(0, document.documentElement.clientHeight);
}

function readDocument(dmt) {
    dmt = dmt.replace(/<img( class=\"([^\"]*)\")?( style=\"([^\"]*)\")?( data-cke-saved-src=\"([^\"]*)\")?( src=\"([^\"]*)\")? data-latex=\"([^\"]*)\">/g, "`$9`")
    dmt = dmt.replace(/<.r>/, "")
    return dmt;
}

function nextStep1() {
    var opCnt = 0;
    console.log(cnt);

    console.log(queDescrption);
    console.log(queOptionList);
    console.log(queAns);
    console.log(queExplaination);
    var queTypeStr='<span style="font-weight: bolder">类型&nbsp;：&nbsp;&nbsp;&nbsp;</span>'+queType;
    $("#queType").empty();
    $("#queType").append(queTypeStr);
    $("#page1").css("display", "none");
    initOverview();
    $("#page2").css("display", "block")
    $("#num2").addClass("number_cur");
    $("#num1").removeClass("number_cur");
    document.body.scrollTop = document.documentElement.scrollTop = 0;
}

function backStep1() {
    $("#page2").css("display", "none")
    recoverOverview();
    $("#page1").css("display", "block");
    $("#num1").addClass("number_cur");
    $("#num2").removeClass("number_cur");
    document.body.scrollTop = document.documentElement.scrollTop = 0;
}

function recoverOverview() {
    $("#queOptions").empty();
    $("#queAns").empty();
    $("#queexplain").empty();
}

function initOverview() {
    $("#queDescription").text(queDescrption);
    $("#queOptions").empty();
    for (var i = 1; i < queOptionList.length; i++) {
        var str = '<div id="option' + i + '" class="option"><span>' + queList[i - 1] + '.</span>' + queOptionList[i] + '</div>';
        $("#queOptions").append(str);
    }
    var ans = '<span style="font-weight: bolder">答案&nbsp;：&nbsp;&nbsp;&nbsp;</span>' + queAns;
    var explaination = '<span style="font-weight: bolder">解析&nbsp;：&nbsp;&nbsp;&nbsp;</span>' + queExplaination;
    $("#queAns").append(ans);
    $("#queexplain").append(explaination);
    mathJaxTimeout();
}

function creatOption(title, main) {
    var option = '{"title":”' + title + '“,"main":”' + main + '“}'
    return option;
}

function nextStep2() {

    opicOptions = '[';
    for (var i = 1; i < queOptionList.length; i++) {
        opicOptions += creatOption(queList[i - 1], queOptionList[i]);
        if (i + 1 < queOptionList.length)
            opicOptions += ',';
    }
    opicOptions += ']';
    console.log(opicOptions);
    $.ajax({
        url: "/updateTopicServlet.servlet",
        data: {
            topicId: queId,
            topicTitle: queDescrption,
            topicType: queType,
            topicOption: opicOptions,
            topicAnswer: queAns,
            topicExplain: queExplaination,
            topicSource: 'www.ZHIFOU.com',
            imgs: '',
            state: '1',
            label: '1',
        },
        success: function (result) {
            $("#page2").css("display", "none");
            var infoStr = initFinalQueInfo(result)
            $("#finalInfo").empty();
            $("#finalInfo").append(infoStr);
            $("#page3").css("display", "block");
            $("#num3").addClass("number_cur");
            $("#num2").removeClass("number_cur");
        }
    })

}

function getNow(Mytime) {
    return Mytime < 10 ? '0' + Mytime : Mytime;
}

function initFinalQueInfo(result) {
    var myDate = new Date();
    var year = myDate.getFullYear();
    var month = myDate.getMonth() + 1;
    var date = myDate.getDate();
    var h = myDate.getHours();
    var m = myDate.getMinutes();
    var s = myDate.getSeconds();
    var Now = year + '-' + getNow(month) + "-" + getNow(date) + " " + getNow(h) + ':' + getNow(m) + ":" + getNow(s);
    var str = '<div id="info" class="ans" style="width: 90%;margin-left: 20px"><span style="font-weight: bolder">题目识别信息&nbsp;：&nbsp;&nbsp;&nbsp;</span>' + queType + '·高等数学·中等难度</div>\n' +
        '                            <div id="queId" class="ans" style="width: 90%;margin-left: 20px;margin-top: 10px"><span style="font-weight: bolder">题目编号&nbsp;：&nbsp;&nbsp;&nbsp;</span>' + queId + '</div>\n' +
        '                            <div id="operator" class="ans" style="width: 90%;margin-left: 20px;margin-top: 10px"><span style="font-weight: bolder">管理员编号&nbsp;：&nbsp;&nbsp;&nbsp;</span>10011</div>\n' +
        '                            <div id="insertDate" class="ans" style="width: 90%;margin-left: 20px;margin-top: 10px"><span style="font-weight: bolder">修改时间&nbsp;：&nbsp;&nbsp;&nbsp;</span>' + Now + '</div>'
    return str;
}


function deleteQue() {
    PostbirdAlertBox.prompt({
        'title': '您正在删除题目，请输入管理员密码验证身份',
        'okBtn': '提交',
        'contentColor': 'red',
        onConfirm: function (data) {
            console.log("输入框内容是：" + data);
            alert("输入框内容是：" + data);
        },

    });
}

function opQueWithID(ID) {
    queId = ID;
    $("#operation").html(opHtml);
    $.ajax({
        url: "/readAnswerServlet",
        data: {
            topicId: ID
        },
        success: function (result) {
            var str = initQueMain(result);
            $("#quesMain").empty();
            $("#quesMain").append(str);
            str = queInfo(result);
            $("#firstQueInfo").empty();
            $("#firstQueInfo").append(str);
            mathJaxTimeout();
        }
    })
    $("#main").css("display", "none");
    amount = -2;
    cnt = 7;
    $("#nextStep1").css("display", "block");
    $("#operation").css("display", "block");
}

function queInfo(result) {
    queType = result[0].topicType;
    var str = '<div id="info" class="ans" style="width: 90%;margin-left: 20px"><span style="font-weight: bolder">学科·难度&nbsp;：&nbsp;&nbsp;&nbsp;</span>高等数学·中等难度</div>\n' +
        '                            <div id="queId" class="ans" style="width: 90%;margin-left: 20px;margin-top: 10px"><span style="font-weight: bolder">题目类型&nbsp;：&nbsp;&nbsp;&nbsp;</span>' + queType + '</div>';
    return str;
}

function initQueMain(result) {
    var data = result[0];
    var str = '';
    cnt = 0;
    str += '    <div id="descriptionInfo" class="info_before info_after">题目描述预览 ：</div>\n' +
        '    <div class="test" style="float:right;margin-top: 0px;">\n' +
        '        <button id="btnRefac1" onclick="deleteType2(1)" style="margin-top: 0px;margin-right: 6%;width: 40px;height:25px;background-color: #cc544e;color: #FFFFFF;border: 0px;float: right;border-radius: 0.3rem;font-weight: bolder;">修改\n' +
        '        </button>\n' +
        '    </div>\n' +
        '    <div id="queInfo0" class="test" style="width:90%;margin-left: 4%;margin-bottom: 10px;font-size: 16px;color: #6C757D;padding:20px;border: 1px solid #d5d5da">' + data.topicTitle + '</div>';
    cnt++;
    queDescrption = data.topicTitle;
    if (data.topicType !== "问答题") {
        var optionCnt = 0;
        var obj = JSON.parse(data.topicOptions);
        var queSeq = 1;
        $.each(obj, function (i, index2) {
            queOptionList[queSeq] = index2.main;
            str += '<div name=\'option\'  id="guiedInfo' + (cnt - 1) + '" class="test info_before info_after">选项' + queList[optionCnt] + '预览 ：</div>\n' +
                '    <div class="test" style="float:right;margin-top: 0px;">\n' +
                '        <button id="btnRefac' + (cnt + 1) + '" onclick="deleteType2(' + (cnt + 1) + ')" style="margin-top: 0px;margin-right: 6%;width: 40px;height:25px;background-color: #cc544e;color: #FFFFFF;border: 0px;float: right;border-radius: 0.3rem;font-weight: bolder;">\n' +
                '            修改\n' +
                '        </button>\n' +
                '    </div>\n' +
                '    <div id="queInfo' + cnt + '" class="test" style="width:90%;margin-left: 4%;margin-bottom: 10px;font-size: 16px;color: #6C757D;padding:20px;border: 1px solid #d5d5da">\n' +
                '        ' + index2.main + '\n' +
                '    </div>';
            cnt++;
            optionCnt++;
            queSeq++;
        });
    }
    str += '<div name="ans"  id="guiedInfo' + (cnt - 1) + '" class="test info_before info_after"\n' +
        '         style="margin-left: 4%;margin-bottom: 10px;font-size: 16px;">答案预览 ：\n' +
        '    </div>\n' +
        '    <div class="test" style="float:right;margin-top: 0px;">\n' +
        '        <button id="btnRefac' + (cnt + 1) + '" onclick="deleteType2(' + (cnt + 1) + ')" style="margin-top: 0px;margin-right: 6%;width: 40px;height:25px;background-color: #cc544e;color: #FFFFFF;border: 0px;float: right;border-radius: 0.3rem;font-weight: bolder;\n' +
        '                            ">修改\n' +
        '        </button>\n' +
        '    </div>\n' +
        '    <div  id="queInfo' + cnt + '" class="test"\n' +
        '         style="width:90%;margin-left: 4%;margin-bottom: 10px;font-size: 16px;color: #6C757D;padding:20px;border: 1px solid #d5d5da">\n' +
        '        ' + data.topicAnswer + '\n' +
        '    </div>';
    cnt++;
    queAns = data.topicAnswer;
    str += '<div  name="exp"  id="guiedInfo' + (cnt - 1) + '" class="test info_before info_after">解析预览 ：</div>\n' +
        '    <div class="test" style="float:right;margin-top: 0px;">\n' +
        '        <button id="btnRefac' + (cnt + 1) + '" onclick="deleteType2(' + (cnt + 1) + ')" style="margin-top: 0px;margin-right: 6%;width: 40px;height:25px;background-color: #cc544e;color: #FFFFFF;border: 0px;float: right;border-radius: 0.3rem;font-weight: bolder;\n' +
        '                            ">修改\n' +
        '        </button>\n' +
        '    </div>\n' +
        '    <div id="queInfo' + cnt + '" class="test"\n' +
        '         style="width:90%;margin-left: 4%;margin-bottom: 10px;font-size: 16px;color: #6C757D;padding:20px;border: 1px solid #d5d5da">\n' +
        '        ' + data.topicExplain + '\n' +
        '    </div>'
    cnt++;
    queExplaination = data.topicExplain;
    return str;
}

function returnBack() {
    tmp = '';
    amount = 4;
    staticAmount = 4;
    interruptTarget = -1;
    curGuiedInfo;
    queDescrption = '';
    queOptionList = [];
    queAns = '';
    queExplaination = '';
    $("#main").css("display", "block");
    $("#operation").css("display", "none");
    $("#operation").html('');
}

function backToMain() {
    $("#main").css("display", "block");
    $("#operation").css("display", "none");
    $("#operation").html('');
}


var opHtml = '<div class="quesMain" style="padding-top: 65px">\n' +
    '                <div class="card widget-flat" style="margin-bottom: 0">\n' +
    '                    <div style="padding: 20px;font-weight: bolder;font-size: 17px;color: #1890ff">\n' +
    '                        <i class="fa fa-reply" aria-hidden="true"></i> <a onclick="returnBack()">取消修改</a>\n' +
    '                    </div>\n' +
    '                    <div class="row" style="padding-top: 20px;padding-bottom: 20px;width: 1100px;padding-left: 18%">\n' +
    '\n' +
    '                        <div class="col-sm-5">\n' +
    '                            <div class="row" style="padding-left: 40px">\n' +
    '                                <div id="num1" class="number number_cur col-sm-1"\n' +
    '                                     style="float: left;font-size: 16px;padding-top: 3px;padding-left: 10px">1\n' +
    '                                </div>\n' +
    '                                <div class="col-sm-5" style="padding-top: 5px">\n' +
    '                                    <span style="margin-left: 10px;font-size: 16px">输入题目内容</span>\n' +
    '                                </div>\n' +
    '                                <div class="space col-sm-5" style="margin-top: 15px"></div>\n' +
    '                            </div>\n' +
    '                        </div>\n' +
    '                        <div class="col-sm-5">\n' +
    '                            <div class="row" style="padding-left: 20px">\n' +
    '                                <div id="num2" class="number col-sm-1"\n' +
    '                                     style="float: left;font-size: 16px;padding-top: 3px;padding-left: 10px">2\n' +
    '                                </div>\n' +
    '                                <div class="col-sm-5" style="padding-top: 5px">\n' +
    '                                    <span style="margin-left: 10px;font-size: 16px">检查输入内容</span>\n' +
    '                                </div>\n' +
    '                                <div class="space col-sm-5" style="margin-top: 15px"></div>\n' +
    '                            </div>\n' +
    '                        </div>\n' +
    '                        <div class="col-sm-2" style="padding-left: 0">\n' +
    '                            <div style="padding-left: 0px">\n' +
    '                                <div id="num3" class="number"\n' +
    '                                     style="float: left;font-size: 16px;padding-top: 3px;padding-left: 2px">3\n' +
    '                                </div>\n' +
    '                                <div style="padding-top: 5px">\n' +
    '                                    <span style="margin-left: 10px;font-size: 16px">完成</span>\n' +
    '                                </div>\n' +
    '                            </div>\n' +
    '                        </div>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '            </div>\n' +
    '\n' +
    '            <div id="page1" class="card widget-flat" style="margin-bottom: 0;display: block">\n' +
    '                <div class="row" style="padding-top: 20px;padding-bottom: 20px">\n' +
    '                    <div class="col-sm-8 bg-white" style="margin-left: 17%">\n' +
    '                        <div style="margin-left: 4%">\n' +
    '                    <div id="firstQueInfo" class="que_box"\n' +
    '                         style="width: 500px;margin-left: 18%;margin-top: 15px;background-color: #e7ebf1;padding:15px;border-radius: 10px">\n' +
    '                    </div>\n' +
    '                    <br>\n' +
    '                            <script>\n' +
    '\n' +
    '                            </script>\n' +
    '                        </div>\n' +
    '\n' +
    '                        <div style="margin-bottom: 20px" id="quesMain">\n' +

    '                        </div>\n' +
    '                        <div style="width: 90%;margin-left: 4%">\n' +
    '                            <div class="col-sm-12">\n' +
    '                                <div id="body" name="body" style="display: none; margin-top: 20px; visibility: hidden;">\n' +
    '\n' +
    '                                </div>\n' +
    '                            </div>\n' +
    '\n' +
    '                            <script>\n' +
    '                                CKEDITOR.replace(\'body\', {\n' +
    '                                    filebrowserImageUploadUrl: "/",\n' +
    '                                    height: 120\n' +
    '                                });\n' +
    '                            </script>\n' +
    '                            <button id="btnAppend" onclick="a()" style="margin-top: 10px;margin-right: 6%;width: 100px;height:40px;background-color: #4e8ccd;color: #FFFFFF;border: 0px;float: right;border-radius: 0.3rem;font-weight: bolder;\n' +
    '                            ">保存选项内容\n' +
    '                            </button>\n' +
    '\n' +
    '                        </div>\n' +
    '                        <br>\n' +
    '                        <br>\n' +
    '                        <br>\n' +
    '\n' +
    '                        <div id="nextStep1" class="col-sm-8 bg-white" style="margin-left: 17%;display: none">\n' +
    '                            <button id="btnNextStep" class="btnNext" onclick="nextStep1()"\n' +
    '                                    style="width: 100px;margin-left: 43%">下一步\n' +
    '                            </button>\n' +
    '                        </div>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '\n' +
    '            </div>\n' +
    '            <div id="page2" class="card widget-flat" style="margin-bottom: 0;display: none">\n' +
    '\n' +
    '            <div id="queOverview" style="width: 800px;margin-left: 17%">\n' +
    '                <div style="margin-left: 20px;font-size: 30px;font-weight: bolder;color: #CC544EFF"><i\n' +
    '                        class="fa fa-exclamation-triangle" aria-hidden="true"></i>&nbsp;&nbsp;请核对题目信息\n' +
    '                </div>\n' +
    '                <div class="queDescription" style="width: 200px;padding-top: 20px;margin-left: 20px;color: #4e8ecf">\n' +
    '                    基本信息：\n' +
    '                </div>\n' +
    '                <div class="que_box"\n' +
    '                     style="/*border: 1px solid #6C757D;*/margin-left: 20px;margin-top: 15px;background-color: #dee7f3;padding:15px;border-radius: 10px">\n' +
    '                    <div id="queType" class="ans" style="width: 90%;margin-left: 20px"><span\n' +
    '                            style="font-weight: bolder">类型&nbsp;：&nbsp;&nbsp;&nbsp;</span>单选题\n' +
    '                    </div>\n' +
    '                    <div id="subject" class="ans" style="width: 90%;margin-left: 20px;margin-top: 10px"><span\n' +
    '                            style="font-weight: bolder">学科&nbsp;：&nbsp;&nbsp;&nbsp;</span>高等数学\n' +
    '                    </div>\n' +
    '                    <div id="difficulty" class="ans" style="width: 90%;margin-left: 20px;margin-top: 10px"><span\n' +
    '                            style="font-weight: bolder">难度&nbsp;：&nbsp;&nbsp;&nbsp;</span>中等\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '                <div class="queDescription" style="width: 200px;padding-top: 20px;margin-left: 20px;color: #4e8ecf">\n' +
    '                    题干与选项：\n' +
    '                </div>\n' +
    '                <div class="que_box"\n' +
    '                     style="/*border: 1px solid #6C757D;*/margin-left: 20px;margin-top: 15px;background-color: #dee7f3;padding:15px;border-radius: 10px">\n' +
    '                    <div id="queDescription" class="queDescription" style="width: 90%;margin-left: 20px">\n' +

    '                    </div>\n' +
    '                    <div id="queOptions" class="queOptions">\n' +
    '\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '                <div class="queDescription" style="width: 200px;padding-top: 20px;margin-left: 20px;color: #4e8ecf">\n' +
    '                    答案与解析：\n' +
    '                </div>\n' +
    '                <div id="exTarget" class="que_box"\n' +
    '                     style="/*border: 1px solid #6C757D;*/margin-left: 20px;margin-top: 15px;background-color: #dee7f3;padding:15px;border-radius: 10px">\n' +
    '                    <div id="queAns" class="ans" style="width: 90%;margin-left: 20px">' +
    '\n' +
    '                    </div>\n' +
    '                    <div id="queexplain" class="ans" style="width: 90%;margin-left: 20px;margin-top: 10px">' +
    '\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '                <div id="nextStep2" class="col-sm-8 bg-white"\n' +
    '                     style="margin-left: 17%;display: block;padding-bottom: 40px">\n' +
    '                    <div class="row">\n' +
    '                        <button id="btnBackStep1" class="btnPage2" onclick="backStep1()"\n' +
    '                                style="width: 100px;margin-left: 23%;float: left">上一步\n' +
    '                        </button>\n' +
    '                        <button id="btnNextStep2" class="btnPage2" onclick="nextStep2()"\n' +
    '                                style="width: 100px;margin-left: 13%;float:right;">下一步\n' +
    '                        </button>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '            </div>\n' +
    '\n' +
    '        </div>\n' +
    '            <div id="page3" class="card widget-flat" style="margin-bottom: 0;display: none">\n' +
    '                <div id="succesInfo" class="bg-white"\n' +
    '                     style="width: 800px;padding-bottom: 120px;display: block;padding-left: 25%;padding-top: 30px">\n' +
    '                    <div>\n' +
    '                        <i class="fa fa-check-circle" style="font-size: 90px;color: #67c300;padding-left: 60%"\n' +
    '                           aria-hidden="true"></i>\n' +
    '                        <br>\n' +
    '                        <span style="padding-left: 59%;font-size: 22px;font-weight: bolder">操作成功</span>\n' +
    '                        <br>\n' +
    '                        <div id="nextStep3" class="col-sm-8"\n' +
    '                             style="margin-left: 31%;display: block;padding-bottom: 40px;margin-top: 30px">\n' +
    '                            <div class="row" style="padding-left: 43%">\n' +
    '                                <button id="returnBtn" class="btnPage2" onclick="backToMain()"\n' +
    '                                        style="width: 100px;margin-left: 3%;float:right;height: 35px">返回\n' +
    '                                </button>\n' +
    '                            </div>\n' +
    '                        </div>\n' +
    '                    </div>\n' +
    '                    <div id="finalInfo" class="que_box" style="width: 500px;margin-left: 18%;margin-top: 15px;background-color: #e7ebf1;padding:15px;border-radius: 10px"\n' +

    '                    </div>\n' +
    '                </div>\n' +
    '            </div>';

function mathJaxTimeout() {
    setTimeout(function () {
        MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
    }, 300);
}

function setTestState1(id){
    $.ajax({
        url:"/updateTopicStateServlet",
        data: {state:0,topicId: id},
        type: "GET",
        success: function (result) {
            var stateId="#state"+id;
            var opId="#op"+id;
            var str='<span style="text-align: center" class="zhifou-dot dot-offline"></span> 停用';
            $(stateId).empty();
            $(stateId).append(str);
            $(opId).empty();
            $(opId).append('<a href="#" id="preview' + id + '" onclick="opQueWithID(' + id + ')" style="padding-left: 10px">修改</a><a href="#" id="preview' + id + '" onclick="setTestState0(' + id + ')" style="padding-left: 10px;color: #0ea759">上线</a>')
        }
    })

}

function setTestState0(id){
    $.ajax({
        url:"/updateTopicStateServlet",
        data: {state:1,topicId: id},
        type: "GET",
        success: function (result) {
            var stateId="#state"+id;
            var opId="#op"+id;
            var str='<span style="text-align: center" class="zhifou-dot dot-online"></span> 已上线';
            $(stateId).empty();
            $(stateId).append(str);
            $(opId).empty();
            $(opId).append('<a href="#" id="preview' + id + '" onclick="opQueWithID(' + id + ')" style="padding-left: 10px">修改</a><a href="#" id="preview' + id + '" onclick="setTestState1(' + id + ')" style="padding-left: 10px;color: red">停用</a>')
        }
    })

}