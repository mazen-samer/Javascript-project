let urlParams = new URLSearchParams(window.location.search);
let category = urlParams.get("category");
document.getElementById("cat-header").innerHTML = category;

if (category && category.toLowerCase() === "jewelry") {
  category = "jewelery";
}
if (category) {
  getNews(category);
}


function getNews(category) {
  let myhttp = new XMLHttpRequest();
  let dataArr = [];
  
  myhttp.open("GET", `https://fakestoreapi.com/products/category/${category}`);
  myhttp.send();
  
  myhttp.addEventListener("readystatechange", function () {
    if (myhttp.readyState == 4 && myhttp.status == 200) {  
      dataArr = JSON.parse(myhttp.responseText);  
      displayCategoryProducts(dataArr); 
    }
  });
}


function displayCategoryProducts(dataArr) {
  let cartona = "";
  for (let i = 0; i < dataArr.length; i++) {
    let product = dataArr[i];
    cartona += `
      <a href="viewProduct.html?id=${product.id}">
        <div class="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-xl overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
          <img class="w-full h-64 object-contain p-6 transition-transform duration-300 ease-in-out hover:scale-110" src="${product.image}" alt="${product.title}" />
          <div class="px-5 pb-5">
            <h5 class="text-lg font-medium tracking-tight text-gray-900 truncate">${product.title}</h5>
            <div class="flex items-center mt-2.5 mb-5">
              <div class="flex items-center space-x-1 rtl:space-x-reverse">
                ${Array(5).fill(
                  '<svg class="w-5 h-5 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20"><path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/></svg>'
                ).join("")}
                <span class="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded ms-3">5.0</span>
              </div>
            </div>
            <div class="flex items-center justify-between">
              <span class="text-2xl font-bold text-gray-900">${product.price} L.E</span>
            </div>
          </div>
        </div>
      </a>
    `;
  }
  document.getElementById("category-container").innerHTML = cartona;
}
