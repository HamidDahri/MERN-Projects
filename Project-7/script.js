const wordelement = document.getElementById('word');
const incorrectletterelement = document.getElementById('incorrect-letters');
const notificationelement = document.getElementById('notification-container');
const gameoverelement = document.getElementById('gameover-container');
const gameovermsg = document.getElementById('gameover-message');
const playbtn = document.getElementById('play-btn');
const hangmanparts = document.querySelectorAll('.hangman-parts');
const popup = document.getElementById('popup');
console.log(popup);

console.log(hangmanparts);
console.log(gameoverelement);
console.log(playbtn);

const words = [
    'hamid','abdul','mobile','mouse',
    'rat' , 'aqib' , 'saqib' , 'zahid ', 'rashid'];

let randomword = words[Math.floor(Math.random()*words.length)];
console.log(randomword);

//array to hold the letters from correct guesses 
//const correctletters = ['a','e','i','o','u' ,'a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];

const correctletters = [];
// array to hold the letters from incorrect guesses 
const incorrectletters = [];

function renderword(){
    //using the random word, split it into separate characters
   wordelement.innerHTML = `
      ${randomword.split('').map(letter => `
        <span class="letter">
         ${correctletters.includes(letter) ? letter : ''}
        </span>
      `).join('')}
   `;
   console.log(wordelement.innerText);
   //removing new line character
   const word = wordelement.innerText.replace(/\n/g,'')
   if (word === randomword){
       //if the word matches the random word set the message to you won~!  
       gameovermsg.innerText = "You Won!";
       gameoverelement.style.display = 'flex';
       playbtn.style.innerHTML = "hamid";
   }
};

//function renderincorrectletters
function renderincorrectletters() {
    incorrectletterelement.innerHTML = `
      <p>Incorrect Letters</p>
     ${incorrectletters.map( letter => `<span>${letter}</span>`)}
    `;
    //check if the game is over 
    hangmanparts.forEach( (part,index) => {
        const numincorrect = incorrectletters.length;
       if(index < numincorrect){
           part.style.display='block';
       }else {
        part.style.display='none';
       }
    });

    if(incorrectletters.length === hangmanparts.length) {
        gameovermsg.innerText = "You lost!";
        gameoverelement.style.display = 'flex';
    }
};

//function to display the notification container

function displaynotification(){
    //display the notification
    notificationelement.classList.add('show')
    setTimeout( () => {
        notificationelement.classList.remove('show')
    },1000)
}



playbtn.addEventListener('click' , () => {
    correctletters.splice(0);
     incorrectletters.splice(0);
     randomword = words[Math.floor(Math.random() * words.length)];
     renderword();
     renderincorrectletters();
     gameoverelement.style.display = 'none';
});

window.addEventListener('keydown',e => {
    if(e.keyCode >= 65 && e.keyCode <=90){
        const letter = e.key;
        console.log(letter);
        if(randomword.includes(letter)){
            // add to correct letters array
            if(!correctletters.includes(letter)){
                //if not added then add letter
                correctletters.push(letter);
                renderword();
            }
            else {
                displaynotification();
            }
        }else 
        {
            //if the randomword does not havew the letter check to see if letter is already in the incorrect letters array
            if(!incorrectletters.includes(letter)){
                incorrectletters.push(letter);
                //render the incorrect letters section
                renderincorrectletters();
            }else
            {
                displaynotification();
            }
        }
    }

})

renderword();