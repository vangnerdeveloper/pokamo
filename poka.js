// script.js
const searchForm = document.getElementById('search-form');
const pokemonNameInput = document.getElementById('pokemon-name');
const searchBtn = document.getElementById('search-btn');
const resultsContainer = document.getElementById('results-container');
const errorMessage = document.getElementById('error-message');

searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const pokemonName = pokemonNameInput.value.trim();
    if (pokemonName) {
        fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
           .then(response => response.json())
           .then(data => {
                const pokemon = data;
                const pokemonCard = createPokemonCard(pokemon);
                resultsContainer.innerHTML = '';
                resultsContainer.appendChild(pokemonCard);
                errorMessage.textContent = '';
            })
           .catch(error => {
                errorMessage.textContent = `Error: ${error.message}`;
            });
    } else {
        errorMessage.textContent = 'Please enter a Pokémon name';
    }
});

function createPokemonCard(pokemon) {
    const pokemonCard = document.createElement('div');
    pokemonCard.className = 'pokemon-card';

    const pokemonImage = document.createElement('img');
    pokemonImage.src = pokemon.sprites.front_default;
    pokemonImage.className = 'pokemon-image';
    pokemonCard.appendChild(pokemonImage);

    const pokemonDetails = document.createElement('div');
    pokemonDetails.className = 'pokemon-details';

    const pokemonName = document.createElement('h2');
    pokemonName.textContent = pokemon.name;
    pokemonName.className = 'pokemon-name';
    pokemonDetails.appendChild(pokemonName);

    const pokemonType = document.createElement('p');
    pokemonType.textContent = `Type: ${pokemon.types[0].type.name}`;
    pokemonType.className = 'pokemon-type';
    pokemonDetails.appendChild(pokemonType);

    const pokemonAbilities = document.createElement('p');
    pokemonAbilities.textContent = `Abilities: ${pokemon.abilities[0].ability.name}`;
    pokemonAbilities.className = 'pokemon-abilities';
    pokemonDetails.appendChild(pokemonAbilities);

    pokemonCard.appendChild(pokemonDetails);

    return pokemonCard