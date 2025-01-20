let cardContainer = document.getElementById("cart-container");
let userCartErr = document.getElementById("user-sign-in");

if (user) {
  userCartErr.classList.add("hidden");
  // let cart = user.cart;
  let cart = [1, 2, 3, 4, 5, 6];
  let cartItems = "";
  cart.forEach((cartItem) => {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", `https://fakestoreapi.com/products/${cartItem}`);
    xhr.addEventListener("readystatechange", () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          let response = JSON.parse(xhr.responseText);
          console.log(response);
          cartItems += `
        <div class="flex justify-between items-center border-b border-slate-600 pb-4">
            <img class="w-24" src=${response.image} alt="" />
            <div class="flex flex-col flex-1 min-w-0 mx-4 sm:px-16">
                <p class="font-bold">${response.title}</p>
                <p class="overflow-hidden truncate">${response.description}</p>
            </div>
            <p>${response.price} LE</p>
        </div>
          `;
        }
        cardContainer.innerHTML = cartItems;
      }
    });
    xhr.send();
  });
} else {
  userCartErr.classList.remove("hidden");
}
