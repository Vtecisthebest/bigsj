$(function () {
  // 点击去注册账号让 登录框隐藏，注册框显示
  $("#link_reg").click(() => {
    $(".login-box").hide();
    $(".reg-box").show();
  });
  // 点击去登录让 注册框隐藏，登录框显示
  $("#link_login").click(() => {
    $(".login-box").show();
    $(".reg-box").hide();
  });

  const form = layui.form;
  const layer = layui.layer;
  form.verify({
    // 自定义一个叫 pwd 的校验规则
    pwd: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],
    repwd: (value) => {
      const pwd = $("#form_reg [name=password]").val();
      if (pwd !== value) return "两次密码不一致";
    },
  });

  $("#form_reg").on("submit", (e) => {
    e.preventDefault();
    $.ajax({
      type: "POST",
      url: "/api/reguser",
      data: {
        username: $("#form_reg [name=username]").val(),
        password: $("#form_reg [name=password]").val(),
      },
      success: (res) => {
        if (res.status !== 0) return "您的注册不对";
        layer.msg("注册成功");
        $("#link_login").click();
      },
    });
  });
  // 监听登录表单，发送登录请求
  $("#form_login").submit((e) => {
      console.log($("#form_login [name=password]").val());
    e.preventDefault();
    $.ajax({
      type: "POST",
      url: "/api/login",
      data: {
        password: $("#form_login [name=password]").val(),
        username: $("#form_login [name=username]").val(),
      },
      success: (res) => {
        if (res.status !== 0) return layer.msg(res.message);
        layer.msg("登录成功！");
        // 将登录成功得到的 token 字符串，保存到 localStorage 中
        localStorage.setItem("token", res.token);
        // 跳转到主页
        location.href = "/index.html";
      },
    });
  });
});
