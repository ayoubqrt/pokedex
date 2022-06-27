import Pokedex, { Type } from "pokedex-promise-v2";
const P = new Pokedex();

export interface BasicPokemon {
  id: string;
  name: string;
  url: string;
  types: Type[];
}

const urlPicture =
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/";

const getPokemons = async () => {
  const pokemons = await P.getPokemonsList();
  console.log(pokemons);

  return pokemons;
};

const getTypes = async () => {
  const types = await P.getTypesList();
  console.log(types);

  return types;
};

export const getPokemonsWithTypes = async (): Promise<BasicPokemon[]> => {
  const pokemons = await getPokemons();
  const types = await getTypes();

  const typesDetails = await Promise.all(
    types.results.map(async (type) => {
      const details = await P.getTypeByName(type.name);
      return details as Type;
    })
  );

  const pokemonsWithTypes = pokemons.results.map((pokemon) => {
    const urlSplitted = pokemon.url.split("/");
    const id = urlSplitted[urlSplitted.length - 2];

    const pokemonWithTypes = {
      ...pokemon,
      id,
      types: typesDetails.filter((type) => {
        return type.pokemon.some((t) => t.pokemon.name === pokemon.name);
      }),
    };

    return pokemonWithTypes;
  });

  return pokemonsWithTypes;
};

export const getPokemonDetail = (name: string) => {
  return P.getPokemonByName(name);
};
