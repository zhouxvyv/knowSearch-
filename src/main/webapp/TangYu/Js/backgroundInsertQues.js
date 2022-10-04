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
var difficulty;
var opicOptions='';
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
            amount=1;
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
            amount=1;
        } else if (ansTmp === '2') {
            $("#choiceAmount").css("display", "block");
            queType = '2'
        }
    })
    $("input[id='inlineRadio9']").change(function () {//监听题目类型radio
        var ansTmp = $('input[type=radio][id="inlineRadio9"]:checked').val();
        if (ansTmp === '1') {
            $("#choiceAmount").css("display", "none");
            queType = '1';
            amount=1;
        } else if (ansTmp === '3') {
            $("#choiceAmount").css("display", "block");
            queType = '3'
        }
    })

});

function a() {
    var find1 = $("#cke_body").find("iframe").contents().find("body");
    var document1 = find1.html();
    console.log(document1);
    var str = '<div id="queInfo' + cnt + '" class="test" style="width:90%;margin-left: 4%;margin-bottom: 10px;font-size: 16px;color: #6C757D;padding:20px;border: 1px solid #d5d5da">';
    str += document1;
    str += '</div>'
    var btnDiv = "<div class='test' style=\"float:right;margin-top: 0px;\">\n" +
        "                            <button id=\"btnRefac" + (cnt + 1) + "\" onclick=\"deleteType2(" + (cnt + 1) + ")\" style=\"margin-top: 0px;margin-right: 6%;width: 40px;height:25px;background-color: #cc544e;color: #FFFFFF;border: 0px;float: right;border-radius: 0.3rem;font-weight: bolder;\n" +
        "                            \">修改\n" +
        "                            </button>\n" +
        "                        </div>";
    if(queType==='2'||queType==='3'){
        if ( amount > 0) {
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
                    $("#quesMain .test").last().add('name','ans')
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
            $("#nextStep1").css("display", "block");
            queExplaination = readDocument(document1);

        }
    }
    else{
        if (amount > 0) {
            $("#quesMain").append(btnDiv)
            $("#quesMain").append(str);
            $("#quesMain").append("<div id='guiedInfo" + cnt + "' class='test info_before' >请输入答案</div>")
            $("#btnAppend").text("保存选项内容");
            $("#descriptionInfo").text("题目描述预览 ：");
            $("#descriptionInfo").addClass("info_after");
            $("#cke_body").find("iframe").contents().find("body").text("");
            queDescrption = readDocument(document1);
            console.log(queDescrption);
            cnt++;
            amount--;
        } else if (amount == 0) {
            $("#quesMain").append(btnDiv)
            $("#quesMain").append(str);
            $("#quesMain").append("<div id='guiedInfo" + cnt + "' class='test info_before' >请输入题目解析</div>")
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
            $("#nextStep1").css("display", "block");
            queExplaination = readDocument(document1);

        }

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
    console.log(queDescrption);
    console.log(queOptionList);
    console.log(queAns);
    console.log(queExplaination);
    var queTypeStr='<span style="font-weight: bolder">类型&nbsp;：&nbsp;&nbsp;&nbsp;</span>';
    if(queType==='1'){
        queTypeStr+='问答题';
    }else if (queType==='2'){
        queTypeStr+='单选题';
    }else {
       queTypeStr+='多选题';
    }
    $("#queType").empty();
    $("#queType").append(queTypeStr);
    for (var i = 1; i <= 3; i++) {
        var ansStr = "inlineRadio" + String(i);
        ansTmp = $('input[type=radio][id=' + ansStr + ']:checked').val();
        if (ansTmp != null) {
             difficulty= ansTmp;
        }
    }
    var diffStr='<span style="font-weight: bolder">难度&nbsp;：&nbsp;&nbsp;&nbsp;</span>'+difficulty;
    $("#difficulty").empty();
    $("#difficulty").append(diffStr);

    $("#page1").css("display","none");
    initOverview();
    $("#page2").css("display","block")
    $("#num2").addClass("number_cur");
    $("#num1").removeClass("number_cur");
    document.body.scrollTop = document.documentElement.scrollTop = 0;
}

function backStep1(){
    $("#page2").css("display","none")
    recoverOverview();
    $("#page1").css("display","block");
    $("#num1").addClass("number_cur");
    $("#num2").removeClass("number_cur");
    document.body.scrollTop = document.documentElement.scrollTop = 0;
}

function recoverOverview(){
    $("#queOptions").empty();
    $("#queAns").empty();
    $("#queexplain").empty();
}

function initOverview(){
    $("#queDescription").text(queDescrption);
    for(var i=1;i<queOptionList.length;i++){
        var str= '<div id="option'+i+'" class="option"><span>'+queList[i-1]+'.</span>'+queOptionList[i]+'</div>';
        $("#queOptions").append(str);
    }
    var ans='<span style="font-weight: bolder">答案&nbsp;：&nbsp;&nbsp;&nbsp;</span>'+queAns;
    var explaination='<span style="font-weight: bolder">解析&nbsp;：&nbsp;&nbsp;&nbsp;</span>'+queExplaination;
    $("#queAns").append(ans);
    $("#queexplain").append(explaination);
    setTimeout(function () {
        MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
    }, 300);
}

function nextStep2(){
    $("#page2").css("display","none");
    opicOptions='[';
    for(var i=1;i<queOptionList.length;i++){
        opicOptions+=creatOption(queList[i-1],queOptionList[i]);
        if(i+1<queOptionList.length)
            opicOptions+=',';
    }
    opicOptions+=']';
    console.log(opicOptions);
    console.log(queType);
    if(queType==='1')
        queType='问答题';
    else if(queType==='2')
        queType='单选题';
    else
        queType='多选题';
    $("#finalQueInfo").empty();
    $.ajax({
        url: "/insertTopicServlet",
        data: {
            topicTitle:queDescrption,
            topicType:queType,
            topicOption:opicOptions,
            topicAnswer:queAns,
            topicExplain:queExplaination
        },
        success: function (result) {
            var str=initFinalQueInfo(result);
            $("#finalQueInfo").append(str);

            $("#page3").css("display","block");
            $("#num3").addClass("number_cur");
            $("#num2").removeClass("number_cur");
        }
    })

}

function getNow(Mytime) { return Mytime < 10 ? '0' + Mytime : Mytime; }

function initFinalQueInfo(result){
    var myDate = new Date();
    var year = myDate.getFullYear();
    var month = myDate.getMonth() + 1;
    var date = myDate.getDate();
    var h = myDate.getHours();
    var m = myDate.getMinutes();
    var s = myDate.getSeconds();
    var Now = year + '-' + getNow(month) + "-" + getNow(date) + " " + getNow(h) + ':' + getNow(m) + ":" + getNow(s);
    var str='<div id="info" class="ans" style="width: 90%;margin-left: 20px"><span style="font-weight: bolder">试题识别信息&nbsp;：&nbsp;&nbsp;&nbsp;</span>'+queType+'·高等数学·'+difficulty+'</div>\n' +
        '                            <div id="queId" class="ans" style="width: 90%;margin-left: 20px;margin-top: 10px"><span style="font-weight: bolder">题目编号&nbsp;：&nbsp;&nbsp;&nbsp;</span>'+result.queId+'</div>\n' +
        '                            <div id="operator" class="ans" style="width: 90%;margin-left: 20px;margin-top: 10px"><span style="font-weight: bolder">管理员编号&nbsp;：&nbsp;&nbsp;&nbsp;</span>10011</div>\n' +
        '                            <div id="insertDate" class="ans" style="width: 90%;margin-left: 20px;margin-top: 10px"><span style="font-weight: bolder">添加时间&nbsp;：&nbsp;&nbsp;&nbsp;</span>'+Now+'</div>'
    return str;
}

function creatOption(title,main){
    var option='{"title":"'+title+'","main":"'+main+'"}'
    return option;
}

function rollBack(){
    location.reload();
}