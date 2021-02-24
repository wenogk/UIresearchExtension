var LOGIN_SECRET = localStorage.getItem("key");


if (LOGIN_SECRET !== null) {
  $("#loginHolder").hide();
  $("#net-id-header").html(LOGIN_SECRET);
  $("#loggedInHolder").show();
  $("#logoutButton").show();
}

function login() {
  LOGIN_ID = $("#net-id").val();
  $("#secretInput").val("");
  localStorage.setItem("key", LOGIN_ID);
  $("#loginHolder").hide();
  $("#loggedInHolder").show();
  $("#net-id-header").html(LOGIN_SECRET);
  // alert(LOGIN_SECRET);
}

function logout() {
  localStorage.clear();
  $("#secretInput").val("");
  $("#secretInput").show();
  $("#loginButton").show();
  $("#logoutButton").hide();
  loadVerificationHolder("pending");
}