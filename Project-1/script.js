const form = document.getElementById('form')
const username = document.getElementById('username')
const email = document.getElementById('email')
const password = document.getElementById('password')
const password2 = document.getElementById('password2')

function showError(input,message) {
const form_control = input.parentElement;
form_control.className = 'from-control error';
const msg = form_control.querySelector('small');
msg.innerText = message ;
}

function showSuccess(input){
const form_control = input.parentElement;
form_control.className = 'from-control success';
}

function isValidEmail(email){
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function getFieldId(input) {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);

}

function checkRequired(inputArray){
     inputArray.forEach(function(input){
         console.log(input.value);
         if(input.value === ''){
            // showError(input,input.id+' is required');
             //showError(input,`${input.id} is required`);
             showError(input,`${getFieldId(input)} is required`);
         } else {
             showSuccess(input);
         }
     });
}

form.addEventListener('submit', function(e) {
    e.preventDefault();
     checkRequired([username,email,password,password2])
}) 
