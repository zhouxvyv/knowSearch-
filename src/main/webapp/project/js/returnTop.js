$("#top").hide();
$(window).bind('scroll',function(){
    if($(window).scrollTop()<=200){
        $("#top").hide();
    }else{
        $("#top").show();
    }
});
$("#top").click(function (){
    $("html,body").animate({scrollTop:0}, 200);
})