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
  allProducts.push(this);
}

new Product('bag', 'images/bag.jpg');
new Product('banana', 'images/banana.jpg');
new Product('bathroom', 'images/bathroom.jpg');
new Product('boots', 'images/boots.jpg');
new Product('breakfast', 'images/breakfast.jpg');
new Product('bubblegum', 'images/bubblegum.jpg');
new Product('chair', 'images/chair.jpg');
new Product('cthulhu', 'images/cthulhu.jpg');
new Product('dog-duck', 'images/dog-duck.jpg');
new Product('dragon', 'images/dragon.jpg');
new Product('pen', 'images/pen.jpg');
new Product('pet-sweep', 'images/pet-sweep.jpg');
new Product('scissors', 'images/scissors.jpg');
new Product('shark', 'images/shark.jpg');
new Product('sweep', 'images/sweep.png');
new Product('tauntaun', 'images/tauntaun.jpg');
new Product('unicorn', 'images/unicorn.jpg');
new Product('usb', 'images/usb.gif');
new Product('water-can', 'images/water-can.jpg');
new Product('wine-glass', 'images/wine-glass.jpg');

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
  imageElements[1].src = allProducts[productIndex2].imageUrl;
  imageElements[2].src = allProducts[productIndex3].imageUrl;

  if(totalClicks >= rounds) {
    var footerElement = document.getElementsByTagName('footer')[0];
    if(footerElement.firstElementChild){
      footerElement.firstElementChild.remove();
    }
    footerElement.textContent = '1010101110001.';
  }
}

for(var i = 0; i < imageElements.length; i++){
  imageElements[i].addEventListener('click', imageWasClicked);
}


var data = {
  labels: [],
  datasets: [
    {
      label: 'Times clicked per item',
      fillColor: '#2E9329',
      strokeColor: '#31732E',
      highlightFill:'#72C56E',
      hightlightStroke: '#31732E',
      data: []
    },
    {
      label: 'Times Displayed per item',
      fillColor: '#EDF3F2',
      strokeColor: '#B3CFCE',
      highlightFill: '#F5FAF4',
      hightlightStroke: '#B3CFCE',
      data: []
    }
  ]
};

function resetChartData() {
  for (var j = 0; j < allProducts.length; j++) {
    data.labels.push('0');
    data.datasets[0].data.push('0');
    data.datasets[1].data.push('0');
  }
}
resetChartData();

var resultsCanvas = document.getElementById('resultsCanvas').getContext('2d');
var chartMe = new Chart(resultsCanvas).Bar(data); //eslint-disable-line

var resultButton = document.getElementById('showResults');
var numResultButtonClicks = 0;
resultButton.addEventListener('click', handleResultButtonClick);

function handleResultButtonClick(event) {
  numResultButtonClicks += 1;
  var results = document.getElementById('resultsSection');
  results.removeAttribute('hidden');

  allProducts.sort(function (a, b) {return b.numClicks - a.numClicks;});
  for(var i = 0; i < allProducts.length; i++)
  {
    data.labels[i] = allProducts[i].productName;
    chartMe.datasets[0].bars[i].label = 'Clicked ' + parseInt(allProducts[i].numClicks/allProducts[i].numDisplays*100) + '%';
    chartMe.datasets[0].bars[i].value = allProducts[i].numClicks;
    chartMe.datasets[1].bars[i].value = allProducts[i].numDisplays;
  }
  chartMe.update();
  allProducts.sort(function (a, b) {return a.originalIndex - b.originalIndex;});
}
