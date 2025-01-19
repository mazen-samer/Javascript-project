





var myhttp = new XMLHttpRequest();
var dataArr = [];

myhttp.open("GET", "https://fakestoreapi.com/products");
myhttp.send();
myhttp.addEventListener("readystatechange", function () {
  if (myhttp.readyState == 4) {
    dataArr = JSON.parse(myhttp.response);
    displayData();
  }
});
console.log(dataArr)





function displayData() {
  var cartona = "";
  var array = [];
  for (var i = 0; i < 6; i++) {
    var min = 1;
    var max = 20;
    var j = Math.random() * (max - min) + min;
    var random = Math.floor(j);

    // Ensure the random number hasn't been added to the array yet
    if (!(array.includes(random))) {
      cartona +=
      
       `
<div class="flex flex-wrap sm:flex-col sm:space-x-4 space-y-4 ">
  
  <div class="container m-7 card cursor-pointer w-44 h-[400px] sm:w-72 md:w-44 lg:w-44 rounded-xl shadow-lg overflow-hidden 
    transition-all duration-300 ease-in-out transform hover:w-80 hover:shadow-2xl sm:h-[450px]">
    <img src="${dataArr[random].image}" class="w-full h-[80%] bg-white object-contain rounded-t-xl">
    
       <div class="p-4">
          <h3 class="text-black text-sm leading-none font-extralight line-clamp-1 truncate items-baseline text-pretty">
           ${dataArr[random].title}
           </h3>
          <p class="text-sm font-bold text-gray-900 mt-2">
           ${dataArr[random].price}
          <br>
         <i class="fa-solid fa-star" style="color: #f2c218;"></i>
         <i class="fa-solid fa-star" style="color: #f2c218;"></i>
         <i class="fa-solid fa-star" style="color: #f2c218;"></i>
      </p>

    </div>
  </div>
</div>


      `

      // Add the random number to the array to avoid duplicates
      array.push(random);
      console.log(array);
    }
  }
  document.getElementById("category-container").innerHTML = cartona;
  
}













//get categories
let viewMoreBtn = document.querySelectorAll('button[data-category]');
for (let i = 0; i < viewMoreBtn.length; i++) {
  viewMoreBtn[i].addEventListener('click', function() {
    let category = this.getAttribute('data-category');
    window.location.href = `categoriespdt.html?category=${category}`;  
  });
}





