init();
function init(){
    var t1=$("#t1");
    var t2=$("#t2");
    t2.hide();
    t1.show();
}
$("#c1").click(function (){
    var t1=$("#t1");
    var t2=$("#t2");
    var c1=$("#c1");
    c1.css("border-bottom","2px solid blue")
    var c2=$("#c2");
    c2.css("border-bottom","0px")
    t2.hide();
    t1.show();
})
$("#c2").click(function (){
    var t1=$("#t1");
    var t2=$("#t2");
    var c1=$("#c1");
    c1.css("border-bottom","0px")
    var c2=$("#c2");
    c2.css("border-bottom","2px solid blue")
    t1.hide();
    t2.show();
})
