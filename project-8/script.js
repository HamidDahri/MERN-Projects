//get dom elements

const search = document.getElementById('search');
const submit = document.getElementById('submit');
const generateBtn = document.getElementById('generate');
const resultsheading = document.getElementById('results-heading');
const meals= document.getElementById('meals');
const selectedmealelement = document.getElementById('selected-meal');

//function to find meals bases on search input
function findmeals (e) {
     e.preventDefault();
     //clear prevcious details for selectred meals
     selectedmealelement.innerHTML = '' ;
     // get the search text 
     const searchtext = search.value;
     // check if search has text
     if(searchtext.trim){
          //if search text exists then call the api 
          fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchtext}`)
          .then(res => res.json() )
          .then( data => {
               console.log(data);
               //display the search result heading
               resultsheading.innerHTML = `<h2>Seach Results for ${searchtext}</h2>`;
               // check 
               if(data.meals === null){
                    // if no result/meals
                    resultsheading.innerHTML = `<h2>No Results for ${searchtext}</h2>`;
               } else {
                    //if there are results/meals loop thru the results and render in DOM
                    meals.innerHTML = data.meals.map( meal => `
                    <div class="meal">
                    <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
                          <div class="meal-info" data-mealID="${meal.idMeal}">
                                <h3>${meal.strMeal}</h3>
                          </div>
                    </div>
                    `).join('');
               }

               /// clear search tect after serach 
               search.value = "";
          }) 
     }else {
          //if search text does not exist raise an alert asking user to enter text
          alert('please provide search for text');
     }

}

//functiin to get full details of meal using its id

function getfullinfo(mealId){
     fetch (`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
      .then( res => res.json())
      .then (data => {
           console.log(data);
           const meal = data.meals[0];
           console.log(meal);
           // add the meal to the DOM

           rendermeal(meal);

      })
};

//function to render the selected meal in the DOM

function rendermeal(meal){
/// HIDE THE SEARCH RESULTS
search.innerHTML = ' ';
//HIDE THE 
meals.innerHTML = '' ;

     const ingredients = [];
     for( let i=1 ; i<= 20 ; i++){
          if(meal[`strIngredient${i}`]){
          ingredients.push(`${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`);
     }else {
         //if not existed
         break;
     };

     selectedmealelement.innerHTML = `
     <div class="selected-meal-details">
          <h1>${meal.strMeal}</h1>
          <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
          <div class="selected-meal-info"> 
          ${meal.strCategory ? `<p>${meal.strCategory}</p>` : ''}
          ${meal.strArea ? `<p>${meal.strArea}</p>` : ''}
          </div>
          <div class="selected-meal-instructions">
          <h2> Instructiuons</h2>
          <p>${meal.strInstructions}</p>
          <h3>Ingredients</h3>
          <ul>
            ${ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
          </ul>
          </div>
     </div>
     `;
}
}

// 1
submit.addEventListener('submit', findmeals);
// 2 
meals.addEventListener('click', e  => {
    const mealinfo = e.path.find(  item => {
       //get only the element with class = meal-info
       if(item.classList){
            return item.classList.contains('meal-info')
       } else {
            return false;
       }
       
     });
     // check if mealinfo has data 
     if(mealinfo){
          // get the value from the data-mealid attiribute
          const mealId = mealinfo.getAttribute('data-mealID');
          console.log(mealId);
          getfullinfo(mealId);
     }
    

});
