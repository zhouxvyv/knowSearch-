var head=$("#head");
var show='';
$.post("/acquire.action",function (data){
    if(data.success)
    {
        show='<div style="float: left;padding-left: 37px;padding-top: 2px;padding-bottom: 5px">\n' +
            '      <img id="return1" class="img1" src="../image/loge1.png" style="height: 38px;width: 87px">\n' +
            '      <span class="form-a">个人中心</span>\n' +
            '    </div>\n' +
            '    <div style="float: right;padding-right: 50px;padding-top: 10px">\n' +
            '      <!--<a class="home" href="../../index3/html/home.html">首页</a>-->\n' +
            '      <img class="form" id="headAvatar" src="'+data.list[0].avatar+'">\n' +
            '      <span class="form-text">'+data.list[0].userName+'</span>\n' +
            '    </div>'
    }

    head.html(show);
    setTimeout(function (){
        $("#return1").click(function (){
            location.href="/TangYu/html/homePage.html";
        })
    },200)
})

$.post("/acquire.action",function (data){
    if(data.success){
        var list=data.list;
        var msg='';
        $.map(list,function (item,index){
            msg='<div class="row" style="width: 1030px;height: 200px;background: white">\n' +
                '      <div class="row" style="padding-left: 20px;padding-top: 30px">\n' +
                '        <div ><img   id="header" src="'+item.avatar+'" class="avatar"><form action="/user/updateAvatar.action" method="post" enctype="multipart/form-data" id="form" ><input style="display: none" type="file" name="file"  id="files"/></form>\n' +
                '          <div style="float: left;">\n' +
                '            <div class="name" id="username">'+item.userName+'</div>\n' +
                '          </div>\n' +
                '        </div>\n' +
                '      </div>\n' +
                '      <div class="row below">\n' +
                '      <div style="float: left">个人积分</div>\n' +
                '      <div style="float: left;padding-left: 20px">100</div>\n' +
                '      <div style="float:left;padding-left: 30px"><button class="btn1">去获得</button></div>\n' +
                '    </div>\n' +
                '    </div>\n' +
                '    <div class="row " style="width: 1030px;background-color: white;margin-top: 20px">\n' +
                '      <div class="head">基本信息：</div>\n' +
                '      <div class="shadow1" id="li-setting" style="background-color: whitesmoke">\n' +
                '        <div style="float: right;padding-top:10px;padding-right: 20px;cursor: pointer;font-size: 15px;color: #0a53be" id="update">修改</div>\n' +
                '        <ul>\n' +
                '          <li >\n' +
                '            <div>\n' +
                '              <div style="float: left;" >用户昵称：</div>\n' +
                '              <div style="float: left;padding-left: 20px"><input id="name"  disabled type="text" value="'+item.userName+'"></div>\n' +
                '            </div>\n' +
                '          </li>\n' +
                '          <li>\n' +
                '            <div style="float: left ">\n' +
                '              <div style="float: left">出生日期：</div>\n' +
                '              <div style="float: left;padding-left: 20px;display: inline"><input id="birthday" disabled type="text" value="'+item.birthday+'"></div>\n' +
                '            </div>\n' +
                '          </li>\n' +
                '          <li>\n' +
                '            <div style="float: left">\n' +
                '              <div style="float: left">文化程度：</div>\n' +
                '              <div style="float: left;padding-left: 20px"><input id="grade" disabled type="text" value="'+item.grade+'"></div>\n' +
                '            </div>\n' +
                '          </li>\n' +
                '          <li>\n' +
                '            <div style="float: left">\n' +
                '              <div style="float: left">所在地区：</div>\n' +
                '              <div style="float: left;padding-left: 20px"><input id="hometown" disabled type="text" value="'+item.hometown+'"></div>\n' +
                '            </div>\n' +
                '          </li>\n' +
                '          <li>\n' +
                '            <div style="float: left">\n' +
                '              <div style="float: left">个人简介：</div>\n' +
                '              <div style="float: left;padding-left: 20px"><input id="setting" disabled type="text" value="'+item.setting+'"></div>\n' +
                '            </div>\n' +
                '          </li>\n' +
                '        </ul>\n' +
                '      </div>\n' +
                '    </div>'
        })
        $("#content").html(msg);
        setTimeout(function (){
            $("#header").click(function (){
                $("#files").trigger("click");
            })
            $("#files").change(function (){
                var formData = new FormData();
                formData.append("uploadFile",$("#files")[0].files[0]);
                $.ajax({
                    url:'/user/updateAvatar.action',
                    type:'post',
                    data: formData,
                    contentType: false,
                    processData: false,
                    success:function(res){
                        var head=$("#header");
                        if(res.success){
                            head.attr("src",res.path);
                            $("#headAvatar").attr("src",res.path);
                        }else{
                            alert("上传失败")
                        }
                    }
                })

            })

        },)
    }
    $("#update").click(function (){
        var update=$("#update")
        var name=$("#name");
        var birthday=$("#birthday");
        var grade=$("#grade");
        var hometown=$("#hometown");
        var setting=$("#setting");
        var username=$("#username");
        if(update.text()=="修改")
        {
            update.html("保存");
            name.attr("disabled",false);
            birthday.attr("disabled",false);
            grade.attr("disabled",false);
            hometown.attr("disabled",false);
            setting.attr("disabled",false);
        }
        else
        {
            update.html("修改");
            name.attr("disabled",true);
            birthday.attr("disabled",true);
            grade.attr("disabled",true);
            hometown.attr("disabled",true);
            setting.attr("disabled",true);
            $.post("/updateUser.action",{name:name.val(),birthday:birthday.val(),grade:grade.val(),hometown:hometown.val(),setting:setting.val()},function (data){
              if(data.success)
              {
                  username.html(name.val());
                  $("#headName").html(name.val());
              }
            })

        }
    })
},"json")
$("#home").click(function (){
    location.href="/TangYu/html/homePage.html";
})
$("#account").click(function (){
    location.href="account.html";
})
$("#mistake").click(function (){
    location.href="mistake.html";
})
$("#collection").click(function (){
    location.href="collection.html";
})
$("#record").click(function (){
    location.href="record.html";
})
$("#lesson").click(function (){
    location.href="lesson.html";
})

/*$("#avatar").click(function (){
    var files = $("#avatar").get(0).files[0]; //获取file控件中的内容

    var reader = new FileReader();
    reader.readAsDataURL(files);
    reader.onload = function(f) {
        var result = document.getElementById("result");
        //预览图片
        document.getElementById("tx_img").src = this.result;
    }
    })*/

