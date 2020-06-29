'use strict';
console.log('This is the Pizza Tracker js file, linking up');


//These are in an html collection(array) use ref to image index instead of id's for tracking images shown we are still going to count total clicks and each image's click amount.

var imageElements = document.getElementsByTagName('img');

// var img1Clicked = 0;
// var img2Clicked = 0;
var productIndex1 = 0;
var productIndex2 = 1;
var rounds = 5;
var allProducts = [];

//Add a constructor function for our pizzas
function Pizza(name, imageUrl){
  this.name = name;
  this.imageUrl = imageUrl;
  this.timesClicked = 0;
  allProducts.push(this);
}


// actually create our Pizza's
new Pizza('Brick Oven Pizza', 'images/brickOvenPizza.jpeg');
new Pizza('Calzone', 'images/calzonePizza.jpeg');
new Pizza('Chicago Deep Dish', 'images/chicagoPizza.jpeg');
new Pizza('Chicago Pizza and Oven Grinder', 'images/cpoGinderPizza.jpeg');
new Pizza('Detroit Style', 'images/detroitPizza.jpeg');
new Pizza('Papa Vito\'s Thin', 'images/mwDeluxePizzaThinCrust.jpg');
new Pizza('New York Thin', 'images/newYorkPizza.jpeg');
new Pizza('Detroit Style', 'images/sgDansHtossedMeatLovPizza.jpg');



var totalClicks = 0;
function imageWasClicked(event){
  //track total clicks.
  totalClicks++;
  //   console.log('image was clicked');
  if(event.srcElement.id === '1'){
    allProducts[productIndex1].timesClicked++;
    // img1Clicked++;
  } else if (event.srcElement.id === '2'){
    allProducts[productIndex2].timesClicked++;
    // img2Clicked++;
  }



  //Add logic so that we dont see the same images from click to click.

  var nextproductIndex1 = Math.floor(Math.random() * allProducts.length);
  while ((nextproductIndex1 === productIndex1) || (nextproductIndex2 === nextproductIndex1)){
    nextproductIndex1 = Math.floor(Math.random() * allProducts.length);
  }


  var nextproductIndex2 = Math.floor(Math.random() * allProducts.length);
  while((nextproductIndex2 === productIndex2) || (nextproductIndex2 === nextproductIndex1)){
    nextproductIndex2 = Math.floor(Math.random() * allProducts.length);
  }




  //Set up a ref to productIndex1
  productIndex1 = nextproductIndex1;
  productIndex2 = nextproductIndex2;


  //Pick a random picture to display
  imageElements[0].src = allProducts[productIndex1].imageUrl;
  imageElements[1].src = allProducts[productIndex2].imageUrl;





  if(totalClicks >= rounds) {
    var footerElement = document.getElementsByTagName('footer')[0];
    //remove the first child the h2
    if(footerElement.firstElementChild){
      footerElement.firstElementChild.remove();
    }

    footerElement.textContent = 'You picked pizzas alot of times.';
  }

}




for(var i = 0; i < imageElements.length; i++){
  console.log('this is the event listener for the click on pizza event');
  //   debugger;
  imageElements[i].addEventListener('click', imageWasClicked);
}
