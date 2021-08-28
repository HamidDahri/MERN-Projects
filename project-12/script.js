//getting dom elements 
const settingBtn = document.getElementById('settings-btn')
const settingsContainer = document.getElementById('settings')
const settingsFrom = document.getElementById('form')
const word = document.getElementById('word')
const userInput = document.getElementById('user-word')
const timeSpan = document.getElementById('time')
const scoreSpan = document.getElementById('score')
const gameoverContainer = document.getElementById('gameover')
const dificultySettings = document.getElementById('difficulty')

const words = ['a','ability','hamid','aqib','saqib','zahid','rashid'];

//initialize select word
let selectWord;

//initialize score
let score = 0;


// initialize time 
let time = 100;

// initialize difficulty setting
let difficulty = localStorage.getItem('difficulty') != null ? localStorage.getItem('difficulty') : 'easy';
dificultySettings.value = localStorage.getItem('difficulty') != null ? localStorage.getItem('difficulty') : 'easy';
//auto focus on the text input field
userInput.focus();

//execute time update function after each second
const timeInterval = setInterval(decrementTime, 1000);
//function to generate a random word 
function generateWord() {
    return words[Math.floor(Math.random()*words.length)]
};

//function to add the generated word to the dom 

function renderWord() {
    selectWord = generateWord();
    word.innerHTML = selectWord;
};

//function to increment score by one
function incrementScore() {
    score++;
    scoreSpan.innerHTML = score;
}

//function to decrement timer by one
function decrementTime () {
    time--;
    timeSpan.innerHTML = time;

    //check if time is out 
    if(time===0){
        //stop the time interval 
        clearInterval(timeInterval);
        //display game over container
        gameover();
    }
    console.log(1);
};

//function to display game over container
function gameover (){
    gameoverContainer.innerHTML = `
    <h1>Sorry time's up</h1>
    <p>Your score is: ${score}</p>
    <button onclick='location.reload()'>Play Again</button>
    `; 

    gameoverContainer.style.display = 'flex';
}
//event listeners 
// 1. listen for input in the userinput field 
userInput.addEventListener('input',e => {
    //get the user text input
    const userInputText = e.target.value;
    // check if user input text matches the selected word 
    if(userInputText === selectWord){
        //if match generate and render a new word and update the score 
        renderWord();
        incrementScore();
        // clear the input field
        e.target.value = '';

        //add more time to clock 
        if(difficulty === 'hard'){
            time += 2
            ;
        }else if (difficulty === 'medium') {
            time += 4;
        } else {
            time +=6;
        }
        decrementTime();

    }
})

//listen for the click on the settingBTn
settingBtn.addEventListener('click', () => {
    settingsContainer.classList.toggle('hide');
})

//listen for change in the settings form
settingsFrom.addEventListener('change',e => {
    difficulty = e.target.value;
    localStorage.setItem('difficulty',difficulty)
})
renderWord();