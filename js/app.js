'use strict';
console.log('app.js is connected');

var imageElements = document.getElementsByTagName('img');
var productIndex1 = 0;
var productIndex2 = 1;
var productIndex3 = 2;
var rounds = 25;
var allProducts = [];

function Product(name, imageUrl) {
  this.name = name;
  this.imageUrl = imageUrl;
  this.timesClicked = 0;
  this.timesShown = 0;
  allProducts.push(this);
}

new Product('R2-D2 luggage', 'images/bag.jpg');
new Product('Banana slicer', 'images/banana.jpg');
new Product('Bathroom tablet', 'images/bathroom.jpg');
new Product('Missing toe boots', 'images/boots.jpg');
new Product('Breakfast maker', 'images/breakfast.jpg');
new Product('Meatball bubblegum', 'images/bubblegum.jpg');
new Product('Red chair', 'images/chair.jpg');
new Product('Lord Cthulhu', 'images/cthulhu.jpg');
new Product('Duck dog costume', 'images/dog-duck.jpg');
new Product('Dragon meat', 'images/dragon.jpg');
new Product('Utensil pen', 'images/pen.jpg');
new Product('Pet Sweep', 'images/pet-sweep.jpg');
new Product('Pizza scissors', 'images/scissors.jpg');
new Product('Plush shark', 'images/shark.jpg');
new Product('Baby sweeper', 'images/sweep.png');
new Product('Tauntaun sleeping bag', 'images/tauntaun.jpg');
new Product('Unicorn meat', 'images/unicorn.jpg');
new Product('USB tenticle', 'images/usb.gif');
new Product('Water can', 'images/water-can.jpg');
new Product('Wine glass', 'images/wine-glass.jpg');

allProducts[0].timesShown = 1;
allProducts[1].timesShown = 1;
allProducts[2].timesShown = 1;
var totalClicks = 0;
function imageWasClicked(event){
  totalClicks++;
  if(event.srcElement.id === '1'){
    allProducts[productIndex1].timesClicked++;
    console.log('image 1 was clicked');
  } else if (event.srcElement.id === '2'){
    allProducts[productIndex2].timesClicked++;
    console.log('image 2 was clicked');
  }else if (event.srcElement.id === '3'){
    console.log('image 3 was clicked');
    allProducts[productIndex3].timesClicked++;
  }

  var nextproductIndex1 = Math.floor(Math.random() * allProducts.length);
  while ((nextproductIndex1 === productIndex1) || (nextproductIndex2 === nextproductIndex1)){
    nextproductIndex1 = Math.floor(Math.random() * allProducts.length);
  }

  var nextproductIndex2 = Math.floor(Math.random() * allProducts.length);
  while((nextproductIndex2 === productIndex2) || (nextproductIndex2 === nextproductIndex1)){
    nextproductIndex2 = Math.floor(Math.random() * allProducts.length);
  }

  var nextproductIndex3 = Math.floor(Math.random() * allProducts.length);
  while((nextproductIndex3 === productIndex2) || (nextproductIndex3 === nextproductIndex1)){
    nextproductIndex3 = Math.floor(Math.random() * allProducts.length);
  }

  productIndex1 = nextproductIndex1;
  productIndex2 = nextproductIndex2;
  productIndex3 = nextproductIndex3;

  imageElements[0].src = allProducts[productIndex1].imageUrl;
  allProducts[productIndex1].timesShown++;
  imageElements[1].src = allProducts[productIndex2].imageUrl;
  allProducts[productIndex2].timesShown++;
  imageElements[2].src = allProducts[productIndex3].imageUrl;
  allProducts[productIndex3].timesShown++;

  if(totalClicks === rounds){
    var resultsList = document.getElementById('list');
    for(var i =0; i < allProducts.length; i++){
      var bMallItem = document.createElement('li');
      bMallItem.textContent = `${allProducts[i].name} was clicked on ${allProducts[i].timesClicked} times and was shown ${allProducts[i].timesShown} times.`;
      resultsList.appendChild(bMallItem);
    }
    for(var j = 0; j < imageElements.length; j++){
      imageElements[j].removeEventListener('click', imageWasClicked);
    }
  }
}//closes the imageWasClicked function

for(var j = 0; j < imageElements.length; j++){
  imageElements[j].addEventListener('click', imageWasClicked);
}
