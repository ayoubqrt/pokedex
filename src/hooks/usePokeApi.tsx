import { castAsSingle } from "helpers";
import Pokedex, { Pokemon, Type } from "pokedex-promise-v2";
const P = new Pokedex();

export interface BasicPokemon {
  id: string;
  name: string;
  url: string;
  types: Type[];
}

const getIdFromUrl = (url: string) => {
  const urlSplitted = url.split("/");
  const id = urlSplitted[urlSplitted.length - 2];

  return id;
};

const urlPicture =
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/";

export const getPokemonDetails = async (id: string) => {
  const pokemons = await P.getPokemonByName(id);
  const pokemon = castAsSingle(pokemons);

  const idSpecies = getIdFromUrl(pokemon.species.url);
  const species = await P.getPokemonSpeciesByName(idSpecies);
  const speciesData = castAsSingle(species);

  const idEvolutionChain = getIdFromUrl(speciesData.evolution_chain.url);
  const evolutionChain = await P.getEvolutionChainById(
    parseInt(idEvolutionChain)
  );
  const evolutionChainData = castAsSingle(evolutionChain);

  return {
    pokemon,
    species: speciesData,
    evolutionChain: evolutionChainData,
  };
};

const getPokemons = async () => {
  const pokemons = await P.getPokemonsList();

  return pokemons;
};

const getTypes = async () => {
  const types = await P.getTypesList();

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
    const id = getIdFromUrl(pokemon.url);

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
