let formEmail = document.getElementById("email");
let formPassword = document.getElementById("password");
let form = document.forms[0];

form.addEventListener("submit", (e) => {
  e.preventDefault();
  login();
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
        const response = JSON.parse(xhr.responseText);
        if (response.length === 1) {
          console.log(response);
        } else {
          console.log("Enta meen?");
        }
      } else {
        console.error("Login failed with status:", xhr.status, xhr.statusText);
      }
    }
  });
  xhr.send();
}
