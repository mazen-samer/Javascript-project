let cardContainer = document.getElementById("cart-container");
let userCartErr = document.getElementById("user-sign-in");
let userCartEmpty = document.getElementById("user-cart");

console.log(user.cart);

if (user) {
  userCartErr.classList.add("hidden");
  if (user.cart.length !== 0) {
    displayCartItems(user.cart);
    userCartEmpty.classList.add("hidden");
    userCartEmpty.classList.remove("flex");
  } else {
    userCartEmpty.classList.remove("hidden");
    userCartEmpty.classList.add("flex");
  }
} else {
  userCartErr.classList.remove("hidden");
}

function displayCartItems(cart) {
  let cartItems = "";
  cardContainer.innerHTML = "";

  cart.forEach((cartItem, index) => {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", `https://fakestoreapi.com/products/${cartItem}`);
    xhr.addEventListener("readystatechange", () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          let response = JSON.parse(xhr.responseText);
          cartItems += `
            <div class="flex justify-between items-center border-b border-slate-600 pb-4">
              <img class="w-24" src="${response.image}" alt="" />
              <div class="flex flex-col flex-1 min-w-0 mx-4 sm:px-16">
                <p class="font-bold">${response.title}</p>
                <p class="overflow-hidden truncate">${response.description}</p>
              </div>
              <div class="flex flex-col">
                <p>${response.price} LE</p>
                <button class="bg-transparent hover:bg-red-500 text-red-700 hover:text-white py-1 px-3 border border-red-500 hover:border-transparent rounded" onclick="removeItem(${index})">
                  Remove
                </button>
              </div>
            </div>
          `;
          cardContainer.innerHTML = cartItems;
        }
      }
    });
    xhr.send();
  });
}

function removeItem(index) {
  let cart = user.cart;
  cart.splice(index, 1);
  let updatedUser = { ...user, cart };

  // Update the server
  let xhr = new XMLHttpRequest();
  xhr.open("PATCH", `http://localhost:3000/users/${user.id}`);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.addEventListener("readystatechange", function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        sessionStorage.setItem("user", JSON.stringify(updatedUser));
        alert("Item removed from cart successfully");
        if (cart.length !== 0) {
          userCartEmpty.classList.add("hidden");
          userCartEmpty.classList.remove("flex");
        } else {
          userCartEmpty.classList.remove("hidden");
          userCartEmpty.classList.add("flex");
        }
        displayCartItems(cart);
      }
    }
  });
  xhr.send(JSON.stringify({ cart }));
}
