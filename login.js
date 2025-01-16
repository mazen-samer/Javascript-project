let formEmail = document.getElementById("email");
let formPassword = document.getElementById("password");
let form = document.forms[0];

let emailErr = document.getElementById("emailErr");
let passwordErr = document.getElementById("passwordErr");

let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
let passwordPattern = /^.{8,}$/;
let validEmail = false;
let validPassword = false;

formEmail.addEventListener("input", (e) => {
  if (emailPattern.test(e.target.value)) {
    validEmail = true;
    emailErr.classList.add("hidden");
  } else {
    validEmail = false;
    emailErr.classList.remove("hidden");
  }
});
formPassword.addEventListener("input", (e) => {
  if (passwordPattern.test(e.target.value)) {
    validPassword = true;
    passwordErr.classList.add("hidden");
  } else {
    validPassword = false;
    passwordErr.classList.remove("hidden");
  }
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (validEmail && validPassword) {
    login();
  }
  formEmail.value = "";
  formPassword.value = "";
});

function login() {
  let xhr = new XMLHttpRequest();
  xhr.open(
    "GET",
    `http://localhost:3000/users?email=${formEmail.value}&password=${formPassword.value}`
  );
  xhr.addEventListener("readystatechange", () => {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        let response = JSON.parse(xhr.responseText);
        if (response.length === 1) {
          sessionStorage.setItem("user", response[0].name);
          window.location.href = "./homepage.html";
        } else {
          alert("No user found");
        }
      } else {
        console.error("Login failed ", xhr.status, xhr.statusText);
      }
    }
  });
  xhr.send();
}
