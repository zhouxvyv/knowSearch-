$(function () {
    var url = '/queryUserDPData';
    $(document).ready(function () {
        $.post(url, function (data) {
            if (data.result) {
                var dataDomainList=data.dataDomain;
                var swiperHtml = '';
                dataDomainList.map(function (item,index){
                    swiperHtml+='<div class="col-sm-6">\n' +
                        '                                <div class="card widget-flat">\n' +
                        '                                    <div class="card-body">\n' +
                        '                                        <div class="float-end">\n' +
                        '                                            <i class="mdi mdi-account-multiple widget-icon"></i>\n' +
                        '                                        </div>\n' +
                        '                                        <h6 class="text-muted" style="color: #6C757D">本月练习天数</h6>\n' +
                        '                                        <h4 class="mt-3 mb-3" style="color: #6C757D"><strong>' + item.practiceTime + '</strong><a\n' +
                        '                                                style="font-size: 14px;color: #6C757D;text-decoration: none">&nbsp;天</a>\n' +
                        '                                        </h4>\n' +
                        '                                        <p class="mb-0 text-nowrap">\n' +
                        '                                            <span style="color: #6C757D">相比上个月</span>'

                    if (item.ptRate > 0) {
                        swiperHtml+='<span class="text-false text-nowrap" style="color: rgb(10, 207, 151)">\n' +
                            '                                                <i class="fa fa-arrow-up" aria-hidden="true"\n' +
                            '                                                   style="color: rgb(10, 207, 151)"></i>&nbsp;&nbsp;' + item.ptRate + '%\n' +
                            '                                            </span>\n' +
                            '                                        </p>\n' +
                            '                                    </div> <!-- end card-body-->\n' +
                            '                                </div> <!-- end card-->\n' +
                            '                            </div>';

                    } else {
                        swiperHtml+='<span class="text-false text-nowrap" style="color: #FA5C7C">\n' +
                            '                                                <i class="fa fa-arrow-down" aria-hidden="true"\n' +
                            '                                                   style="color: #FA5C7C"></i>&nbsp;&nbsp;' +Math.abs( item.ptRate) + '%\n' +
                            '                                            </span>\n' +
                            '                                        </p>\n' +
                            '                                    </div> <!-- end card-body-->\n' +
                            '                                </div> <!-- end card-->\n' +
                            '                            </div>'

                    }
                    swiperHtml+='<div class="col-sm-6">\n' +
                        '                                <div class="card widget-flat">\n' +
                        '                                    <div class="card-body">\n' +
                        '                                        <div class="float-end">\n' +
                        '                                            <i class="mdi mdi-account-multiple widget-icon"></i>\n' +
                        '                                        </div>\n' +
                        '                                        <h6 class="text-muted" style="color: #6C757D">累计正确率</h6>\n' +
                        '                                        <h4 class="mt-3 mb-3" style="color: #6C757D"><strong>' + Math.abs(item.totalRate) + '</strong><a\n' +
                        '                                                style="font-size: 14px;color: #6C757D;text-decoration: none">&nbsp;%</a>\n' +
                        '                                        </h4>\n' +
                        '                                        <p class="mb-0 text-nowrap">\n' +
                        '                                            <span style="color: #6C757D">相比上个月</span>';

                    if (item.totalSCRate > 0) {
                        swiperHtml+='<span class="text-false text-nowrap" style="color: rgb(10, 207, 151)">\n' +
                            '                                                <i class="fa fa-arrow-up" aria-hidden="true"\n' +
                            '                                                   style="color: rgb(10, 207, 151)"></i>&nbsp;&nbsp;'+item.totalSCRate+'%\n' +
                            '                                            </span>\n' +
                            '                                        </p>\n' +
                            '                                    </div> <!-- end card-body-->\n' +
                            '                                </div> <!-- end card-->\n' +
                            '                            </div>';

                    } else {
                        swiperHtml+='<span class="text-false text-nowrap" style="color: #FA5C7C">\n' +
                            '                                                <i class="fa fa-arrow-down" aria-hidden="true"\n' +
                            '                                                   style="color: #FA5C7C"></i>&nbsp;&nbsp;'+Math.abs(itema.totalSCRate)+'%\n' +
                            '                                            </span>\n' +
                            '                                        </p>\n' +
                            '                                    </div> <!-- end card-body-->\n' +
                            '                                </div> <!-- end card-->\n' +
                            '                            </div>'

                    }
                    $('#chartTarget1').html(swiperHtml);
                    swiperHtml = '';
                    if (item.state > 0) {
                        swiperHtml+='<div class="col-sm-6">\n' +
                            '                                <div class="card widget-flat">\n' +
                            '                                    <div class="card-body">\n' +
                            '                                        <div class="float-end">\n' +
                            '                                            <i class="mdi mdi-account-multiple widget-icon"></i>\n' +
                            '                                        </div>\n' +
                            '                                        <h6 class="text-muted" style="color: #6C757D">今日答题错误数</h6>\n' +
                            '                                        <h4 class="mt-3 mb-3" style="color: #6C757D"><strong style="color:#FA5C7C">' + item.userFalseAns + '</strong><a href="" style="text-decoration: none;color: #6C757D"><strong>&nbsp;/&nbsp;' + item.userTotalAns + '</strong></a>' +
                            '                                               <a href="" style="text-emphasis: none; color: #6C757D;font-size: 14px">&nbsp;题</a>\n' +
                            '                                        </h4>\n' +
                            '                                        <p class="mb-0 text-nowrap">\n' +
                            '                                            <span style="color: #6C757D">相比上一次答题</span>'

                        if (item.falseRate > 0) {//错误率上升

                            swiperHtml+='<span class="text-false text-nowrap" style="color: #FA5C7C">\n' +
                                '                                                <i class="fa fa-arrow-up" aria-hidden="true"\n' +
                                '                                                   style="color: #FA5C7C"></i>&nbsp;&nbsp;' + Math.abs(item.falseRate) + '%\n' +
                                '                                            </span>\n' +
                                '                                        </p>\n' +
                                '                                    </div> <!-- end card-body-->\n' +
                                '                                </div> <!-- end card-->\n' +
                                '                            </div>';

                        } else {
                            swiperHtml+='<span class="text-false text-nowrap" style="color: rgb(10, 207, 151)">\n' +
                                '                                                <i class="fa fa-arrow-down" aria-hidden="true"\n' +
                                '                                                   style="color: rgb(10, 207, 151)"></i>&nbsp;&nbsp;' + Math.abs(item.falseRate) + '%\n' +
                                '                                            </span>\n' +
                                '                                        </p>\n' +
                                '                                    </div> <!-- end card-body-->\n' +
                                '                                </div> <!-- end card-->\n' +
                                '                            </div>'

                        }
                        swiperHtml+=' <div class="col-sm-6">\n' +
                            '                                <div class="card widget-flat">\n' +
                            '                                    <div class="card-body">\n' +
                            '                                        <div class="float-end">\n' +
                            '                                            <i class="mdi mdi-account-multiple widget-icon"></i>\n' +
                            '                                        </div>\n' +
                            '                                        <h6 class="text-muted" style="color: #6C757D">今日答题正确数</h6>\n' +
                            '                                        <h4 class="mt-3 mb-3" style="color: #6C757D"><strong style="color: rgb(10, 207, 151)">' + item.userCorrectAns + '</strong><a href="" style="text-decoration: none;color: #6C757D"><strong>&nbsp;/&nbsp;' + item.userTotalAns + '</strong></a>\n' +
                            '                                            <a href="" style="text-emphasis: none; color: #6C757D;font-size: 14px">&nbsp;题</a>\n' +
                            '                                        </h4>\n' +
                            '                                        <p class="mb-0 text-nowrap">\n' +
                            '                                            <span style="color: rgb(10, 207, 151)">相比上一次答题</span>';

                        if (data.rightRate > 0) {
                            swiperHtml+='<span class="text-false text-nowrap" style="color: rgb(10, 207, 151)">\n' +
                                '                                                <i class="fa fa-arrow-up" aria-hidden="true"\n' +
                                '                                                   style="color: rgb(10, 207, 151)"></i>&nbsp;&nbsp;' + item.rightRate + '%\n' +
                                '                                            </span>\n' +
                                '                                        </p>\n' +
                                '                                    </div> <!-- end card-body-->\n' +
                                '                                </div> <!-- end card-->\n' +
                                '                            </div> <!-- end col-->';

                        } else {
                            swiperHtml+='<span class="text-false text-nowrap" style="color: #FA5C7C">\n' +
                                '                                                <i class="fa fa-arrow-down" aria-hidden="true"\n' +
                                '                                                   style="color: #FA5C7C"></i>&nbsp;&nbsp;'+Math.abs(item.rightRate) +'%\n' +
                                '                                            </span>\n' +
                                '                                        </p>\n' +
                                '                                    </div> <!-- end card-body-->\n' +
                                '                                </div> <!-- end card-->\n' +
                                '                            </div> <!-- end col-->';

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

                    }
                    $('#chartTarget2').html(swiperHtml);

                    swiperHtml = '';
                    var actData=item.timesData.split('/');
                    swiperHtml+='<canvas id="chart"></canvas>\n' +
                        '                                    <script>\n' +
                        '                                        var data = {\n' +
                        '                                            labels: [\''+(data.curMonth[1])+'月\', \''+(data.curMonth[2])+'月\', \''+(data.curMonth[3])+'月\', \''+(data.curMonth[4])+'月\', \''+(data.curMonth[5])+'月\', \''+(data.curMonth[6])+'月\'],\n' +
                        '                                            datasets: [{\n' +
                        '                                                label: "练习次数（次/月）",\n' +
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
                        '                                                        hoverBackgroundColor: "rgb(10, 207, 151,0.3)",\n' +
                        '                                                        hoverBorderColor: "rgb(10, 207, 151,0.3)",\n' +
                        '                                                borderWidth: 2,\n' +
                        '                                                data: [' + actData[0] + ', ' + actData[1] + ', ' + actData[2] + ', ' + actData[3] + ', ' + actData[4] + ', ' + actData[5] + '],\n' +
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
                    var actRate=item.rateData.split('/');
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
                        '                                                        hoverBackgroundColor: "rgb(10, 207, 151,0.3)",\n' +
                        '                                                        hoverBorderColor: "rgb(10, 207, 151,0.3)",\n' +
                        '                                                        data: [\n' +
                        '                                            ' + actRate[0] + ',\n' +
                        '                                            ' + actRate[1] + ',\n' +
                        '                                            ' + actRate[2] + ',\n' +
                        '                                            ' + actRate[3] + ',\n' +
                        '                                            ' + actRate[4] + ',\n' +
                        '                                            ' + actRate[5] + ',\n' +
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

                    swiperHtml=' ';
                    swiperHtml+='<canvas id="chart3"></canvas>\n' +
                        '                                            <script>\n' +
                        '                                                var data = {\n' +
                        '                                                    labels: ["微积分", "向量", "定积分", "极限", "多重积分", "多元函数"],\n' +
                        '                                                    datasets: [{\n' +
                        '                                                        label: "",\n' +
                        '                                                        backgroundColor: "#cdb3fd85",\n' +
                        '                                                        borderColor: "#885be4",\n' +
                        '                                                        borderWidth: 2,\n' +
                        '                                                        hoverBackgroundColor: "#cdb3fd85",\n' +
                        '                                                        hoverBorderColor: "#885be4",\n' +
                        '                                                        data: [79, 95, 90, 81, 56, 55],\n' +
                        '                                                    }]\n' +
                        '                                                };\n' +
                        '\n' +
                        '                                                var options = {\n' +
                        '                                                    maintainAspectRatio: false,\n' +
                        '\n' +
                        '                                                    scales: {\n' +
                        '                                                        r: {\n' +
                        '                                                            angleLines: {\n' +
                        '                                                                display: false\n' +
                        '                                                            },\n' +
                        '                                                            suggestedMin: 20,\n' +
                        '                                                            suggestedMax: 100\n' +
                        '                                                        }\n' +
                        '                                                    },\n' +
                        '                                                    legend: {\n' +
                        '                                                        display: false\n' +
                        '                                                    },\n' +
                        '                                                    "elements": {"line": {"tension": 0, "borderWidth": 3}},\n' +
                        '                                                    plugins: {\n' +
                        '                                                        legend: {\n' +
                        '                                                            display: false,\n' +
                        '                                                        }\n' +
                        '                                                    },\n' +
                        '                                                    layout: {\n' +
                        '                                                        padding: {\n' +
                        '                                                            left: 0,\n' +
                        '                                                            right: 0,\n' +
                        '                                                            top: 20,\n' +
                        '                                                            bottom: 0,\n' +
                        '                                                        }\n' +
                        '                                                    },\n' +
                        '                                                };\n' +
                        '\n' +
                        '                                                new Chart(\'chart3\', {\n' +
                        '                                                    type: \'radar\',\n' +
                        '                                                    options: options,\n' +
                        '                                                    data: data\n' +
                        '                                                });\n' +
                        '\n' +
                        '                                            </script>';
                    $('#chartTarget5').html(swiperHtml);
                });


            }
        }, "json")
    })
})