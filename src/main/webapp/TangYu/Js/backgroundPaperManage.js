$(function () {
    //去首页
    to_page(1);
});

function to_page(pn) {
    $.ajax({
        url: "/selectPaperlistServlet",
        data: "pn=" + pn,
        type: "GET",
        success: function (result) {
            var data = result.page.list;
            console.log(data);
            for (var i = 0; i < data.length; i++) {
                var Que = new creatQue(data[i].testId, data[i].testName, data[i].subjectId,data[i].likeCount,data[i].state)
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

function creatQue(ID, name, subject,likeCount, state) {
    this.ID = ID;
    this.name = name;
    this.subject = "高等数学";
    this.likeCount =likeCount ;
    this.state = state;
    return this;
}

creatQue.prototype = {
    initFullTable: function () {
        var fullStr = '<tr class="ui-state-default">\n' +
            '                                    <td id="' + this.ID + '">' + this.ID + '</td>\n' +//id
            '                                    <td id="info' + this.ID + '" class="queInfoManage">' + this.name + '</td>\n' +//name
            '                                    <td id="subject' + this.ID + '" style="text-align: center">' + this.subject + '</td>\n' +//subject
            '                                    <td style="text-align: center">' + this.likeCount + '</td>';//likes
        //state==1 已上线
        //state==0 停用
        if (this.state === 1) {
            fullStr += ' <td style="text-align: center" id="state'+this.ID+'" ><span style="text-align: center" class="zhifou-dot dot-online"></span> 已上线</td>';
        } else {
            fullStr += '<td style="text-align: center" id="state'+this.ID+'"><span style="text-align: center" class="zhifou-dot dot-offline"></span> 停用</td>';
        }
        fullStr += '                                    <td id="op'+this.ID+'" style="text-align: center">';
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

function setTestState1(id){
    $.ajax({
        url:"/updatePaperStateServlet",
        data: {state:0,testId: id},
        type: "GET",
        success: function (result) {
            var stateId="#state"+id;
            var opId="#op"+id;
            var str='<span style="text-align: center" class="zhifou-dot dot-offline"></span> 停用';
            $(stateId).empty();
            $(stateId).append(str);
            $(opId).empty();
            $(opId).append('<a href="#" id="preview' + id + '" onclick="setTestState0(' + id + ')" style="padding-left: 10px;color: #0ea759">上线</a>')
        }
    })

}

function setTestState0(id){
    $.ajax({
        url:"/updatePaperStateServlet",
        data: {state:1,testId: id},
        type: "GET",
        success: function (result) {
            var stateId="#state"+id;
            var opId="#op"+id;
            var str='<span style="text-align: center" class="zhifou-dot dot-online"></span> 已上线';
            $(stateId).empty();
            $(stateId).append(str);
            $(opId).empty();
            $(opId).append('<a href="#" id="preview' + id + '" onclick="setTestState1(' + id + ')" style="padding-left: 10px;color: red">停用</a>')
        }
    })

}