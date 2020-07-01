'use strict';
console.log('app.js is connected, hurray');

var imageElements = document.getElementsByTagName('img');
var productIndex1 = 0;
var productIndex2 = 0;
var productIndex3 = 0;
var totalClicks = 0;
var rounds = 25;
var allProducts = [];

function Product (name, imageUrl) {
  this.name = name;
  this.imageUrl = imageUrl;
  this.timesClicked = 0;
  this.timesShown = 0;
  allProducts.push(this);
}

function getProductsArray(product) {
  var answer = [];
  for (var j = 0; j < allProducts.length; j++) {
    answer[j] = allProducts[j][product];
  }
  return answer;
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

function imageWasClicked (event) {
  totalClicks++;
  if (event.srcElement.id === '1') {
    allProducts[productIndex1].timesClicked++;
  } else if (event.srcElement.id === '2') {
    allProducts[productIndex2].timesClicked++;
  } else if (event.srcElement.id === '3') {
    allProducts[productIndex3].timesClicked++;
  }

  var nextProductIndex1 = Math.floor(Math.random() * allProducts.length);
  var nextProductIndex2 = Math.floor(Math.random() * allProducts.length);
  var nextProductIndex3 = Math.floor(Math.random() * allProducts.length);

  while ((productIndex1 === nextProductIndex1) || (nextProductIndex2 === nextProductIndex1 || nextProductIndex3 === nextProductIndex1)){
    nextProductIndex1 = Math.floor(Math.random() * allProducts.length);
  }

  while ((productIndex2 === nextProductIndex2) || (nextProductIndex3 === nextProductIndex2 || nextProductIndex1 === nextProductIndex2)){
    nextProductIndex2 = Math.floor(Math.random() * allProducts.length);
  }

  while ((productIndex3 === nextProductIndex3) || (nextProductIndex1 === nextProductIndex3 || nextProductIndex2 === nextProductIndex3)){
    nextProductIndex3 = Math.floor(Math.random() * allProducts.length);
  }

  productIndex1 = nextProductIndex1;
  productIndex2 = nextProductIndex2;
  productIndex3 = nextProductIndex3;

  imageElements[0].src = allProducts[productIndex1].imageUrl;
  allProducts[productIndex1].timesShown++;
  imageElements[1].src = allProducts[productIndex2].imageUrl;
  allProducts[productIndex2].timesShown++;
  imageElements[2].src = allProducts[productIndex3].imageUrl;
  allProducts[productIndex3].timesShown++;

  if (totalClicks >= rounds) {
    var footerElement = document.getElementsByTagName('footer')[0];
    if (footerElement.firstElementChild) {
      footerElement.firstElementChild.remove();
    }

    var asideUl = document.getElementById('voteResults');
    for (var x = 0; x < allProducts.length; x++) {
      var voteResultListItem = document.createElement('li');

      voteResultListItem.textContent = `${allProducts[x].name} was clicked on ${allProducts[x].timesClicked} times and was shown ${allProducts[x].timesShown} times.`;
      asideUl.appendChild(voteResultListItem);
      var percentageListItem = document.createElement('li');
      if (allProducts[x].timesClicked === 0) {
        var math = `ZERO clicks and shown ${allProducts[x].timesShown} times.`;
      } else {
        math = Math.round(((allProducts[x].timesClicked / allProducts[x].timesShown).toFixed(2) * 100)) + '%';
      }
      percentageListItem.textContent = `${allProducts[x].name} percentage of clicked on VS times shown is ` + math;
      asideUl.appendChild(percentageListItem);
    }

    localStorage.setItem('savedProduct', JSON.stringify(allProducts)) ;

    var asideUL = document.getElementById('voteResults');
    for(var x = 0; x < allProducts.length; x++){
      var voteResultListItem = document.createElement('li');

      voteResultListItem.textContent = `${allProducts[x].name} was clicked on ${allProducts[x].timesClicked} times and was shown ${allProducts[x].timesShown} times.`;
      asideUl.appendChild(voteResultListItem);

      var percentageListItem = document.createElement('li');
      if(allProducts[x].timesClicked === 0){

        var math = `ZERO clicks and shown ${allProducts[x].timesShown} times.`;
      } else {
        math = Math.round(((allProducts[x]['timesClicked'] / allProducts[x]['timesShown']).toFixed(2) * 100)) + '%';
      }
      percentageListItem.textContent = `${allProducts[x].name} percentage of clicked on VS times shown is ` + math;

      asideUl.appendChild(percentageListItem);
    }

    for (var i = 0; i < imageElements.length; i++) {
      console.log('this is the event listener for the click image event.');
      imageElements[i].removeEventListener('click', imageWasClicked);
    }
    runMyChartNow();
  }
}
function runMyChartNow(){
  var ctx = document.getElementById('resultsChart').getContext('2d');
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: getProductsArray('name'),
      datasets: [{
        label: '# of Votes',
        data: getProductsArray('timesClicked'),
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 3
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });
}
for (var x = 0; x < imageElements.length; x++) {
  console.log('this is the event listener for the click image event.');
  imageElements[x].addEventListener('click', imageWasClicked);
}
