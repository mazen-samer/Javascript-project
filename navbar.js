let userName = sessionStorage.getItem("user");
let loginRegister = document.getElementById("login-register");
let userNameLogout = document.getElementById("username-logout");
let logout = document.getElementById("logout");

if (userName) {
  userNameLogout.classList.add("flex");
  loginRegister.classList.add("hidden");
} else {
  userNameLogout.classList.add("hidden");
  loginRegister.classList.add("flex");
}

logout.addEventListener("click", () => {
  sessionStorage.removeItem("user");
  userNameLogout.classList.remove("flex");
  userNameLogout.classList.add("hidden");
  loginRegister.classList.remove("hidden");
  loginRegister.classList.add("flex");
});
