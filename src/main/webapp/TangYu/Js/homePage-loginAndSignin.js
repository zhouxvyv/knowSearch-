function isOkNo() {

    var no = $("#submit_no").val()
    if (no === undefined || no.length === 0) {
        $("#submit_no_alert").text("用户名不能为空..")
        console.log(no)
        return false
    } else if (no.length < 6) {
        $("#submit_no_alert").text("用户名格式不规范,不能少于六位..")
        return false
    }
    $("#submit_no_alert").text("")
    return true

}

function isOkPwd() {
    var pwd = $("#submit_pwd").val()
    if (pwd === undefined || pwd.length === 0) {
        $("#submit_pwd_alert").text("密码不能为空..")
        return false
    } else if (pwd.length < 6) {
        $("#submit_pwd_alert").text("密码不能少于6位..")
        return false
    }

    $("#submit_pwd_alert").text("")

    return true;
}

function checkLogin() {
    var okNo = isOkNo()
    var okPwd = isOkPwd()
    /*if (!okNo) {
        flickerNo = 0
        flickerNoRun = setInterval(function () {
            var nowColor = $("#submit_no")[0].style.borderColor
            console.log(nowColor)
            if (flickerNo == 5)
                clearInterval(flickerNoRun)
            if (nowColor === "red")
                $("#submit_no").css("border-color", "#88ddee")
            else $("#submit_no").css("border-color", "red")
            flickerNo++
        }, 200)
    }
    if (!okPwd) {
        flickerPwd = 0
        flickerPwdRun = setInterval(function () {
            var nowColor = $("#submit_pwd")[0].style.borderColor
            console.log(nowColor)
            if (flickerPwd == 5)
                clearInterval(flickerPwdRun)
            if (nowColor === "red")
                $("#submit_pwd").css("border-color", "#88ddee")
            else $("#submit_pwd").css("border-color", "red")
            flickerPwd++
        }, 200)
    }*/
    if (isOkNo() && isOkPwd()) {
        submitLogin()
    }
}

function submitLogin() {
    $.ajax({
        url: "/loginServlet.Servlet",
        type: "post",
        dataType: "json",
        data: {
            userName: $("#submit_no").val(),
            pwd: $("#submit_pwd").val(),
            code: $("#submit_code").val(),
            keep: keep
        },
        success: function (data) {
            console.log(data)
            if (data.success) {
                window.location.href="../html/homePage.html"
                backToTheEnd()
                userInitialization()
            } else {
                $("#submit_pwd_alert").text(data.message)
                turnImageCode()
            }
        }
    })
}

function changeInputType(){
    if($("#submit_pwd").get(0).getAttribute("type")==="password"){
        $("#submit_pwd").get(0).setAttribute("type","text");
        $("#eyes").get(0).setAttribute("class","fa fa-eye")
    }else{
        $("#submit_pwd").get(0).setAttribute("type","password");
        $("#eyes").get(0).setAttribute("class","fa fa-eye-slash")
    }
}