// Retrieve query parameters from the URL

function getUrlParams() {
  var oneProduct = new URLSearchParams(window.location.search);
  console.log("URL Parameters: ", oneProduct); // Debug log to check parameters
  return {
    id: oneProduct.get("id"),
  };
}

// When the page loads
window.addEventListener("load", function () {
  var loadObject = getUrlParams();
  var id = loadObject.id;

  if (id) {
    console.log("Product ID found:", id); // to check
    getDetails(id); // if id exist
  } else {
    console.error("Product ID not found in the URL.");
  }
});

// Function to display product details
function display(clickedProduct) {
  var boxProduct = document.getElementById("view-product");

  if (clickedProduct) {
    boxProduct.innerHTML = `
        <div class="card max-w-sm bg-white border border-gray-200 rounded-lg shadow">
             <img class="p-2 w-24 h-24  mx-auto object-contain rounded-t-lg" src="${clickedProduct.image}" alt="${clickedProduct.title}" />
             <div class="px-5 pb-5">
             <h1 class="text-xl font-semibold tracking-tight text-gray-900">${clickedProduct.title}</h1>
             <div class="flex items-center mt-2.5 mb-5">
                <span class="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">Rating: 4.5</span>
            </div>
            <p class="text-lg font-bold text-gray-900">Price: $${clickedProduct.price}</p>
            <p class="text-gray-700 mt-2">${clickedProduct.description}</p>
            <p class="text-gray-600 mt-2">Category: ${clickedProduct.category}</p>
            <div class="mt-5">
                <button id="add-to-cart-btn" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                    Add to cart
                </button>
            </div>
    </div>`;

    let addToCartBtn = document.getElementById("add-to-cart-btn");
    addToCartBtn.addEventListener("click", () => {
      if (user) {
        if (!user.cart.includes(clickedProduct.id)) {
          let obj = { ...user, cart: [...user.cart, clickedProduct.id] };
          console.log(obj);
          console.log(obj.cart);
          let cartObj = {
            cart: obj.cart,
          };
          let xhr = new XMLHttpRequest();
          xhr.open("PATCH", `http://localhost:3000/users/${user.id}`);
          xhr.setRequestHeader("Content-Type", "application/json");
          xhr.addEventListener("readystatechange", function () {
            if (xhr.readyState == 4) {
              if (xhr.status == 200) {
                sessionStorage.setItem("user", JSON.stringify(obj));
                user = obj;
                alert("Item added to cart successfully");
                console.log(user.cart);
              }
            }
          });
          xhr.send(JSON.stringify(cartObj));
        } else {
          alert("Item already in cart");
        }
      } else {
        alert("Please sign in first");
      }
    });
  } else {
    boxProduct.innerHTML = `<p>Product not found.</p>`;
  }
}

function getDetails(productId) {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", `https://fakestoreapi.com/products/${productId}`, true);

  xhr.addEventListener("readystatechange", function () {
    if (xhr.readyState == 4) {
      if (xhr.status == 200) {
        var clickedProduct = JSON.parse(xhr.response);
        display(clickedProduct); // Pass product data to display
      } else {
        console.error("Failed to fetch product details:", xhr.statusText);
        display(null);
      }
    }
  });
  xhr.send();
}
