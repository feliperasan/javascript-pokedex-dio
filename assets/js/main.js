const pokemonList = document.getElementById("pokemonList");
const loadMoreButton = document.getElementById("loadMoreButton");
const maxRecords = 151;
const limit = 10;
let offset = 0;


/** Adicionando os pokemons a uma lista HTML e paginação */
function loadPokemonItens(offset, limit) {

    pokeapi.getPokemon(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map((pokemon) => 
            `
            <li class="pokemon ${pokemon.type}" onclick="location.href = '../../pages/pokeinfo.html';">
                <span class="number">#${pokemon.pokeNumber}</span>
                <span class="name">${pokemon.name}</span>
                <div class="detail">
                    <ol class="types">
                        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                    </ol>
                    <img src="${pokemon.photo}"
                        alt="${pokemon.name}"/>
                </div>
            </li>
            `
        ).join('');

        pokemonList.innerHTML += newHtml;
    
    });
}

loadPokemonItens(offset, limit);

loadMoreButton.addEventListener("click", () => {
    offset += limit;
    
    const qtdRecordNextPage = offset + limit

    if (qtdRecordNextPage >= maxRecords) {
        const newLimit = maxRecords - offset;
        loadPokemonItens(offset, newLimit);

        loadMoreButton.parentElement.removeChild(loadMoreButton);
    } else {
        loadPokemonItens(offset, limit);
    }
});