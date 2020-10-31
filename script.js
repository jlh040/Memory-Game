const gameContainer = document.getElementById("game");
const currentColors =[];
let cardsPicked = 0;
let numOfMatches = 0;
let cardOne;




const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "cyan",
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "cyan"
];

// here is a function to shuffle an array
// it returns the same array with values shuffled
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);




// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

//This is the event listener for each card
function handleCardClick(event) {
  //If you click on the same card twice, do nothing
  if (cardsPicked >= 1 && event.target === cardOne) {
    return;
  }
  
  //If you have clicked on the first card, change the color of the card and add the
  //color to the currentColors array
  cardsPicked++;
  if (cardsPicked === 1) {
    cardOne = event.target
    cardOne.style.backgroundColor = cardOne.className;
    currentColors.push(cardOne.className);
  }

  //If you have clicked on the second card, change the color of the card,
  //wait 1 second, if you get a matching card, leave the colors as is,
  //if you get a different card, change the colors back to the initlal value
  //then reset the number of cards currently picked
  else if (cardsPicked === 2) {
    event.target.style.backgroundColor = event.target.className;
    setTimeout(function() {
      if (event.target.className !== cardOne.className) {
        event.target.style.backgroundColor = "unset";
        cardOne.style.background = "unset";
      }
        cardsPicked = 0;
    }, 1000)

    //add the card you picked to the current color array
    currentColors.push(event.target.className);

    //if we have picked two identical colors, show it in the console
    //I put a "number of matches" counter to possibly be used for some-
    //thing else later, maybe I can use it to log a message to the screen
    if (currentColors[0] === currentColors[1]) {
      console.log("YOU GOT A MATCH");
      numOfMatches++;
    }
    
    //clear the current colors array
    currentColors.pop();
    currentColors.pop();
  }
}

// when the DOM loads
createDivsForColors(shuffledColors);


