 const search = document.getElementById('search');
 const submit = document.getElementById('submit');
 const random = document.getElementById('random');
 const mealEle = document.getElementById('meals');
 const resultheading = document.getElementsByClassName('result-heading');
 const single_meal = document.getElementById('single-meal');

// Search meal
function searchmeal(e){
    e.preventDefault();

    // Clear single meal 
    single_meal.innerHTML="";

    //get search meal

    const term = search.value;


    //Check for empty
    if(term.trim()){
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`
        ).then(res => res.json())
          .then((data) => {
              console.log(data);
              resultheading.innerHTML = `<h2> Search result for ${term}`;
              if(data.meals === null){
                  resultheading.innerHTML = `<h2> There are no result found for ${term}`;
              }
              else{
                  mealEle.innerHTML = data.meals.map(
                      ele => `
                      <div class = "meal">
                      <img src="${ele.strMealThumb}" alt="${ele.strMeal}">
                      <div class="meal-info" data-mealID="${ele.idMeal}">
                      <h3>${ele.strMeal}<h3>
                      </div>
                      </div>
                      `
                  )
                  .join("");
              }
          });
    }
    else{
        alert("Insert value in the search box ")
    }
  

}

// Fetch meal by id
function getMealbyid(mealID){
    fetch(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`
    ).then(res => res.json().then(data => {
      console.log(data);
       const meal = data.meals[0];
       addMealToDOM(meal);
    }))
}

// add meal to DOM
function addMealToDOM(meal) {
    const ingred = [];
    for (let i = 0; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
            ingred.push(`
             ${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]
            }`
            );
        }
        else {
        break;
        }
    }

    single_meal.innerHTML = `
 <div class"singlemeal">
 <h1>${meal.strMeal}</h1>
 <img src="${meal.strMealThumb}" alt="${meal.strMeal}"
 <div class="single-meal-info">
 ${meal.strCategory ? `<p> ${meal.strCategory}</p>` : ""}
 ${meal.strArea ? `<p> ${meal.strArea}</p>` : ''}
 </div>
 <div class="main">
 <p>${meal.strInstructions}</p>
 <h2>Ingredients</h2>
 <ul>
 ${ingred.map(ing => `<li>${ing}</li>`).join('')
        }
 </ul>
 </div>
 </div>
 `
 ;
}


//event listners
 submit.addEventListener('submit', searchmeal);

 mealEle.addEventListener('click', e => {
     const meal_info = e.path.find(item => {
         if(item.classList){
             return item.classList.contains("meal-info");
         }
         else{
             return false;
         }
     });
     if(meal_info){
         const mealID = meal_info.getAttribute("data-mealid");
         getMealbyid(mealID);
     }
 });
