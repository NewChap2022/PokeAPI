var pokemonApiEl = document.querySelector(".pokemon-api-container");
var pokemonSearchEl = document.querySelector(".pokemon-search");
var pokemonStatContainer = document.querySelector(".pokemon-stat-container");
var pokemonSearchFormEl = document.querySelector(".pokemon-search-form");
var randomSearchBtn = document.querySelector(".randombtn");
var menuBtn = document.querySelector("#menubtn");
var closeBtn = document.querySelector(".closebtn")

var displayPokemonStats = function (data) {
    pokemonApiEl.classList.add("row");
    pokemonSearchEl.classList.add("col-12", "col-md-4");

    while (pokemonStatContainer.firstChild) {
        pokemonStatContainer.removeChild(pokemonStatContainer.firstChild)
    }

        var pokemonInfoEl = document.createElement("div");
        pokemonInfoEl.classList.add("pokemon-info", "row");

        var pokemonLookEl = document.createElement("div");
        pokemonLookEl.classList.add("pokemon-look", "col-12", "col-sm-4")
        var pokemonImage = document.createElement("img");
        pokemonImage.setAttribute("src", data.sprites.other["official-artwork"].front_default);

        var pokemonStatEl = document.createElement("div");
        pokemonStatEl.classList.add("pokemon-stat", "col-12", "col-sm-8");

        pokemonStatEl.innerHTML = "<p>Name: " + data.name.toUpperCase() + "</p><br><p>Ability: " + data.abilities[0].ability.name.toUpperCase() + "</p><br><p>Height: " + data.height * 10 + " cm</p><br><p>Weight: " + data.weight + " g</p>";

        pokemonLookEl.append(pokemonImage);
        pokemonInfoEl.append(pokemonLookEl, pokemonStatEl);
        pokemonStatContainer.append(pokemonInfoEl);

        // pokemonStatContainer.scrollIntoView();
};

var fetchPokemonApi = function (name) {
    var apiUrl = "https://pokeapi.co/api/v2/pokemon/" + name;

    fetch(apiUrl)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    displayPokemonStats(data);
                })
            } else {
                alert("No Pokémon was found. Please make sure you enter the right name!")
            }
        })
        .catch(function (error) {
            alert("Can't connect to PokeAPI at this moment. Please try again later.")
        })
};

var formSubmitHandler = function (event) {
    event.preventDefault();
    var formInputEl = document.querySelector(".form-input")
    var pokemonName = formInputEl.value.trim().toLowerCase();
    
    if(pokemonName) {
        fetchPokemonApi(pokemonName);
        formInputEl.value = "";
    } else {
        alert ("Please enter a Pokémon Name.");
    };
};

var randomButtonHandler = function () {
    var randomId = Math.floor(Math.random() * 1126) + 1;
    fetchPokemonApi(randomId);
}

var openMenuHandler = function () {
    document.querySelector("menu").style.width = "200px";
}

var closeMenuHandler = function (event) {
    document.querySelector("menu").style.width = "0";
    event.preventDefault();
}

pokemonSearchFormEl.addEventListener("submit", formSubmitHandler);
randomSearchBtn.addEventListener("click", randomButtonHandler);
menuBtn.addEventListener("click", openMenuHandler);
closeBtn.addEventListener("click", closeMenuHandler);

window.addEventListener("scroll", function() {
 if(window.scrollY < 170) {
    menuBtn.style.display = "none";
} else {
    menuBtn.style.display = "block";
} 
})

