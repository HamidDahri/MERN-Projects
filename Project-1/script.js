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


form.addEventListener('submit', function(e) {
    e.preventDefault();

    if(username.value === ''){
        showError(username, "Username Required");
    } else {
        showSuccess(username);
    }

    if(email.value === ''){
        showError(email, "Email Required");
    } else if (!isValidEmail(email.value)) {
              showError(email,'Invalid Email')
    }
    else {
        showSuccess(email);
    }

    if(password.value === ''){
        showError(password, "Password Required");
    } else {
        showSuccess(password);
    }

    if(password2.value === ''){
        showError(password2, "Confirm Password Required");
    } else {
        showSuccess(password2);
    }
}) 
