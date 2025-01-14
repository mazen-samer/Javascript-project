let formName = document.getElementById("name");
let formEmail = document.getElementById("email");
let formPassword = document.getElementById("password");
let form = document.forms[0];

let nameErr = document.getElementById("nameErr");
let emailErr = document.getElementById("emailErr");
let passwordErr = document.getElementById("passwordErr");

let namePattern = /^[A-Za-z]+(?:\s[A-Za-z]+)*$/;
let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
let passwordPattern = /^.{8,}$/;
let validName = false;
let validEmail = false;
let validPassword = false;

formName.addEventListener("input", (e) => {
  if (namePattern.test(e.target.value)) {
    validName = true;
    nameErr.classList.add("hidden");
  } else {
    nameErr.classList.remove("hidden");
    validName = false;
  }
});
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
  if (validName && validEmail && validPassword) {
    checkUser();
  }
});

function register() {
  let xhr = new XMLHttpRequest();
  xhr.open("POST", "http://localhost:3000/users");
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.addEventListener("readystatechange", () => {
    if (xhr.readyState === 4) {
      if (xhr.status === 201) {
        let response = JSON.parse(xhr.responseText);
        sessionStorage.setItem("user", response.name);
        formName.value = "";
        formEmail.value = "";
        formPassword.value = "";
        // window.location.href = "./login.html";
      } else {
        alert("Register failed");
        console.error("Register failed:", xhr.status, xhr.responseText);
      }
    }
  });
  let data = {
    name: formName.value,
    email: formEmail.value,
    password: formPassword.value,
  };
  xhr.send(JSON.stringify(data));
}

function checkUser() {
  let xhr = new XMLHttpRequest();
  xhr.open("GET", `http://localhost:3000/users?email=${formEmail.value}`);
  xhr.addEventListener("readystatechange", () => {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        if (JSON.parse(xhr.responseText).length == 0) {
          register();
        } else {
          console.log(xhr.response);
          alert("User already exists.");
        }
      } else {
        console.error("Smth happened!!!");
      }
    }
  });
  xhr.send();
}
