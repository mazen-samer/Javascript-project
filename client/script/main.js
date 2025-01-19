// var myHttp = new XMLHttpRequest();


// myHttp.open("GET", "https://fakestoreapi.com/products", true);


// myHttp.send();


// var data = [];


// myHttp.addEventListener('readystatechange', function() {
//     if (myHttp.readyState == 4) {
        
//         if (myHttp.status == 200) {
            
//             try {
//                 data = JSON.parse(myHttp.response);
//                 // Call the display 
//                 display();
//             } catch (e) {
//                 console.error("Failed to parse JSON response:", e);
//             }
//         } else {
//             console.error("Failed to load data:", myHttp.status, myHttp.statusText);
//         }
//     }
// });



// function display() {
//     var container = document.querySelector(".container"); 
//     var cols = '';

//     // Loop through the data and create HTML elements for each item
//     for (var i = 0; i < data.length; i++) {
//         cols += `
//            <div class="col-md-4 allcards  data-id ="${data[i].id}">
//                 <div class="card mb-4">
//                     <img src="${data[i].image}" class="card-img-top" alt="${data[i].title}">
//                     <div class="card-body">
//                         <h5 class="card-title">${data[i].title}</h5>
//                         <p class="card-text">$${data[i].price}</p>
//                         <p class="card-text">${data[i].description}</p>
//                     </div>
//                 </div>
//             </div>`;
  
//     }

//         // Insert the generated HTML into the DOM
//         container.innerHTML = cols;

//         var cards = document.querySelectorAll('.allcards');
//             cards.forEach(function(card) {
//             card.addEventListener('click', function() {
//                      var productId = this.getAttribute('data-id');
//                     console.log("Selected Product ID:", productId);
        
//                    // Redirect (if needed)
//                    window.location.href = `view_product.html?id=${productId}`;
//                  });
//                 });


// }


//     //  // Add event to the cards
//     //  var cards = document.querySelectorAll('.allcards');
//     //  cards.forEach(function(card) {
//     //     card.addEventListener('click', function() {
//     //         var index = this.getAttribute('data-index');//index refer to data []
//     //         window.location.href = 'view_product.html';
//     //     });
        
//     //  })



// ----------------------------------------------------------









// Create an XMLHttpRequest
var myHttp = new XMLHttpRequest();

// Open the API request
myHttp.open("GET", "https://fakestoreapi.com/products", true);

// Send the request
myHttp.send();

// Data array to store products
var data = [];

// Event listener for readyState changes
myHttp.addEventListener('readystatechange', function() {
    if (myHttp.readyState === 4) {
        if (myHttp.status === 200) {
            try {
                data = JSON.parse(myHttp.response); // Parse JSON response

                   // Save the entire data array to localStorage
                   localStorage.setItem("allProducts", JSON.stringify(data));

                display(); // Call display function after successful fetch

            } catch (e) {
                console.error("Failed to parse JSON response:", e);
            }
        } else {
            console.error("Failed to load data:", myHttp.status, myHttp.statusText);
        }
    }
});

// Function to display products
function display() {
    var container = document.querySelector(".container"); // Target the container
    var cols = '';

    // Generate HTML for each product
    for (var i = 0; i < data.length; i++) {
        cols += `
            <div class="row mb-4">
                <div class="col-md-4">
                    <div class="card allCards" data-id="${data[i].id}">
                        <img src="${data[i].image}" class="card-img-top" alt="${data[i].title}">
                        <div class="card-body">
                            <h5 class="card-title">${data[i].title}</h5>
                            <p class="card-text">$${data[i].price}</p>
                            <p class="card-text">${data[i].description}</p>
                        </div>
                    </div>
                </div>
            </div>`;
    }

    // Insert generated HTML into the container
    container.innerHTML = cols;

    // Add click events to dynamically created elements
    var cards = document.querySelectorAll('.allCards');
    cards.forEach(function(card) {
        card.addEventListener('click', function(e) {
            var productId  = e.currentTarget.getAttribute("data-id");// Get product ID from data-id
            var selectedProduct = data.find( function(item){ //find product by id
                return item.id == productId;
            });
             
            if (selectedProduct) {
                // Save selectedproduct to localStorage
                localStorage.setItem("selectedProduct", JSON.stringify(selectedProduct));

                // Redirect to the second page
                window.location.href = 'view_product.html';
            }
            

            
        });
    });
}
