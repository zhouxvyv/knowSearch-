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
            swiperHtml += '<h1 id="hjkjjkkj" class="=exe-title" >每日一练</h1>\n' +
                '            <p class="lead exe-description">' + date + ' 高等数学</p>';
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
                    swiperHtml += '<div id="qc_' + (i + 1) + '" style="height: 30px;width: 30px;margin:5px;float: left">\n' +
                        '                                <li><a href="javascript:;" onclick="jump(this);" pageid="que_' + (i + 1) + '">' + (i + 1) + '</a></li>\n' +
                        '                            </div>'
                }
                swiperHtml += '<div id="queAmount" value="' + data.amount + '"></div>\n';
                swiperHtml += '<div id="listState" value="0"></div>';
                console.log(swiperHtml);
                $('#queUl').html(swiperHtml);

                swiperHtml = '';
                swiperHtml += ' <div class="col-sm-8 exe-main content" id="queList"  value="' + data.dpId + '">\n';
                queList.map(function (item, index) {
                    swiperHtml += '<div class="question">\n' +
                        '                <div class="clearfix">\n' +
                        '                    <i class="que-li" id="que_' + item.topicSeqence + '">' + item.topicSeqence + '</i>\n' +
                        '                    <i class="que-type">[单选题]</i>\n' +
                        '                    <div class="clearfix que-que formula" style="line-height: 35px;padding-right: 15px">\n' +
                        '                        ' + item.topicTitle + '' +
                        '                    </div>\n' +
                        '                </div>\n' +
                        '                <div class="clearfix">\n' +
                        '                    <ul class="fl" style="padding-left: 10px" id="answer00001">';
                    var obj = JSON.parse(item.topicOptions);

                    $.each(obj, function (i, index2) {
                        if (item.userAns == index2.title) {
                            swiperHtml += '<li>\n' +
                                '                            <label class="fl before">\n' +
                                '                                <input name="answer' + item.topicSeqence + '" type="radio" value="' + index2.title + '" onchange="getRaio()" checked="checked">&nbsp;&nbsp;' + index2.title + '&nbsp;&nbsp;' + index2.main + '\n' +
                                '                            </label>\n' +
                                '                            <div class="clear"></div>\n' +
                                '                        </li>';
                        } else {
                            swiperHtml += '<li>\n' +
                                '                            <label class="fl before">\n' +
                                '                                <input name="answer' + item.topicSeqence + '" type="radio" value="' + index2.title + '" onchange="getRaio()">&nbsp;&nbsp;' + index2.title + '&nbsp;&nbsp;' + index2.main + '\n' +
                                '                            </label>\n' +
                                '                            <div class="clear"></div>\n' +
                                '                        </li>';
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
                            swiperHtml2 += '<div id="qc_' + item.topicSeqence + '" style="height: 30px;width: 30px;margin:5px;float: left">\n' +
                                '                                <li class="active" style="background-image: linear-gradient(to top, #c1dfc4 0%, #deecdd 100%)"><a  style="color: #3c763d" href="javascript:;" onclick="jump(this);" pageid="que_' + item.topicSeqence + '">' + item.topicSeqence + '</a></li>\n' +
                                '                            </div>';
                            swiperHtml += ' </ul>\n' +
                                '                </div>\n' +
                                '                <div class="clearfix" id="ansJudge1">\n' +
                                '                    <div class="clearfix que-que formula"\n' +
                                '                         style="line-height: 35px;padding-right: 15px;margin-top: 15px">\n' +
                                '                        正确答案：' + item.topicAnswer + '&nbsp;&nbsp;&nbsp;&nbsp;您的答案：' + item.userAns + '<i class="fa fa-check fa-2x" aria-hidden="true"\n' +
                                '                                                               style="float: right;color:forestgreen"></i>\n' +
                                '                    </div>\n' +
                                '\n' +
                                '                    <div class="alert alert-success">\n' +
                                '                        <ul class="fa-ul">\n' +
                                '                            <li>\n' +
                                '                                <i class="fa fa-book" aria-hidden="true"></i>\n' +
                                '                                &nbsp;答案解析：\n' +
                                '                                <a data-toggle="collapse" data-parent="#accordion" href="#collapse' + item.topicSeqence + '" style="color: #3c763d;text-decoration: none">\n' +
                                '                                    点击展开&nbsp;&nbsp;<i class="fa fa-chevron-circle-down" aria-hidden="true"></i>\n' +
                                '                                </a>\n' +
                                '                            </li>\n' +
                                '                        </ul>\n' +
                                '                        <div id="collapse' + item.topicSeqence + '" class="panel-collapse collapse">\n' +
                                '                            <div class="panel-body">\n' +
                                '                                ' + item.topicExplain + '' +
                                '                            </div>\n' +
                                '                        </div>\n' +
                                '                    </div>\n' +
                                '                </div>\n' +
                                '            </div>\n' +
                                '            <hr/>';
                        } else {
                            swiperHtml2 += '<div id="qc_' + item.topicSeqence + '" style="height: 30px;width: 30px;margin:5px;float: left">\n' +
                                '                                <li class="active" style="background-image: linear-gradient(45deg, #ee9ca7 0%, #ffdde1 100%)"><a  style="color: #842029" href="javascript:;" onclick="jump(this);" pageid="que_' + item.topicSeqence + '">' + item.topicSeqence + '</a></li>\n' +
                                '                            </div>';
                            swiperHtml += '</ul>\n' +
                                '                </div>\n' +
                                '                <div class="clearfix" id="ansJudge2">\n' +
                                '                    <div class="clearfix que-que formula"\n' +
                                '                         style="line-height: 35px;padding-right: 15px;margin-top: 15px;margin-bottom: 10px">\n' +
                                '                        正确答案：' + item.topicAnswer + '&nbsp;&nbsp;&nbsp;&nbsp;您的答案：' + item.userAns + '<i class="fa fa-close fa-2x" aria-hidden="true"\n' +
                                '                                                               style="float: right;color:#db2727"></i>\n' +
                                '                    </div>\n' +
                                '                    <div class="alert alert-danger alert-dismissable">\n' +
                                '                        <ul class="fa-ul">\n' +
                                '                            <li>\n' +
                                '                                <i class="fa fa-book" aria-hidden="true"></i>\n' +
                                '                                &nbsp;答案解析：\n' +
                                '                                <a data-toggle="collapse" data-parent="#accordion" href="#collapse' + item.topicSeqence + '" style="color:#a94442;text-decoration: none">\n' +
                                '                                    点击展开&nbsp;&nbsp;<i class="fa fa-chevron-circle-down" aria-hidden="true"></i>\n' +
                                '                                </a>\n' +
                                '                            </li>\n' +
                                '                        </ul>\n' +
                                '                        <div id="collapse' + item.topicSeqence + '" class="panel-collapse collapse">\n' +
                                '                            <div class="panel-body">\n' +
                                '                                 ' + item.topicExplain + '' +
                                '                            </div>\n' +
                                '                        </div>\n' +
                                '                    </div>\n' +
                                '                </div>\n' +
                                '            </div>\n' +
                                '            <hr/>\n';
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
