// Urls
const urlSearchByName = "https://www.themealdb.com/api/json/v1/1/search.php?s=" ;
const urlSearchMealById = "https://www.themealdb.com/api/json/v1/1/lookup.php?i=" ;


// Function to make new array of favourite meals if not present in local storage
if (localStorage.getItem("favouritesList") == null) {
    localStorage.setItem("favouritesList", JSON.stringify([]));
}


// Function to fetch meals from API
async function fetchAPI(url,value) {
    const response = await fetch(`${url+value}`);
    let meals = await response.json();
    return meals;
}

// Function to show the meals as per the input
function showMeals(){
    const searchInput = document.getElementById('search-input').value;
    const arr = JSON.parse(localStorage.getItem('favouritesList'));
    var html = "";
    const meals = fetchAPI(urlSearchByName,searchInput);  //json	

	meals.then(data =>{
		if(data.meals){
			data.meals.forEach((element) =>{
				var isFav = false;
				for (let i = 0; i < arr.length; i++) {
                    if(arr[i] == element.idMeal){
                        isFav=true;
                    }
                }
				if(isFav){
					html += `
          
					<div id="card" class="card text-white mb-3" style="max-width: 18rem;">
					<div class="card-header text-center">${element.strMeal}</div>
					<div class="card-body">
						  <img src="${element.strMealThumb}" class="card-img-top rounded-circle" alt="unable to fetch meal">
					</div>
					<div class="d-flex justify-content-between">
						  <button type="button" class="btn btn-outline-light" style="background-color:#003f7d;" onclick="mealDetails(${element.idMeal})">More details</button>
						  <button id="main${element.idMeal}" type="button" class="btn btn-outline-light active fav-btn" style="border-radius: 50%; background-color:#003f7d" onclick="addRemoveToFav(${element.idMeal})">
							<i class="fa-solid fa-heart" style="color:Red"></i>
						  </button>
					</div>
				  </div> 
					`;
				}else{
					html += `
					<div id="card" class="card text-white mb-3" style="max-width: 18rem;">
					<div class="card-header text-center">${element.strMeal}</div>
					<div class="card-body">
						  <img src="${element.strMealThumb}" class="card-img-top rounded-circle" alt="unable to fetch meal">
					</div>
					<div class="d-flex justify-content-between">
						  <button type="button" class="btn btn-outline-light" style="background-color:#003f7d;" onclick="mealDetails(${element.idMeal})">More details</button>
						  <button id="main${element.idMeal}" type="button" class="btn btn-outline-light fav-btn" style="border-radius: 50%; background-color:#003f7d"; onclick="addRemoveToFav(${element.idMeal})">
							<i class="fa-solid fa-heart"></i>
						  </button>
					</div>
				  </div> 
					`;
				}
			})
		}else{
			html += `
			<div style="font-size: 3rem">
        		<p style="color: rgb(199, 39, 39)">Error 404 : Meals not found</p>
      		</div>
			`;
		}
		document.getElementById("main").innerHTML = html;
	});
}

// Function for meal details
async function mealDetails(id){
	var html = "";
	await fetchAPI(urlSearchMealById,id).then(data =>{
		var ingArray = [data.meals[0].strIngredient1,data.meals[0].strIngredient2,data.meals[0].strIngredient3,data.meals[0].strIngredient4,data.meals[0].strIngredient5,
						data.meals[0].strIngredient6,data.meals[0].strIngredient7,data.meals[0].strIngredient8,data.meals[0].strIngredient9,data.meals[0].strIngredient10,
						data.meals[0].strIngredient11,data.meals[0].strIngredient12,data.meals[0].strIngredient13,data.meals[0].strIngredient14,data.meals[0].strIngredient15,
						data.meals[0].strIngredient16,data.meals[0].strIngredient17,data.meals[0].strIngredient18,data.meals[0].strIngredient19,data.meals[0].strIngredient20
					];
		var arrayOfIngredients = ingArray.filter((x) => x);
		
		
		html += `
		<div id="details-container" class="container border">
        <div class="row">
          
          <div class="col border text-center">
            <div class="mt-5">
              <h1 style="color:Green">${data.meals[0].strMeal}</h1>
              <h6 style="color:black">Category : ${data.meals[0].strCategory}</h6>
              <h6 style="color:black">Area : ${data.meals[0].strArea}</h6>
            </div>
            <div class="mt-5">
              <h3 id="ingredients" style="color:Green">Ingredients:</h3>
              <ul class="tileMe">
                <li style="color:black" class="list-group-item">${arrayOfIngredients}</li>            
              </ul>
              <div id="watch-btn" class="text-center">
                <a href="${data.meals[0].strYoutube}" target="_blank" class="btn btn-outline- mt-3" style="color:black">
                  <i id="youtube" class="fa-brands fa-youtube">Watch Video</i>
                </a>
              </div>
            </div>
          </div>

          <div class="col border">
            <div id="meal-image" class="card-body">
              <img src="${data.meals[0].strMealThumb}" class="card-img-top" alt="unable to fetch meal">
            </div>
          </div>
        </div>
        <div class="row text-center">
          <div class="col border">
            <h3 style="color:Green" class="mt-3">Instructions</h3>
            <p style="color:black">${data.meals[0].strInstructions}</p>
          </div>
        </div>
      </div>
		`;
	});
	document.getElementById("main").innerHTML = html;
}

// Function to show Favourite Meals list
async function showFavMealList() {
    let arr = JSON.parse(localStorage.getItem("favouritesList"));

    let html="";
    if (arr.length == 0) {
        html += `
          <div class="d-flex align-items-center">
            No meal added in your favourites list.
          </div>
          `;
    } else {
        for (let i = 0; i < arr.length; i++) {
            await fetchAPI(urlSearchMealById,arr[i]).then(data=>{
                html += `
                <div id="card" class="card text-white mb-3" style="max-width: 18rem;">
					        <div class="card-header text-center">${data.meals[0].strMeal}</div>
					        <div class="card-body">
						        <img src="${data.meals[0].strMealThumb}" class="card-img-top rounded-circle" alt="unable to fetch meal">
					      </div>
					      <div class="d-flex justify-content-between">
						      <button type="button" class="btn btn-outline-light" style="background-color:#003f7d;" onclick="mealDetails(${data.meals[0].idMeal})">More details</button>
						      <button id="${data.meals[0].idMeal}" type="button" class="btn btn-outline-light active fav-btn" style="border-radius: 50%; background-color:#003f7d"; onclick="addRemoveToFav(${data.meals[0].idMeal})">
							    <i id="fav-icon" class="fa-solid fa-heart" style="color:Red"></i>
						      </button>
					      </div>
				        </div> 
                `;
            });   
        }
    }
    document.getElementById("favourites-list").innerHTML = html;
}






//Function to add and remove meals to favourites list
function addRemoveToFav(id) {
    let arr = JSON.parse(localStorage.getItem("favouritesList"));
    let isPresent = false;
    for (let i = 0; i < arr.length; i++) {
        if (id == arr[i]) {
            isPresent = true;
        }
    }
    if (isPresent) {
        let number = arr.indexOf(id);
        arr.splice(number, 1);
    } else {
        arr.push(id);
    }
    localStorage.setItem("favouritesList",JSON.stringify(arr));
    showMeals();
    showFavMealList();
}
