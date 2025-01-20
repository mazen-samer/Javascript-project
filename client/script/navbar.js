let user = JSON.parse(sessionStorage.getItem("user"));

let userNameP = document.getElementById("username");
let userNamePSm = document.getElementById("username-sm");
let loginRegister = document.getElementById("login-register");
let loginRegisterSm = document.getElementById("login-register-sm");
let userNameLogout = document.getElementById("username-logout");
let userNameLogoutSm = document.getElementById("username-logout-sm");
let logout = document.getElementById("logout");
let logoutSm = document.getElementById("logout-sm");

let nav2 = document.getElementById("nav-2");
let navOpenBtn = document.getElementById("nav-open-btn");
let navCloseBtn = document.getElementById("nav-close-btn");

if (user) {
  let userName = user.user.split(" ")[0];
  userNameLogout.classList.add("flex");
  loginRegister.classList.add("hidden");
  loginRegisterSm.classList.add("hidden");

  userNameP.innerText = `Hello, ${userName}`;
  userNamePSm.innerText = `Hello, ${userName}`;
} else {
  userNameLogout.classList.add("hidden");
  loginRegister.classList.add("flex");
  userNameLogoutSm.classList.add("hidden");
  loginRegisterSm.classList.add("flex");

  userNameP.innerText = `Hello`;
  userNamePSm.innerText = `Hello`;
}

navOpenBtn.addEventListener("click", () => {
  nav2.classList.remove("-right-full");
  nav2.classList.add("right-0");
});
navCloseBtn.addEventListener("click", () => {
  nav2.classList.add("-right-full");
  nav2.classList.remove("right-0");
});

nav2.addEventListener("click", () => {
  nav2.classList.add("-right-full");
  nav2.classList.remove("right-0");
});

logout.addEventListener("click", () => {
  sessionStorage.removeItem("user");
  userNameLogout.classList.remove("flex");
  userNameLogout.classList.add("hidden");
  loginRegister.classList.remove("hidden");
  loginRegister.classList.add("flex");
  window.location.href = "./homepage.html";
});
logoutSm.addEventListener("click", () => {
  sessionStorage.removeItem("user");
  userNameLogout.classList.remove("flex");
  userNameLogout.classList.add("hidden");
  loginRegister.classList.remove("hidden");
  loginRegister.classList.add("flex");

  loginRegisterSm.classList.remove("hidden");
  loginRegisterSm.classList.add("flex");
  userNameLogoutSm.classList.remove("block");
  userNameLogoutSm.classList.add("hidden");
  window.location.href = "./homepage.html";
});
