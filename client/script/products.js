var myHttp = new XMLHttpRequest();

myHttp.open("GET", "https://fakestoreapi.com/products", true);

myHttp.send();

// Data array to store products
var data = [];

// Event listener for readyState changes
myHttp.addEventListener("readystatechange", function () {
  if (myHttp.readyState === 4) {
    if (myHttp.status === 200) {
      try {
        data = JSON.parse(myHttp.response);
        display();
      } catch (e) {
        console.error("Failed to parse JSON response:", e);
      }
    } else {
      console.error("Failed to load data:", myHttp.status, myHttp.statusText);
    }
  }
});

//to display products
function display() {
  var container = document.querySelector(".container"); // Target the container
  var cols = "";

  // Generate HTML for each product
  for (var i = 0; i < data.length; i++) {
    cols += `
            <div class="flex flex-wrap justify-center w-200 gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-4 rounded-lg space-x-4">
             <a href="#">
       <div class="card m-7  w-96 h-[450px] sm:w-72 md:w-80 lg:w-80 rounded-xl shadow-lg overflow-hidden 
         transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-2xl" data-id="${
           data[i].id
         }">
            <img class="p-8 rounded-t-lg w-full h-[60%] h-64 sm:h-72 md:h-80 lg:h-50 object-contain transition-transform duration-300 ease-in-out hover:scale-110" src="${
              data[i].image
            }" alt="${data[i].title}" />
        </a>
        <div class="px-5 pb-5">
            <a href="#">
                <h5 class="text-l font-semibold text-gray-900 line-clamp-1">${
                  data[i].title
                }</h5>
            </a>
            <div class="flex items-center mt-2.5 mb-5">
                <div class="flex items-center space-x-1 rtl:space-x-reverse">
                 ${Array(5)
                   .fill(
                     '<svg class="w-5 h-5 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20"><path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/></svg>'
                   )
                   .join("")}


                    <span class="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded ms-3">5.0</span>
                </div>
            </div>
            <div class="flex items-center justify-between">
                <span class="text-xl font-bold text-gray-900">$${
                  data[i].price
                }</span>
            </div>
        </div>
    </div>
</div>`;
  }

  // Insert generated HTML into the container
  container.innerHTML = cols;

  //  to dynamically created elements when click on card
  var cards = document.querySelectorAll(".card");
  cards.forEach(function (card) {
    card.addEventListener("click", function (e) {
      var productId = e.currentTarget.getAttribute("data-id"); // Get product from data-id
      var selectedProduct = data.find(function (item) {
        //find product by id
        //console.log(productId);
        return item.id == productId;
      });

      // go to viewProduct.html with the product data as URL params
      window.location.href = `viewProduct.html?id=${productId}`;
    });
  });
}
