
const pokeapi = {}


function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon();

    pokemon.pokeNumber = pokeDetail.id;
    pokemon.name = pokeDetail.name;

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name);
    const [type] = types;

    pokemon.types = types;
    pokemon.type = type;

    pokemon.photo = pokeDetail.sprites.other["official-artwork"].front_default;

    return pokemon;
}

/**
 * [acessar o endpoint do corpo da api, onde estão os detalhes dos pokemons]
 * @param  {[any]} pokemon [objeto pokemon]
 * @return {[any]}         [detalhes do objeto pokemon]
 */
pokeapi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
            .then((response) => response.json())
            .then(convertPokeApiDetailToPokemon)
}

/**
 * [Faz a requisição da lista de pokemons e seus detalhes]
 * @param  {0} offset [posição no conjunto de dados]
 * @param  {5} limit  [limite de informações a serem mostradas no corpo]
 * @return {[promise]}        [retorna lista de promessas de pokemons]
 */
pokeapi.getPokemon = (offset = 0, limit = 5) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeapi.getPokemonDetail))
        .then((detailRequest) => Promise.all(detailRequest))
        .then((pokemonDetails) => pokemonDetails)
}