/*点击提交按钮,搜索内容*/
$("#submit").click(function (){
    var text = $("#text").val()
    toSearch(text)
})

/*提交搜索*/
var toSearch = function (text){
    //清除文件
    $("#file").val("")
    //清除输入框,保留内容,解决无输入
    if(text == undefined) text = ""
    $("#text").val("")
    text = text.replace(/[{}^_\|`]/g,"")
    if(text.length<2){
        alert("请不要输入太短内容")
        return;
    }
    //跳转至结果页面
    window.open("topicResultPage.html?text="+text)
}

/*点击文件图标,触发图片选择*/
$("#select-file").click(function (){
    $("#file").trigger("click")
})

/*图片选择好后,立即上传,请求结果,并提交搜索*/
$("#file").change(function (){
    var formData = new FormData();
    formData.append("file",$("#file")[0].files[0]);
    $.ajax({
        url:'/readFileServlet.Servlet',
        type:'post',
        data: formData,
        contentType: false,
        processData: false,
        success:function(res){
            if(res.success){
                //填充输入框
                $("#text").val(res.key)
                //提交搜索
                toSearch(res.key)
            }else{
                //提示出错
                alert("图片识别失败...")
            }
        }
    })
})


