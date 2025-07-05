const listOfAllDice = document.querySelectorAll(".die");
const scoreInputs = document.querySelectorAll("#score-options input");
const scoreSpans = document.querySelectorAll("#score-options span");
const roundElement = document.getElementById("current-round");
const rollsElement = document.getElementById("current-round-rolls");
const totalScoreElement = document.getElementById("total-score");
const scoreHistory = document.getElementById("score-history");
const rollDiceBtn = document.getElementById("roll-dice-btn");
const keepScoreBtn = document.getElementById("keep-score-btn");
const rulesContainer = document.querySelector(".rules-container");
const rulesBtn = document.getElementById("rules-btn");

let diceValuesArr = [];
let isModalShowing = false;
let score = 0;
let round = 1;
let rolls = 0;

const rollDice = () => {
  diceValuesArr = [];

  for (let i = 0; i < 5; i++) {
    const randomDice = Math.floor(Math.random() * 6) + 1;
    diceValuesArr.push(randomDice);
  };

  listOfAllDice.forEach((dice, index) => {
    dice.textContent = diceValuesArr[index];
  });
};

const updateStats = () => {
  rollsElement.textContent = rolls;
  roundElement.textContent = round;
};

const updateRadioOption = (index, score) => {
  scoreInputs[index].disabled = false;
  scoreInputs[index].value = score;
  scoreSpans[index].textContent = `, score = ${score}`;
}

const updateScore = (selectedValue, achieved) => {
  score += Number(selectedValue);
  totalScoreElement.textContent = `${score}`;
  const li = document.createElement('li');
  li.textContent = `${achieved} : ${selectedValue}`;
  scoreHistory.appendChild(li);
}



const getHighestDuplicates = (array) => {
  let count = {};
  let foundThree = false;
  let foundFour = false;

  array.forEach((arr) => {
    if (count[arr]) {
      count[arr] = count[arr] + 1

    }
    else {
      count[arr] = 1;
    }
  });
  const sum = array.reduce((acc, val) => acc + val, 0);
  for (let num in count) {
    if (count[num] >= 4) {
      foundFour = true;
    }
    if (count[num] >= 3) {
      foundThree = true;
    }
  }
  if (foundFour) {
    updateRadioOption(1, sum);
  }
  else if (foundThree) {
    updateRadioOption(0, sum);
  }
  else {
    updateRadioOption(5, 0);
  }

}

const detectFullHouse = (array) => {
  let count = {};
  let hasTwo = false;
  let hasThree = false;

  array.forEach((arr) => {
    if (count[arr]) {
      count[arr] = count[arr] + 1;
    }
    else {
      count[arr] = 1;
    }
  });
  for (let num in count) {
    if (count[num] === 3) {
      hasThree = true;
    }
    if (count[num] === 2) {
      hasTwo = true;
    }
    
  }
  if (hasThree && hasTwo) {
    updateRadioOption(2, 25);
  }
    updateRadioOption(5, 0);
  
 
}


const resetRadioOptions = () => {
  scoreInputs.forEach((input, index) => {
    input.disabled = true;
    input.checked = false;
    scoreSpans[index].textContent = '';
  })
}

const resetGame = () => {
  diceValuesArr = [0, 0, 0, 0, 0];
  score = 0;
  round = 1;
  rolls = 0;

  listOfAllDice.forEach((dice, index) => {
    dice.textContent = diceValuesArr[index];
  });

  totalScoreElement.textContent = score;
  scoreHistory.innerHTML = "";

  rollsElement.textContent = rolls;
  roundElement.textContent = round;

  resetRadioOptions();
};

const checkForStraights = (array) => {
const removeDuplicate = [...new Set(array)];
console.log(`original Array: ${array}`);
console.log(`after removing duplicate Array: ${removeDuplicate}`);

  for (let i = 0; i < removeDuplicate.length; i++) {
    for (let j = 0; j < removeDuplicate.length - 1; j++) {
      if (removeDuplicate[j] > removeDuplicate[j + 1]) {
        const temp = removeDuplicate[j];
        removeDuplicate[j] = removeDuplicate[j + 1];
        removeDuplicate[j + 1] = temp;
      }
    }
  }

let streak = 1;
let maxStreak = 1;

    for (let i = 1; i < removeDuplicate.length; i++) {
        if (removeDuplicate[i] === removeDuplicate[i - 1] + 1) {
            streak++;
            maxStreak  = Math.max(maxStreak,streak);
        }else {
    streak = 1;
  }
    }
    if(maxStreak === 5){
      updateRadioOption(4, 40);
    }
     if(maxStreak === 4){
      updateRadioOption(3, 30);
    }
    updateRadioOption(5, 0);
  console.log(`sorted duplicateRemoval: ${removeDuplicate}`);

}
rollDiceBtn.addEventListener("click", () => {
  if (rolls === 3) {
    alert("You have made three rolls this round. Please select a score.");
  } else {
    rolls++;
    resetRadioOptions();
    rollDice();
    updateStats();
    getHighestDuplicates(diceValuesArr);
    detectFullHouse(diceValuesArr);
    checkForStraights(diceValuesArr);
  }
});

rulesBtn.addEventListener("click", () => {
  isModalShowing = !isModalShowing;

  if (isModalShowing) {
    rulesBtn.textContent = "Hide rules";
    rulesContainer.style.display = "block";
  } else {
    rulesBtn.textContent = "Show rules";
    rulesContainer.style.display = "none";
  }
});

keepScoreBtn.addEventListener('click', () => {
  const inputChecked = document.querySelector("#score-options input:checked");
  if (inputChecked) {
    rolls = 0;
    round++;
    updateStats();
    resetRadioOptions();
    updateScore(inputChecked.value, inputChecked.id);

    if (round > 6) {
      setTimeout(() => {
        alert(`Game Over! Your total score is ${score}`);
        resetGame();
      }, 500);
    }

  }
  else {
    alert("Please select an option or roll the dice");
  }

});