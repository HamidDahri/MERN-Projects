// get dom elements 
const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat');
const count = document.getElementById('count');
const total = document.getElementById('total');
const selectMovie = document.getElementById('movie');


let ticketprice = +selectMovie.value;

// update ui from local storage 
const moviePrice = localStorage.getItem('moviePrice');
const movieIndex = localStorage.getItem('movieIndex');
const NoOfSeats = localStorage.getItem('selectedseats');

console.log(JSON.parse(NoOfSeats).length);
const price2 = parseInt(moviePrice);
const seats2 = JSON.parse(NoOfSeats).length;
console.log(price2,seats2);


updateUI();
updateprice(price2, seats2)

// get the ticket price from the select movie dropdown
function updateprice(price , seats ) {
       total.innerText = price*seats;
}


console.log();
//function to update count
function updateCount() {
    //calculate how many seats are selected
    const selectedseats = document.querySelectorAll('.row .seat.selected');
    console.log('node list ' , selectedseats);
    //create an array using the node list (selectedseats)
    const seatIndex = [...selectedseats].map( function(seat) {
        return [...seats].indexOf(seat);
   
    })
    localStorage.setItem ('selectedseats' ,JSON.stringify(seatIndex));
    console.log('array list' , seatIndex);

    const selectedseatscount = selectedseats.length;
    console.log(selectedseatscount);
    //update the seat counter
    count.innerText = selectedseatscount;
    //update total ticket price
    total.innerText = selectedseatscount*ticketprice;
}

function saveMovieData(movieIndex , moviePrice) {
    localStorage.setItem('movieIndex' , movieIndex);
    localStorage.setItem('moviePrice' , moviePrice);
}

//FUNCTION TI GET DATA FROM LS TO UPDATE UI
   function updateUI(){
       const selectedSeats = JSON.parse(localStorage.getItem('selectedseats'));
       if(selectedSeats !== null && selectedSeats.length > 0 ){
          seats.forEach( (seat, index) => {
              //if the index of seat contained inside selectedSeat array then add selected class
              if(selectedSeats.indexOf(index) > -1 ){
                  seat.classList.add('selected');
              }
          } )
       }

      
      
      
      if(movieIndex !== null ){
          selectMovie.selectedIndex = movieIndex;
      }
      updateCount();
   };
 
//Event listeners 
//1.listen for click on container
container.addEventListener('click', e => {
   if(e.target.classList.contains('seat') && !e.target.classList.contains('occupied')){
    //add or remove seat for selection       
    e.target.classList.toggle('selected')
    updateCount();

   } 
})

// 2 . listen for change in movie seletor

selectMovie.addEventListener('change', e => {
    
ticketprice = +e.target.value;
updateCount();
saveMovieData(e.target.selectedIndex , e.target.value);
})

