$(function () {
    var userID = 2;
    var topicConstructURL = "/QueryDplistSpringMVC";
    var url = location.href;

    function getUrlParam(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
        var r = window.location.search.substr(1).match(reg); //匹配目标参数
        if (r != null) {
            return decodeURIComponent(r[2]);
        }
        return null; //返回参数值
    }

    $(document).ready(function () {
            var date = getUrlParam("date");
            var swiperHtml = '';
            swiperHtml+='<h2 class=" pb-2 pt-3 mb-2 border-bottom">\n' +
                '                        每日一练\n' +
                '                        <p class="text-muted fs-5" style="margin-top: 10px">' + date + ' 高等数学</p>\n' +
                '                    </h2>';
            $('#dpTitle').html(swiperHtml);
        }
    )
    $(document).ready(
        $.post(topicConstructURL, {userId: userID, date: getUrlParam("date")}, function (data) {
            if (data.result) {
                var queList = data.queList;
                var swiperHtml = '';//quelist[0].
                var swiperHtml2 = '';
                var state = 0;
                for (var i = 0; i < data.amount; i++) {
                    swiperHtml+='<div id="qc_' + (i + 1) + '" class="qc">\n' +
                        '                                    <li><a href="javascript:;" onclick="jump(this);" pageid="que_' + (i + 1) + '" class="qc-a">' + (i + 1) + '</a>\n' +
                        '                                    </li>\n' +
                        '                                </div>'
                }
                swiperHtml += '<div id="queAmount" value="' + data.amount + '"></div>\n';
                swiperHtml += '<div id="listState" value="0"></div>';
                console.log(swiperHtml);
                $('#queUl').html(swiperHtml);

                swiperHtml = '';
                swiperHtml += ' <div class="" id="queList"  value="' + data.dpId + '">\n';
                queList.map(function (item, index) {
                    swiperHtml+='<div class="clearfix">\n' +
                        '                        <i class="que-li" id="que_' + item.topicSeqence + '">' + item.topicSeqence + '</i>\n' +
                        '                        <i class="que-type">[ 单选题 ]</i>\n' +
                        '                        <div class="clearfix que-que formula" style="line-height: 35px;padding-right: 15px">\n' +
                        '                            <p class="que-main">\n' +
                        '                        ' + item.topicTitle + '' +
                        '                            </p>\n' +
                        '                        </div>\n' +
                        '                    </div>\n' +
                        '                    <div class="clearfix">\n' +
                        '                        <ul class="fl" style="padding-left: 10px" id="ans_' + item.topicSeqence + '">';
                    var obj = JSON.parse(item.topicOptions);

                    $.each(obj, function (i, index2) {
                        if (item.userAns == index2.title) {
                            swiperHtml+='<li>\n' +
                                '                                <label class="fl before">\n' +
                                '                                    <input name="answer' + item.topicSeqence + '" type="radio" value="' + index2.title + '" onchange="getRaio()" checked="checked">&nbsp;&nbsp;' + index2.title + '&nbsp;&nbsp;' + index2.main + '\n' +
                                '                                </label>\n' +
                                '                                <div class="clear"></div>\n' +
                                '                            </li>';
                        } else {
                            swiperHtml+='<li>\n' +
                                '                                <label class="fl before">\n' +
                                '                                    <input name="answer' + item.topicSeqence + '" type="radio" value="' + index2.title + '" onchange="getRaio()">&nbsp;&nbsp;' + index2.title + '&nbsp;&nbsp;' + index2.main + '\n' +
                                '                                </label>\n' +
                                '                                <div class="clear"></div>\n' +
                                '                            </li>';
                        }
                    });
                    if (item.state == 0) {
                        swiperHtml += '</ul>\n' +
                            '                </div>\n' +
                            '            </div>\n' +
                            '            <hr/>';
                    } else if (item.state == 1) {
                        state = 1;

                        if (item.istrue == "true") {
                            swiperHtml2+='<div id="qc_' + item.topicSeqence + '" class="qc">\n' +
                                '                                    <li style="background-color: #92c288">\n' +
                                '                                        <a style="color: white" href="javascript:;" onclick="jump(this);" pageid="que_' + item.topicSeqence + '" class="qc-a">' + item.topicSeqence + '</a>\n' +
                                '                                    </li>\n' +
                                '                                </div>'
                            swiperHtml+='<div class="clearfix" id="ansJudge1">\n' +
                                '                        <div class="clearfix que-que formula"\n' +
                                '                             style="line-height: 35px;padding-right: 15px;margin-top: 15px">\n' +
                                '                            正确答案：' + item.topicAnswer + '&nbsp;&nbsp;&nbsp;&nbsp;您的答案：' + item.userAns + '\n' +
                                '                            <i class="fa fa-check fa-2x" aria-hidden="true" style="float: right;color:forestgreen"></i>\n' +
                                '                        </div>\n' +
                                '\n' +
                                '                        <p>\n' +
                                '                            <button class="btn btn-explain" type="button" data-bs-toggle="collapse"\n' +
                                '                                    data-bs-target="#collapseExample' + item.topicSeqence + '" aria-expanded="false"\n' +
                                '                                    aria-controls="collapseExample' + item.topicSeqence + '">\n' +
                                '                                <i class="fa fa-book" aria-hidden="true" style="color: #198754"></i>\n' +
                                '                                <a data-toggle="collapse" data-parent="#accordion" href="#collapseTwo"\n' +
                                '                                   style="color: #198754;text-decoration: none;font-size: 14px">\n' +
                                '                                    答案解析&nbsp;:&nbsp;点击展开&nbsp;&nbsp;\n' +
                                '                                    <i class="fa fa-arrow-down" aria-hidden="true" style="color: #198754"></i>\n' +
                                '                                </a>\n' +
                                '                            </button>\n' +
                                '                        </p>\n' +
                                '                        <div class="collapse green-Div" id="collapseExample' + item.topicSeqence + '">\n' +
                                '                            <div class="card card-body green-Div">\n' +
                                '                                   '+ item.topicExplain + '' +
                                '                            </div>\n' +
                                '                        </div>\n' +
                                '                    </div>\n' +
                                '                </div>\n' +
                                '                <hr>';
                        } else {
                            swiperHtml2+='<div id="qc_' + item.topicSeqence + '" class="qc">\n' +
                                '                                    <li class="active" style="background-color: #d55353">\n' +
                                '                                        <a style="color: white" href="javascript:;" onclick="jump(this);" pageid="que_' + item.topicSeqence + '" class="qc-a">' + item.topicSeqence + '</a></li>\n' +
                                '                                </div>'
                            swiperHtml+='<div class="clearfix" id="ansJudge1">\n' +
                                '                        <div class="clearfix que-que formula"\n' +
                                '                             style="line-height: 35px;padding-right: 15px;margin-top: 15px">\n' +
                                '                            正确答案：' + item.topicAnswer + '&nbsp;&nbsp;&nbsp;&nbsp;您的答案：' + item.userAns + '\n' +
                                '                            <i class="fa fa-close fa-2x" aria-hidden="true" style="float: right;color:#DB2727FF"></i>\n' +
                                '                        </div>\n' +
                                '\n' +
                                '                        <p>\n' +
                                '                            <button style=" background-color: #f2dede;" class="btn btn-false" type="button" data-bs-toggle="collapse"\n' +
                                '                                    data-bs-target="#collapseExample' + item.topicSeqence + '" aria-expanded="false"\n' +
                                '                                    aria-controls="collapseExample' + item.topicSeqence + '">\n' +
                                '                                <i class="fa fa-book" aria-hidden="true" style="color: #a94442"></i>\n' +
                                '                                <a data-toggle="collapse" data-parent="#accordion" href="#collapseTwo"\n' +
                                '                                   style="color: #a94442;text-decoration: none;font-size: 14px">\n' +
                                '                                    答案解析&nbsp;:&nbsp;点击展开&nbsp;&nbsp;\n' +
                                '                                    <i class="fa fa-arrow-down" aria-hidden="true" style="color: #a94442"></i>\n' +
                                '                                </a>\n' +
                                '                            </button>\n' +
                                '                        </p>\n' +
                                '                        <div style=" background-color: #f2dede;" class="collapse red-Div" id="collapseExample' + item.topicSeqence + '">\n' +
                                '                            <div style=" background-color: #f2dede;" class="card card-body red-Div">\n' +
                                '                                   '+ item.topicExplain + '' +
                                '                            </div>\n' +
                                '                        </div>\n' +
                                '                    </div>\n' +
                                '                </div>\n' +
                                '                <hr>';

                        }

                    }
                })
                swiperHtml += '</div>';
                if (state == 1) {
                    swiperHtml2 += '<div id="listState" value="' + state + '"></div>';
                    console.log(swiperHtml2);
                    $('#queUl').html(swiperHtml2);
                    swiperHtml2 = '';
                    $('#DPSubmit').html(swiperHtml2);

                }
                $('#queTarget').html(swiperHtml);
                setTimeout(function () {
                    MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
                }, 100);

            }


        }, "json")
    )

    function getAns() {
        var ans = new Array();
        var name1;
        var amount = document.getElementById('queAmount').getAttribute("value");
        for (var i = 1; i <= amount; i++) {
            name1 = 'answer' + String(i);
            var ansTmp = $('input[type=radio][name=' + name1 + ']:checked').val();
            if (ans != null) {
                ans[i] = ansTmp;
            }
        }
        return ans;
    }

    function ansCheck(ans) {
        var amount = document.getElementById('queAmount').getAttribute("value");
        for (var i = 1; i <= amount; i++) {
            if (!ans[i]) {
                return false;
            }
        }
        return true;
    }

    $(document).ready(function () {
        var ansCheckURl = "/ansOperationSpringMVC";
        $('#DPSubmit').click(function () {
            var ansList = new Array();
            var ansContainer=new Array();
            ansList = getAns();
            if (ansCheck(ansList)) {
                var dpId = document.getElementById('queList').getAttribute("value");
                ansContainer.push({"dpId":dpId,"ansList":ansList});
                $.ajax({
                    url: ansCheckURl,
                    data: JSON.stringify(ansContainer),
                    contentType: "application/json;charset=UTF-8",
                    type: "post",
                    dataType: "json",
                    success: function (data) {
                        window.location.replace(url);
                    }
                });
            } else {
                alert("还有题目未解答，请检查后提交！")
            }

        });
    });

});
