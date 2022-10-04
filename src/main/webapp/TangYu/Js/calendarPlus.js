$(function(){
    var liList=new Array();
    liList=$(".actTarget");
    var date=new Date();
    var month=date.getMonth();
    var year=date.getFullYear();

    var days=0;
    if(month==2){
        var b1 = year%4==0;
        var b2 = year%100!=0;
        var b3 = year%400==0;
        if(b1&&b2||b3){
            days=29;
        }else{
            days=28;
        }
    }else{
        if(month==1||month==3||month==5||month==7||month==8||month==10||month==12)
            days=31;
        else{
            days=30;
        }
    }
    month=month+1;
    $.post("/queryDPDays", {month: month,year: year}, function (data) {
        for(var i=0;i<31;i++){
            if(data[i]==1){
                var tmp=days+i-1;
                $(".actTarget:eq("+tmp+")").addClass('selected');
            }
        }
    })
    var month2=date.getMonth();
    var month2=month2+1;
    var year2=date.getFullYear();
    if(month2==1){
        month2=12;
        year2=year2-1;
    }else{
        month2=month2-1;
    }
    $.post("/queryDPDays", {month: month2,year: year2}, function (data) {
        for(var i=0;i<31;i++){
            if(data[i]===1){
                $(".actTarget:eq("+(i-1)+")").addClass('selected');
            }
        }
    })
    /*var month3=date.getMonth();
    var month3=month3+1;
    var year3=date.getFullYear();
    if(month3==12){
        month3=1;
        year3=year3+1;
    }else{
        month3=month3+1;
    }
    alert("month3 is :"+month3)
    alert("year3 is :"+year3)
    $.post("/queryDPDays", {month: month3,year: year3}, function (data) {
        for(var i=0;i<31;i++){
            if(data[i]==1){
                console.log($(".actTarget"));
                $(".actTarget:eq("+i+")").addClass('selected');
            }
        }
    })*/


})
function sleep (time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}


function reloadDays(){
    var liList=new Array();
    liList=$(".actTarget");
    var str=$(".calendar-display:eq(0)").text();
    var ary=str.split('/');
    var year=Number(ary[0]);

    var month=Number(ary[1]);
    if(month==1){
        month=11;
        year=year-1;
    }else if (month==2){
        month=12;
        year=year-1;
    }else{
        month=month-2;
    }
    // 用法
    sleep(500).then(() => {

        month=month;
        $.post("/queryDPDays", {month: month,year: year}, function (data) {
            for(var i=0;i<31;i++){
                if(data[i]==1){
                    console.log($(".actTarget"));
                    $(".actTarget:eq("+(i-1)+")").addClass('selected');
                }
            }
        })
    })
}

function reloadDays2(){
    var liList=new Array();
    liList=$(".actTarget");
    var str=$(".calendar-display:eq(0)").text();
    var ary=str.split('/');
    var year=Number(ary[0]);
    var month=Number(ary[1]);
    if(month==12){
        month=2;
        year=year+1;
    }else if (month==11){
        month=1;
        year=year+1;
    } else{
        month=month+2;
    }
    var days=0;
    if(((month+1)-2)==2){
        var b1 = year%4==0;
        var b2 = year%100!=0;
        var b3 = year%400==0;
        if(b1&&b2||b3){
            days=29;
        }else{
            days=28;
        }
    }else{
        if((month+1)==1||(month+1)==3||(month+1)==5||(month+1)==7||(month+1)==8||(month+1)==10||(month+1)==12)
            days=31;
        else{
            days=30;
        }
    }
    if((month-2)==2){
        b1 = year%4==0;
        b2 = year%100!=0;
        b3 = year%400==0;
        if(b1&&b2||b3){
            days=days+29;
        }else{
            days=days+28;
        }
    }else{
        if(month==1||month==3||month==5||month==7||month==8||month==10||month==12)
            days=days+31;
        else{
            days=days+30;
        }
    }
    sleep(500).then(() => {
        $.post("/queryDPDays", {month: month,year: year}, function (data) {
            for(var i=0;i<31;i++){
                if(data[i]==1){
                    var tmp=days+i-1;
                    $(".actTarget:eq("+tmp+")").addClass('selected');
                }
            }
        })
    })

}
