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
       <div class="flex justify-center items-center min-h-screen bg-gray-100 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
       <div class="card flex-col sm:flex-row items-center gap-10 bg-white rounded-lg shadow-lg p-6 max-w-4xl w-full flex">

           <div class="w-64 flex items-center justify-center">
              <img 
                 class="rounded-lg object-cover w-64 max-w-sm"
                 src="${clickedProduct.image}" alt="${clickedProduct.title}" />
            </div>

        <div class="w-[400px] pl-10">
            <div class="flex justify-between items-start">
            <h1 class="text-xl font-semibold text-gray-900">${
              clickedProduct.title
            }</h1>
            
               </div>
            <p class="text-xl font-semibold text-gray-700 mt-2"> ${
              clickedProduct.price
            } L.E</p>

            <div class="flex items-center mt-4 mb-5">
                <div class="flex items-center space-x-1 rtl:space-x-reverse">
                 ${Array(5)
                   .fill(
                     '<svg class="w-5 h-5 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20"><path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/></svg>'
                   )
                   .join("")}
                    <span class="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-3">5.0</span>
                </div>
            </div>

            <p class="text-gray-600 mt-2">${clickedProduct.description}</p>


            <div class="flex justify-between items-center mt-6">
            <button id="add-to-cart-btn" class="text-white bg-slate-700 hover:bg-slate-800 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                               Add to cart</button>
             </div>
        </div>
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
// max-w-sm bg-white border border-gray-200 rounded-lg shadow
// img   p-2 w-24 h-24  mx-auto object-contain rounded-t-lg
// card  mt-2  w-96 h-[120px] sm:w-72 md:w-80 lg:w-80 rounded-xl shadow-lg overflow-hidden
//transition-all duration-300 ease-in-out justify-center
