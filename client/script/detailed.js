


    var product  = JSON.parse(localStorage.getItem("selectedProduct"));

    if(product){
        var item = ` 
        <div class="card mb-4" id = "card">
        <img src="${product.image}" class="card-img-top" alt="${product.title}">
        <div class="card-body">
            <h5 class="card-title">${product.title}</h5>
            <p class="card-text">$${product.price}</p>
            <p class="card-text">${product.description}</p>
        </div>
    </div>`;
        
        document.getElementById("item").innerHTML = item;

    }
    else{
        document.getElementById("item").innerHTML =' <p>no detailed can occur</p>';
    }









// var container = document.querySelector("container");

// container.addEventListener('click' , function(e){
//     console.log(e.target);
    
// })






  





