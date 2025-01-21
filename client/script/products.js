
var myHttp = new XMLHttpRequest();


myHttp.open("GET", "https://fakestoreapi.com/products", true);


myHttp.send();

// Data array to store products
var data = [];

// Event listener for readyState changes
myHttp.addEventListener('readystatechange', function() {
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
    var cols = '';

    // Generate HTML for each product
    for (var i = 0; i < data.length; i++) {
            cols+= `
            <div class="card max-w-sm bg-white border border-gray-200 rounded-lg shadow" data-id ="${data[i].id}">
            <a href="#">
                <img class="p-2 w-24 h-24 mx-auto object-contain rounded-t-lg" src="${data[i].image}" alt="${data[i].title}" />
            </a>
            <div class="px-5 pb-5">
                <a href="#">
                    <h5 class="text-xl font-semibold tracking-tight text-gray-900">${data[i].title}</h5>
                </a>
                <div class="flex items-center mt-2.5 mb-5">
                    <span class="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">Rating: 4.5</span>
                </div>
                <div class="flex items-center justify-between">
                    <span class="text-3xl font-bold text-gray-900">$${data[i].price}</span>
                    <a href="#" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center">Add to cart</a>
                </div>
            </div>
        </div> ` ;
    }

    // Insert generated HTML into the container
     container.innerHTML = cols;

    //  to dynamically created elements when click on card
    var cards = document.querySelectorAll('.card');
    cards.forEach(function(card) {
        card.addEventListener('click', function(e) {
            var productId  = e.currentTarget.getAttribute("data-id");// Get product from data-id
            var selectedProduct = data.find( function(item){ //find product by id
                //console.log(productId);
                return item.id == productId;
                
            });
             
          
                // go to viewProduct.html with the product data as URL params
                window.location.href = `viewProduct.html?id=${productId}`;
          
            

            
        });
    });
}
