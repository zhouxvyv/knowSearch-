const month_olypic = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];//闰年每个月份的天数
const month_normal = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const month_name = ["January", "Febrary", "March", "April", "May", "June", "July", "Auguest", "September", "October", "November", "December"];
//获取以上各个部分的id
const holder = document.getElementById("days");
const prev = document.getElementById("prev");
const next = document.getElementById("next");
const ctitle = document.getElementById("calendar-title");
const cyear = document.getElementById("calendar-year");
//获取当天的年月日
const my_date = new Date();
let my_year = my_date.getFullYear();//获取年份
let my_month = my_date.getMonth(); //获取月份，一月份的下标为0
const my_day = my_date.getDate();//获取当前日期

//根据年月获取当月第一天是周几
function dayStart(month,year){
    const tmpDate = new Date(year, month, 1);
    return (tmpDate.getDay());
}
//根据年份判断某月有多少天(11,2018),表示2018年12月
function daysMonth(month, year){
    const tmp1 = year % 4;
    const tmp2 = year % 100;
    const tmp3 = year % 400;

    if((tmp1 == 0 && tmp2 != 0) || (tmp3 == 0)){
        return (month_olypic[month]);//闰年
    }else{
        return (month_normal[month]);//非闰年
    }
}
//js实现str插入li+class,不要忘了用innerhtml进行插入
function refreshDate(){
    let i;
    let str = "";
    //计算当月的天数和每月第一天都是周几，day_month和day_year都从上面获得
    const totalDay = daysMonth(my_month, my_year);
    const firstDay = dayStart(my_month, my_year);
    //添加每个月的空白部分
    for(let i = 0; i < firstDay; i++){
        str += "<li>"+"</li>";
    }

    //从一号开始添加知道totalDay，并为pre，next和当天添加样式
    let myclass;
    for(let i = 1; i <= totalDay; i++){
        //三种情况年份小，年分相等月份小，年月相等，天数小
        //点击pre和next之后，my_month和my_year会发生变化，将其与现在的直接获取的再进行比较
        //i与my_day进行比较,pre和next变化时，my_day是不变的
        console.log(my_year+" "+my_month+" "+my_day);
        console.log(my_date.getFullYear()+" "+my_date.getMonth()+" "+my_date.getDay());
        if((my_year < my_date.getFullYear())||(my_year == my_date.getFullYear() && my_month < my_date.getMonth()) || (my_year == my_date.getFullYear() && my_month == my_date.getMonth() && i < my_day)){
            myclass = " class='lightgrey'";
        }else if(my_year == my_date.getFullYear() && my_month == my_date.getMonth() && i == my_day){
            myclass = "class = 'green greenbox'";
        }else{
            myclass = "class = 'darkgrey'";
        }
        str += "<li "+myclass+">"+i+"</li>";
    }
    holder.innerHTML = str;
    ctitle.innerHTML = month_name[my_month];
    cyear.innerHTML = my_year;
}
//调用refreshDate()函数，日历才会出现
refreshDate();
//实现onclick向前或向后移动
pre.onclick = function(e){
    e.preventDefault();
    my_month--;
    if(my_month < 0){
        my_year--;
        my_month = 11; //即12月份
    }
    refreshDate();
}

next.onclick = function(e){
    e.preventDefault();
    my_month++;
    if(my_month > 11){
        my_month = 0;
        my_year++;
    }
    refreshDate();
}