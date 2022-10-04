$(function () {
    var url = '/DailyPracticeDataSpringMVC';
    $(document).ready(function () {
        $.post(url, function (data) {
            if (data.result) {
                var swiperHtml = '';
                swiperHtml+='<div class="col-sm-6">\n' +
                    '                                <div class="card widget-flat">\n' +
                    '                                    <div class="card-body">\n' +
                    '                                        <div class="float-end">\n' +
                    '                                            <i class="mdi mdi-account-multiple widget-icon"></i>\n' +
                    '                                        </div>\n' +
                    '                                        <h6 class="text-muted" style="color: #6C757D">本月练习天数</h6>\n' +
                    '                                        <h4 class="mt-3 mb-3" style="color: #6C757D"><strong>' + data.practiceTime + '</strong><a\n' +
                    '                                                style="font-size: 14px;color: #6C757D;text-decoration: none">&nbsp;天</a>\n' +
                    '                                        </h4>\n' +
                    '                                        <p class="mb-0 text-nowrap">\n' +
                    '                                            <span style="color: #6C757D">相比上个月</span>'
                /*swiperHtml += '<div class="col-sm-6" style="padding: 10px 10px">\n' +
                    '                            <div class="card-body">\n' +
                    '                                <h5 class="text-muted">本月完成练习天数</h5>\n' +
                    '                                <h3 class="text-h3">' + data.practiceTime + '<a style="font-size: 14px;color: #6C757D;text-decoration: none">&nbsp;天</a>\n' +
                    '                                </h3>\n' +
                    '                                <p class="test-muted" style="color: rgb(10, 207, 151)">\n' +
                    '                                    <span class="text-info">相比上个月</span>';*/
                if (data.ptRate > 0) {
                    swiperHtml+='<span class="text-false text-nowrap" style="color: rgb(10, 207, 151)">\n' +
                        '                                                <i class="fa fa-arrow-up" aria-hidden="true"\n' +
                        '                                                   style="color: rgb(10, 207, 151)"></i>&nbsp;&nbsp;' + data.ptRate + '%\n' +
                        '                                            </span>\n' +
                        '                                        </p>\n' +
                        '                                    </div> <!-- end card-body-->\n' +
                        '                                </div> <!-- end card-->\n' +
                        '                            </div>';
/*                    swiperHtml += '<span class="text-false" style="color: rgb(10, 207, 151)">&nbsp;<i\n' +
                        '                                            class="fa fa-arrow-up" aria-hidden="true"\n' +
                        '                                            style="color: rgb(10, 207, 151)"></i>&nbsp;&nbsp;' + data.ptRate + '%</span>\n' +
                        '                                </p>\n' +
                        '                            </div>\n' +
                        '                        </div>';*/
                } else {
                    swiperHtml+='<span class="text-false text-nowrap" style="color: #FA5C7C">\n' +
                        '                                                <i class="fa fa-arrow-down" aria-hidden="true"\n' +
                        '                                                   style="color: #FA5C7C"></i>&nbsp;&nbsp;' +Math.abs( data.ptRate) + '%\n' +
                        '                                            </span>\n' +
                        '                                        </p>\n' +
                        '                                    </div> <!-- end card-body-->\n' +
                        '                                </div> <!-- end card-->\n' +
                        '                            </div>'
                    /*swiperHtml += '<span class="text-false" style="color: #FA5C7C">&nbsp;<i\n' +
                        '                                            class="fa fa-arrow-down" aria-hidden="true"\n' +
                        '                                            style="color: #FA5C7C"></i>&nbsp;&nbsp;' +Math.abs( data.ptRate) + '%</span>\n' +
                        '                                </p>\n' +
                        '                            </div>\n' +
                        '                        </div>';*/
                }
                swiperHtml+='<div class="col-sm-6">\n' +
                    '                                <div class="card widget-flat">\n' +
                    '                                    <div class="card-body">\n' +
                    '                                        <div class="float-end">\n' +
                    '                                            <i class="mdi mdi-account-multiple widget-icon"></i>\n' +
                    '                                        </div>\n' +
                    '                                        <h6 class="text-muted" style="color: #6C757D">累计正确率</h6>\n' +
                    '                                        <h4 class="mt-3 mb-3" style="color: #6C757D"><strong>' + Math.abs(data.totalRate) + '</strong><a\n' +
                    '                                                style="font-size: 14px;color: #6C757D;text-decoration: none">&nbsp;%</a>\n' +
                    '                                        </h4>\n' +
                    '                                        <p class="mb-0 text-nowrap">\n' +
                    '                                            <span style="color: #6C757D">相比上个月</span>';
/*                swiperHtml += '\n' +
                    '                        <div class="col-sm-6" style="padding: 10px 10px">\n' +
                    '                            <div class="card-body">\n' +
                    '                                <h5 class="text-muted">累计正确率</h5>\n' +
                    '                                <h3 class="text-h3">' + Math.abs(data.totalRate) + '&nbsp;%</h3>\n' +
                    '                                <p class="test-muted">\n' +
                    '                                    <span class="text-info">相比上个月</span>';*/
                if (data.totalSCRate > 0) {
                    swiperHtml+='<span class="text-false text-nowrap" style="color: rgb(10, 207, 151)">\n' +
                        '                                                <i class="fa fa-arrow-up" aria-hidden="true"\n' +
                        '                                                   style="color: rgb(10, 207, 151)"></i>&nbsp;&nbsp;'+data.totalSCRate+'%\n' +
                        '                                            </span>\n' +
                        '                                        </p>\n' +
                        '                                    </div> <!-- end card-body-->\n' +
                        '                                </div> <!-- end card-->\n' +
                        '                            </div>';
/*                    swiperHtml += '<span class="text-false" style="color: rgb(10, 207, 151)">&nbsp;<i\n' +
                        '                                            class="fa fa-arrow-down" aria-hidden="true"\n' +
                        '                                            style="color: rgb(10, 207, 151)"></i>&nbsp;&nbsp;'+data.totalSCRate+'%</span>\n' +
                        '                                </p>\n' +
                        '                            </div>\n' +
                        '                        </div>';*/
                } else {
                    swiperHtml+='<span class="text-false text-nowrap" style="color: #FA5C7C">\n' +
                        '                                                <i class="fa fa-arrow-down" aria-hidden="true"\n' +
                        '                                                   style="color: #FA5C7C"></i>&nbsp;&nbsp;'+Math.abs(data.totalSCRate)+'%\n' +
                        '                                            </span>\n' +
                        '                                        </p>\n' +
                        '                                    </div> <!-- end card-body-->\n' +
                        '                                </div> <!-- end card-->\n' +
                        '                            </div>'
                    /*swiperHtml += '<span class="text-false" style="color: #FA5C7C">&nbsp;<i\n' +
                        '                                            class="fa fa-arrow-down" aria-hidden="true"\n' +
                        '                                            style="color: #FA5C7C"></i>&nbsp;&nbsp;'+Math.abs(data.totalSCRate)+'%</span>\n' +
                        '                                </p>\n' +
                        '                            </div>\n' +
                        '                        </div>';*/
                }
                $('#chartTarget1').html(swiperHtml);
                swiperHtml = '';
                if (data.state > 0) {
                    swiperHtml+='<div class="col-sm-6">\n' +
                        '                                <div class="card widget-flat">\n' +
                        '                                    <div class="card-body">\n' +
                        '                                        <div class="float-end">\n' +
                        '                                            <i class="mdi mdi-account-multiple widget-icon"></i>\n' +
                        '                                        </div>\n' +
                        '                                        <h6 class="text-muted" style="color: #6C757D">今日答题错误数</h6>\n' +
                        '                                        <h4 class="mt-3 mb-3" style="color: #6C757D"><strong style="color:#FA5C7C">' + data.userFalseAns + '</strong><a href="" style="text-decoration: none;color: #6C757D"><strong>&nbsp;/&nbsp;' + data.userTotalAns + '</strong></a>' +
                        '                                               <a href="" style="text-emphasis: none; color: #6C757D;font-size: 14px">&nbsp;题</a>\n' +
                        '                                        </h4>\n' +
                        '                                        <p class="mb-0 text-nowrap">\n' +
                        '                                            <span style="color: #6C757D">相比上一次答题</span>'
/*                    swiperHtml += '<div class="col-sm-6" style="padding: 10px 10px">\n' +
                        '                            <div class="card-body">\n' +
                        '                                <h5 class="text-muted">今日答题错误数</h5>\n' +
                        '                                <h3 class="text-h3"><a\n' +
                        '                                        style="color:#FA5C7C;text-decoration: none">' + data.userFalseAns + '&nbsp;</a>/&nbsp;' + data.userTotalAns + '<a\n' +
                        '                                        style="font-size: 14px;color: #6C757D;text-decoration: none">&nbsp;题</a></h3>\n' +
                        '                                <p class="test-muted">\n' +
                        '                                    <span class="text-info">相比上一次答题</span>';*/
                    if (data.falseRate > 0) {//错误率上升

                        swiperHtml+='<span class="text-false text-nowrap" style="color: #FA5C7C">\n' +
                            '                                                <i class="fa fa-arrow-up" aria-hidden="true"\n' +
                            '                                                   style="color: #FA5C7C"></i>&nbsp;&nbsp;' + Math.abs(data.falseRate) + '%\n' +
                            '                                            </span>\n' +
                            '                                        </p>\n' +
                            '                                    </div> <!-- end card-body-->\n' +
                            '                                </div> <!-- end card-->\n' +
                            '                            </div>';
                       /* swiperHtml += '<span class="text-false" style="color: #FA5C7C">&nbsp;\n' +
                            '                                        <i class="fa fa-arrow-up" aria-hidden="true" style="color:#FA5C7C"></i>&nbsp;&nbsp;' + Math.abs(data.falseRate) + '%</span>\n' +
                            '                                </p>\n' +
                            '                            </div>\n' +
                            '                        </div>';*/
                    } else {
                        swiperHtml+='<span class="text-false text-nowrap" style="color: rgb(10, 207, 151)">\n' +
                            '                                                <i class="fa fa-arrow-down" aria-hidden="true"\n' +
                            '                                                   style="color: rgb(10, 207, 151)"></i>&nbsp;&nbsp;' + Math.abs(data.falseRate) + '%\n' +
                            '                                            </span>\n' +
                            '                                        </p>\n' +
                            '                                    </div> <!-- end card-body-->\n' +
                            '                                </div> <!-- end card-->\n' +
                            '                            </div>'
                        /*swiperHtml += '<span class="text-false" style="color: rgb(10, 207, 151)">&nbsp;\n' +
                            '                                        <i class="fa fa-arrow-down" aria-hidden="true" style="color:rgb(10, 207, 151)"></i>&nbsp;&nbsp;' + Math.abs(data.falseRate) + '%</span>\n' +
                            '                                </p>\n' +
                            '                            </div>\n' +
                            '                        </div>';*/
                    }
                    swiperHtml+=' <div class="col-sm-6">\n' +
                        '                                <div class="card widget-flat">\n' +
                        '                                    <div class="card-body">\n' +
                        '                                        <div class="float-end">\n' +
                        '                                            <i class="mdi mdi-account-multiple widget-icon"></i>\n' +
                        '                                        </div>\n' +
                        '                                        <h6 class="text-muted" style="color: #6C757D">今日答题正确数</h6>\n' +
                        '                                        <h4 class="mt-3 mb-3" style="color: #6C757D"><strong style="color: rgb(10, 207, 151)">' + data.userCorrectAns + '</strong><a href="" style="text-decoration: none;color: #6C757D"><strong>&nbsp;/&nbsp;' + data.userTotalAns + '</strong></a>\n' +
                        '                                            <a href="" style="text-emphasis: none; color: #6C757D;font-size: 14px">&nbsp;题</a>\n' +
                        '                                        </h4>\n' +
                        '                                        <p class="mb-0 text-nowrap">\n' +
                        '                                            <span style="color: rgb(10, 207, 151)">相比上一次答题</span>';
                    /*swiperHtml += '\n' +
                        '                        <div class="col-sm-6" style="padding: 10px 10px">\n' +
                        '                            <div class="card-body">\n' +
                        '                                <h5 class="text-muted">今日答题正确数</h5>\n' +
                        '                                <h3 class="text-h3"><a style="color:rgb(10, 207, 151);text-decoration: none">' + data.userCorrectAns + '&nbsp;</a>/&nbsp;' + data.userTotalAns + '<a\n' +
                        '                                        style="font-size: 14px;color: #6C757D;text-decoration: none">&nbsp;题</a></h3>\n' +
                        '                                <p class="test-muted">\n' +
                        '                                    <span class="text-info">相比上一次答题</span>';*/
                    if (data.rightRate > 0) {
                        swiperHtml+='<span class="text-false text-nowrap" style="color: rgb(10, 207, 151)">\n' +
                            '                                                <i class="fa fa-arrow-up" aria-hidden="true"\n' +
                            '                                                   style="color: rgb(10, 207, 151)"></i>&nbsp;&nbsp;' + data.rightRate + '%\n' +
                            '                                            </span>\n' +
                            '                                        </p>\n' +
                            '                                    </div> <!-- end card-body-->\n' +
                            '                                </div> <!-- end card-->\n' +
                            '                            </div> <!-- end col-->';
/*                        swiperHtml += ' <span class="text-false" style="color: rgb(10, 207, 151)">&nbsp;<i\n' +
                            '                                            class="fa fa-arrow-up" aria-hidden="true"\n' +
                            '                                            style="color: rgb(10, 207, 151)"></i>&nbsp;&nbsp;' + data.rightRate + '%</span>\n' +
                            '                                </p>\n' +
                            '                            </div>\n' +
                            '                        </div>';*/
                    } else {
                        swiperHtml+='<span class="text-false text-nowrap" style="color: #FA5C7C">\n' +
                            '                                                <i class="fa fa-arrow-down" aria-hidden="true"\n' +
                            '                                                   style="color: #FA5C7C"></i>&nbsp;&nbsp;'+Math.abs(data.rightRate) +'%\n' +
                            '                                            </span>\n' +
                            '                                        </p>\n' +
                            '                                    </div> <!-- end card-body-->\n' +
                            '                                </div> <!-- end card-->\n' +
                            '                            </div> <!-- end col-->';
/*                        swiperHtml += ' <span class="text-false" style="color: #FA5C7C">&nbsp;<i\n' +
                            '                                            class="fa fa-arrow-down" aria-hidden="true"\n' +
                            '                                            style="color: #FA5C7C"></i>&nbsp;&nbsp;'+Math.abs(data.rightRate) +'%</span>\n' +
                            '                                </p>\n' +
                            '                            </div>\n' +
                            '                        </div>';*/
                    }
                } else {
                    swiperHtml+='<div class="col-sm-6">\n' +
                        '                                <div class="card widget-flat">\n' +
                        '                                    <div class="card-body">\n' +
                        '                                        <div class="float-end">\n' +
                        '                                            <i class="mdi mdi-account-multiple widget-icon"></i>\n' +
                        '                                        </div>\n' +
                        '                                        <h6 class="text-muted" style="color: #6C757D">今日答题错误数</h6>\n' +
                        '                                        <h4 class="mt-3 mb-3" style="color: #6C757D"><strong style="color: #FA5C7C">-</strong><a href="" style="text-decoration: none;color: #6C757D"><strong>&nbsp;/&nbsp;-</strong></a>\n' +
                        '                                            <a href="" style="text-emphasis: none; color: #6C757D;font-size: 14px">&nbsp;题</a>\n' +
                        '                                        </h4>\n' +
                        '                                        <p class="mb-0 text-nowrap">\n' +
                        '                                            <span style="color: #6C757D">今天还没有完成答题哦</span>\n' +
                        '                                        </p>\n' +
                        '                                    </div> <!-- end card-body-->\n' +
                        '                                </div> <!-- end card-->\n' +
                        '                            </div> <!-- end col-->\n' +
                        '                            <div class="col-sm-6">\n' +
                        '                                <div class="card widget-flat">\n' +
                        '                                    <div class="card-body">\n' +
                        '                                        <div class="float-end">\n' +
                        '                                            <i class="mdi mdi-account-multiple widget-icon"></i>\n' +
                        '                                        </div>\n' +
                        '                                        <h6 class="text-muted" style="color: #6C757D">本月练习天数</h6>\n' +
                        '                                        <h4 class="mt-3 mb-3" style="color: #6C757D"><strong style="color: rgb(10, 207, 151)">-</strong><a href="" style="text-decoration: none;color: #6C757D"><strong>&nbsp;/&nbsp;-</strong></a>\n' +
                        '                                            <a href="" style="text-emphasis: none; color: #6C757D;font-size: 14px">&nbsp;题</a>\n' +
                        '                                        </h4>\n' +
                        '                                        <p class="mb-0 text-nowrap">\n' +
                        '                                            <span style="color: #6C757D">今天还没有完成答题哦</span>\n' +
                        '                                        </p>\n' +
                        '                                    </div> <!-- end card-body-->\n' +
                        '                                </div> <!-- end card-->\n' +
                        '                            </div> <!-- end col-->';


                    /*swiperHtml += '<div class="col-sm-6" style="padding: 10px 10px">\n' +
                        '                            <div class="card-body">\n' +
                        '                                <h5 class="text-muted">今日答题错误数</h5>\n' +
                        '                                <h3 class="text-h3"><a\n' +
                        '                                        style="color:#FA5C7C;text-decoration: none">-&nbsp;</a>/&nbsp;-<a\n' +
                        '                                        style="font-size: 14px;color: #6C757D;text-decoration: none">&nbsp;题</a></h3>\n' +
                        '                                <p class="test-muted">\n' +
                        '                                    <span class="text-info">今天还没有完成答题哦</span>\n' +
                        '                                </p>\n' +
                        '                            </div>\n' +
                        '                        </div>\n' +
                        '\n' +
                        '                        <div class="col-sm-6" style="padding: 10px 10px">\n' +
                        '                            <div class="card-body">\n' +
                        '                                <h5 class="text-muted">今日答题正确数</h5>\n' +
                        '                                <h3 class="text-h3"><a style="color:rgb(10, 207, 151);text-decoration: none">-&nbsp;</a>/&nbsp;-<a\n' +
                        '                                        style="font-size: 14px;color: #6C757D;text-decoration: none">&nbsp;题</a></h3>\n' +
                        '\n' +
                        '                                <p class="test-muted">\n' +
                        '                                    <span class="text-info">今天还没有完成答题哦</span>\n' +
                        '                                </p>\n' +
                        '                            </div>\n' +
                        '                        </div>';*/
                }
                $('#chartTarget2').html(swiperHtml);

                swiperHtml = '';
                swiperHtml+='<canvas id="chart"></canvas>\n' +
                    '                                    <script>\n' +
                    '                                        var data = {\n' +
                    '                                            labels: [\''+(data.curMonth[1])+'月\', \''+(data.curMonth[2])+'月\', \''+(data.curMonth[3])+'月\', \''+(data.curMonth[4])+'月\', \''+(data.curMonth[5])+'月\', \''+(data.curMonth[6])+'月\'],\n' +
                    '                                            datasets: [{\n' +
                    '                                                label: "Dataset #1",\n' +
                    '                                                backgroundColor: [\n' +
                    '                                                    \'rgba(255, 99, 132, 0.2)\',\n' +
                    '                                                    \'rgba(54, 162, 235, 0.2)\',\n' +
                    '                                                    \'rgba(255, 206, 86, 0.2)\',\n' +
                    '                                                    \'rgba(75, 192, 192, 0.2)\',\n' +
                    '                                                    \'rgba(153, 102, 255, 0.2)\',\n' +
                    '                                                    \'rgba(255, 159, 64, 0.2)\'\n' +
                    '                                                ],\n' +
                    '                                                borderColor: [\n' +
                    '                                                    \'rgba(255, 99, 132, 1)\',\n' +
                    '                                                    \'rgba(54, 162, 235, 1)\',\n' +
                    '                                                    \'rgba(255, 206, 86, 1)\',\n' +
                    '                                                    \'rgba(75, 192, 192, 1)\',\n' +
                    '                                                    \'rgba(153, 102, 255, 1)\',\n' +
                    '                                                    \'rgba(255, 159, 64, 1)\'\n' +
                    '                                                ],\n' +
                    '                                                borderWidth: 2,\n' +
                    '                                                data: [' + data.timesData[1] + ', ' + data.timesData[2] + ', ' + data.timesData[3] + ', ' + data.timesData[4] + ', ' + data.timesData[5] + ', ' + data.timesData[6] + '],\n' +
                    '                                            }]\n' +
                    '                                        };\n' +
                    '\n' +
                    '                                        var options = {\n' +
                    '                                            responsive: true,\n' +
                    '                                            maintainAspectRatio: false,\n' +
                    '                                            layout: {\n' +
                    '                                                padding: {\n' +
                    '                                                    left: 0,\n' +
                    '                                                    right: 0,\n' +
                    '                                                    top: 0,\n' +
                    '                                                    bottom: 0\n' +
                    '                                                }\n' +
                    '                                            },\n' +
                    '                                            scales: {\n' +
                    '                                                xAxes: [{\n' +
                    '                                                    gridLines: {\n' +
                    '                                                        display:false\n' +
                    '                                                    }\n' +
                    '                                                }],\n' +
                    '                                                yAxes: [{\n' +
                    '                                                    gridLines: {\n' +
                    '                                                        display:false\n' +
                    '                                                    }\n' +
                    '                                                }]\n' +
                    '                                            }\n' +
                    '                                        };\n' +
                    '\n' +
                    '                                        new Chart(\'chart\', {\n' +
                    '                                            type: \'line\',\n' +
                    '                                            options: options,\n' +
                    '                                            data: data\n' +
                    '                                        });\n' +
                    '\n' +
                    '                                    </script>';

                $('#chartTarget3').html(swiperHtml);

                swiperHtml = '';
                swiperHtml+=' <canvas id="chart2" style="height: 300px"></canvas>\n' +
                    '                                        <script>\n' +
                    '                                            new Chart(document.getElementById("chart2"), {\n' +
                    '                                                type: \'line\',\n' +
                    '                                                data: {\n' +
                    '                                                    labels: [\''+(data.curMonth[1])+'月\', \''+(data.curMonth[2])+'月\', \''+(data.curMonth[3])+'月\', \''+(data.curMonth[4])+'月\', \''+(data.curMonth[5])+'月\', \''+(data.curMonth[6])+'月\'],\n' +
                    '                                                    datasets: [{\n' +
                    '                                                        label: \'正确率（%）\',\n' +
                    '                                                        backgroundColor: \'rgb(10, 207, 151,0.3)\',\n' +
                    '                                                        borderColor: \'rgb(10, 207, 151,0.3)\',\n' +
                    '                                                        data: [\n' +
                    '                                            ' + data.rateData[1] + ',\n' +
                    '                                            ' + data.rateData[2] + ',\n' +
                    '                                            ' + data.rateData[3] + ',\n' +
                    '                                            ' + data.rateData[4] + ',\n' +
                    '                                            ' + data.rateData[5] + ',\n' +
                    '                                            ' + data.rateData[6] + ',\n' +
                    '                                        ],\n' +
                    '                                                        fill: true,\n' +
                    '                                                    }]\n' +
                    '                                                },\n' +
                    '                                                options: {\n' +
                    '                                                    tension: 0.4,\n' +
                    '                                                    scales: {\n' +
                    '                                                        xAxes: [{\n' +
                    '                                                            gridLines: {\n' +
                    '                                                                display:false\n' +
                    '                                                            }\n' +
                    '                                                        }],\n' +
                    '                                                        yAxes: [{\n' +
                    '                                                            gridLines: {\n' +
                    '                                                                display:false\n' +
                    '                                                            }\n' +
                    '                                                        }]\n' +
                    '                                                    },\n' +
                    '                                                    maintainAspectRatio: false,\n' +
                    '                                                }\n' +
                    '                                            });\n' +
                    '                                        </script>';
                $('#chartTarget4').html(swiperHtml);

        }
    }, "json")
})
})