const adduserbtn  = document.getElementById('add-user');
const doublewealthbtn  = document.getElementById('double-wealth');
const filterwealthbtn  = document.getElementById('filter-wealth');
const sortbtn  = document.getElementById('sort-wealth');
const aggregatebtn  = document.getElementById('sum-wealth');
const main  = document.getElementById('main');
//array to use store user data to display in dom
let userarray = [];
//function to call/fetch random user and assign random wealth0
async function generaterandomuser(){
     const res= await fetch(`https://randomuser.me/api`);
     const data = await res.json();
     // save the user data 
     const user = data.results[0];
     // create new user object with user name and wealth
     const newuser = {
         name: `${user.name.title} ${user.name.first}`,
         wealth:Math.floor(Math.random() * 1000000)
     };
     adduserdata(newuser);
};
function adduserdata(user) {
    //push
    userarray.push(user);
    //update the dom with new data
    updatedom();
};
//function to update the dom with new user data 
function updatedom(userdata = userarray){
    //wipe away content from main element
    main.innerHTML = '<h2><strong>user</strong> wealth </h2>'
    //loop over userdaTA ARRAY and display
    userdata.forEach(user => {
        // create a new div element 
        const divelement = document.createElement('div');
        // assign a class to the new div 
        divelement.classList.add('person');
        // add content to the new div element 
        divelement.innerHTML = `<strong>${user.name}</strong> ${user.wealth}` ;
        // display the new element in the dom
        main.appendChild(divelement);
    })
}

//function to double wealth
function doublewealth(){
    userarray = userarray.map(user => {
        return {...user,wealth: user.wealth * 2}
    });
    updatedom();
}

function filterwealth(){
  userarray = userarray.filter(user => user.wealth > 1000000);
  updatedom();
};

function sortuser(){
    userarray.sort((a,b) => a.wealth - b.wealth );
    updatedom();
}

function calculatenetwealth(){
    const netwealth = userarray.reduce(  (acc,user) =>(acc += user.wealth),0 );
   
    const totaldiv = document.createElement('div');
    totaldiv.innerHTML = `<h3> Net Wealth : <strong>$ ${netwealth}</strong> </h3>`
    main.appendChild(totaldiv);
    console.log(netwealth);
}
//event listener 
adduserbtn.addEventListener('click',generaterandomuser);
doublewealthbtn.addEventListener('click',doublewealth);
filterwealthbtn.addEventListener('click',filterwealth);
sortbtn.addEventListener('click',sortuser);
aggregatebtn.addEventListener('click',calculatenetwealth)


// generate some user on initia age load

generaterandomuser();
generaterandomuser();
generaterandomuser();
generaterandomuser();
