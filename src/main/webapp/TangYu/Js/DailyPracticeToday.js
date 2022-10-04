$(function (){
    var url='/DailyPracticeTodaySpringMVC';
    $(document).ready(function (){
        $.get(url,function (data){
            if(data.result){
                var swiperHtml='';
                swiperHtml+='<div class="row align-items-center mt-5" style="padding-left: 80px" >\n' +
                    '                            <div class="col-lg-6">\n' +
                    '                                <p class="col-md-12 d-none d-lg-block" style="font-size: 60px ;padding-left: 0px"><strong>行 动 ,\n' +
                    '                                    趁 现 在</strong></p>\n' +
                    '                                <span class="col-xs-12 d-none d-lg-block mt-4" style="font-size: 30px ;padding-left: 0px;">\n' +
                    '                                <strong>有花堪折直需折，莫待无花空折枝</strong>\n' +
                    '                                 </span>\n' +
                    '                                <div class="col-sm-12 mt-5"\n' +
                    '                                     style="border:solid 2px #dee2e6;position: relative;padding: 1rem;margin: 1rem -1.25rem 0;border: solid #dee2e6;border-width: 1px;border-radius: 0.5rem">\n' +
                    '                                    <div style="padding:15px 15px ;">\n' +
                    '                                    <span style="color: #6C757D; font-size: 16px"><strong>已开启今日<span\n' +
                    '                                            style="color: #5599e0;font-size: 17px">&nbsp;高等数学&nbsp;</span>练习</strong></span>\n' +
                    '                                    </div>\n' +
                    '\n' +
                    '                                    <div class="row justify-content-md-center">\n' +
                    '                                        <button id="bt1" type="button" class="btn rounded badge p-2 "\n' +
                    '                                                style="background-color: #68ad6e;width: 20%;padding-left: 40%">立即返回练习&nbsp;&nbsp;&nbsp;<i\n' +
                    '                                                class="fa fa-arrow-circle-right" aria-hidden="true"></i></button>\n' +
                    '                                    </div>\n' +
                    '                                </div>\n' +
                    '\n' +
                    '                            </div>\n' +
                    '                            <div class="col-md-10 col-lg-6">\n' +
                    '                                <img src="../image/7.png" alt="" width="400" style=";padding-left: 15px">\n' +
                    '                            </div>\n' +
                    '                        </div>';
                swiperHtml+='<script type="text/javascript">\n' +
                    '    $(\n' +
                    '        $("#bt1").click(function (){\n' +
                    '            var nowDate = new Date();\n' +
                    '            var month = nowDate.getMonth() + 1;\n' +
                    '            var day = nowDate.getDate();\n' +
                    '            month = (month.toString().length == 1) ? ("0" + month) : month;\n' +
                    '            day = (day.toString().length == 1) ? ("0" + day) : day;\n' +
                    '            var targetDay = nowDate.getFullYear() + \'-\' + month + \'-\' + day;\n' +
                    '            var URL=\'practice.html\'+\'?date=\'+targetDay;\n' +
                    '            window.location.replace(URL);\n' +
                    '        })\n' +
                    '    )\n' +
                    '</script>';
                $('#dpMain').html(swiperHtml);
            }
        },"json")

    })
})