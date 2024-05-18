const addBtn = document.querySelector('#add-btn');
const showBtn = document.querySelector("#show-btn");
const searchBtn = document.querySelector('#search-btn');
const sortBtn = document.querySelector('#sort-btn');
const filterBtn = document.querySelector('#price-filter-btn');

function NewFood(f, price, h, m, s, t) {
    this.id = (Math.floor(Math.random() * 100000) + 1).toString().padStart(6, "0")
    this.name = f
    this.price = price
    this.hours = h,
        this.minut = m,
        this.sekund = s,
        this.time = t
}


const ALL_MENU = JSON.parse(localStorage.getItem("menu")) || [];

const addNewFood = function () {
    let newFoodName = prompt("Ovqat nomini kiritin");
    let newFoodPrice = prompt("Ovqat narxini kiritin");
    if (newFoodName && newFoodName.trim() !== "" && newFoodPrice && newFoodPrice.trim() !== "" ) {
        let date = new Date();
        let hours = date.getHours();
        let minut = date.getMinutes();
        let sekund = date.getSeconds();
        let time = date.getTime()

        let newFood = new NewFood(newFoodName, newFoodPrice, hours, minut, sekund, time);

        ALL_MENU.push(newFood);
        localStorage.setItem("menu", JSON.stringify(ALL_FOODS));
    }
    else {
        alert("ovqat nomini kiriting");
    }
}

let sort = false;

const sortMenu = function () {
    if (sort === false) {
        sort = true;
        ALL_MENU.sort((a, b) => {
            if (a.time > b.time) {
                return -1
            }
            else {
                return 1
            }
        })
    }
    else{
        sort = false;
        ALL_MENU.sort((a, b) => {
            if(a.time > b.time){
                return 1
            }
            else{
                return -1
            }
        })
    }

    showFoods()
}

const showFoods = function(){
    result.innerHTML = ""
    ALL_MENU.forEach(food => {
        result.innerHTML += `
        <div class="container">
            <div class="food-item">
                <span> id :${food.id}</span>
                <h2>${food.name}</h2>
                <h2>${food.price}</h2>
                <span>${food.hours} : ${food.minut} : ${food.sekund}</span>
            </div>
        </div>
        `
    })
}

const searchFoods = function () {
    let searchText = prompt("Qidirilayotgan ovqat nomini kiriting");
    if (searchText && searchText.trim() !== "") {
        let searchResults = ALL_MENU.filter(food => {
            return food.name.toLowerCase().includes(searchText.toLowerCase());
        });

        if (searchResults.length > 0) {
            result.innerHTML = "";
            searchResults.forEach(food => {
                result.innerHTML += `
                <div class="container">
                    <div class="food-item">
                        <span> id :${food.id}</span>
                        <h2>${food.name}</h2>
                        <span>${food.hours} : ${food.minut} : ${food.sekund}</span>
                    </div>
                </div>
                `;
            });
        } else {
            result.innerHTML = "<p>Ovqat topilmadi</p>";
        }
    } else {
        alert("Iltimos, qidirilayotgan ovqat nomini kiriting");
    }
}


const filterByPrice = function () {
    let minPrice = prompt("Ovqatni minimum narxini kirtin ");
    let maxPrice = prompt("Ovqatni maxsimal narxini kirtin");

    if (minPrice && maxPrice) {
        let filteredFoods = ALL_MENU.filter(food => {
            return food.price >= minPrice && food.price <= maxPrice;
        });

        result.innerHTML = "";
        filteredFoods.forEach(food => {
            result.innerHTML += `
            <div class="container">
                <div class="food-item">
                    <span> id :${food.id}</span>
                    <h2>${food.name}</h2>
                    <h2>${food.price}</h2>
                    <span>${food.hours} : ${food.minut} : ${food.sekund}</span>
                </div>
            </div>
            `;
        });
    } else {
        alert("Please enter valid prices");
    }
}









addBtn.addEventListener("click", addNewFood);
showBtn.addEventListener("click", showFoods);
sortBtn.addEventListener("click", sortMenu);
searchBtn.addEventListener("click", searchFoods);
filterBtn.addEventListener("click", filterByPrice);
