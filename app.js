const gameContainer = document.getElementById("game");
const btn = document.getElementById("btn");
let flippedCardOne = null;
let flippedCardTwo = null;
let cardsFlipped = 0;
let noClicking = false;

const COLORS = [
    "red",
    "blue",
    "green",
    "orange",
    "purple",
    "red",
    "blue",
    "green",
    "orange",
    "purple"
];

function shuffle(array) {
    let counter = array.length;
    while (counter > 0) {
      let index = Math.floor(Math.random() * counter);
      counter--;
      let temp = array[counter];
      array[counter] = array[index];
      array[index] = temp;
    }
    return array;
  }
  
  let shuffledColors = shuffle(COLORS);
  

  function createDivsForColors(colorArray) {
    for (let color of colorArray) {
      const newDiv = document.createElement("div");
      newDiv.classList.add(color);
      newDiv.addEventListener("click", handleCardClick);
      gameContainer.append(newDiv);
    }
  }

  
  function handleCardClick(event) {
    if(noClicking) return;
    console.log(event.target.classList);

    if(event.target.classList.contains('flipped')) return;
    let flippedCard = event.target;
    flippedCard.style.backgroundColor = flippedCard.classList[0];
    flippedCard.classList.add('flipped');
  
    if (!flippedCardOne || !flippedCardTwo) {
        flippedCardOne = flippedCardOne || flippedCard;
        flippedCardTwo = flippedCard === flippedCardOne ? null : flippedCard;
    }

    if (flippedCardOne && flippedCardTwo) {
        noClicking = true;
        //debugger
        let gif1=flippedCardOne.className;
        let gif2= flippedCardTwo.className;
    
        if (gif1 === gif2) {
            cardsFlipped += 2;
            console.log('removing click', gif1, gif2);
            flippedCardOne.removeEventListener('click', handleCardClick);
            flippedCardTwo.removeEventListener('click', handleCardClick);
            flippedCardOne = null;
            flippedCardTwo = null;
            noClicking = false;
        } else {
                setTimeout(function() {
                    flippedCardOne.style.backgroundColor = "";
                    flippedCardTwo.style.backgroundColor = "";
                    flippedCardOne.classList.remove('flipped');
                    flippedCardTwo.classList.remove('flipped');
                    flippedCardOne = null;
                    flippedCardTwo = null;
                    noClicking = false;
                }, 1000);
            }
        }  
    
    if (cardsFlipped === COLORS.length) alert('Game over. Congratulations, you have matched all of the colors!');
 }
  
  createDivsForColors(shuffledColors);
  
