const currencyone = document.getElementById('CurrencyOne'); 
const currencytwo = document.getElementById('CurrencyTwo');
const input1 =  document.getElementById('input1');
const input2 =  document.getElementById('input2');
const ratedisplay = document.getElementById('displayrate');
const swap1 =   document.getElementById('flip');

console.log(swap1);

// console.log(currencyone.value);
// console.log(currencytwo.value);
// console.log(input1.value);
// console.log(input2.value);
// console.log(ratedisplay.value);
// console.log(swap.value);


function calculate() {
    const currency1 = currencyone.value;
    const currency2 = currencytwo.value;
    fetch(`https://v6.exchangerate-api.com/v6/a43d02c063c1303f1c06c071/latest/${currency1}`)
    .then( res => res.json() )
    .then( data => {
       const rate = data;
       const rates = JSON.parse(rate.conversion_rates[currency2])
       ratedisplay.innerText =' 1 '+ currency1 + ' = ' + rates +' '+ currency2 ;
       input2.value = (input1.value*rates + ' ' + currency2);
    });

}

function flip(){
     const temp = currencyone.value;
     currencyone.value = currencytwo.value;
     currencytwo.value = temp;
     calculate();
};



currencyone.addEventListener('change' , calculate);

currencytwo.addEventListener('change' , calculate);

input1.addEventListener('input', calculate);

input2.addEventListener('input', calculate);

swap1.addEventListener('click' , () => {
    const temp = currencyone.value;
    currencyone.value = currencytwo.value;
    currencytwo.value = temp ;
    calculate();
});

calculate();
