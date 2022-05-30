function getuserInfo() {
  $.ajax({
    type: "GET",
    url: "/my/userinfo",
    // headers:{
    //     Authorization:localStorage.getItem('token')
    // },
    success: (res) => {
      if (res.status !== 0) return layer.msg("获取用户信息失败");
      layer.msg("获取用户信息成功");
      renderAvatar(res.data);
    },
  });
}
const renderAvatar = (user) => {
  let username = user.nickname || user.username;
  $("#welcome").html(`欢迎${username}`);
  if (user.user_pic !== null) {
    $(".layui-nav-img").attr("src", user.user_pic);
    $(".text-avatar").hide();
  } else {
    $(".layui-nav-img").hide();
    $(".text-avatar").html(username[0].toUpperCase());
  }
};
$("#btnlogout").click(() => {
  layer.confirm("是否退出？", { icon: 3, title: "提示" }, function (index) {
    localStorage.removeItem("token");
    location.href = "/login.html";
  });
});

getuserInfo();
