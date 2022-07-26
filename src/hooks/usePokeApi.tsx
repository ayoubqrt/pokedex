import { castAsSingle } from "helpers";
import Pokedex, {
  NamedAPIResource,
  Pokemon,
  PokemonSpecies,
  StatElement,
  Type,
} from "pokedex-promise-v2";
const P = new Pokedex();

export interface BasicPokemon {
  id: number;
  name: string;
  url: string;
  types: Type[];
}

export interface PokemonEvolution {
  pokemon: Pokemon;
  min_level: number | "unknown";
}

export interface Species {
  species: NamedAPIResource;
  min_level: number | "unknown";
}

export interface EvolutionChain {
  pokemons: Pokemon[];
}

export interface PokemonDetails {
  species: PokemonSpecies;
  pokemon: Pokemon;
  evolutionChain: PokemonEvolution[];
}

const getIdFromUrl = (url: string) => {
  try {
    const urlSplitted = url.split("/");
    const id = urlSplitted[urlSplitted.length - 2];

    return parseInt(id) ?? -1;
  } catch (e) {
    return -1;
  }
};

const urlPicture =
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/";

export const getPokemonDetails = async (
  id: string | number
): Promise<PokemonDetails> => {
  const pokemon = await getPokemon(id);
  pokemon.stats = getAllStats(pokemon.stats);

  const idSpecies = getIdFromUrl(pokemon.species.url);
  const species = await P.getPokemonSpeciesByName(idSpecies);

  const speciesData = castAsSingle(species);

  const idEvolutionChain = getIdFromUrl(speciesData?.evolution_chain?.url);

  if (idEvolutionChain === -1) {
    return {
      pokemon: pokemon,
      species: speciesData,
      evolutionChain: [],
    };
  }
  const evolutionChain = await P.getEvolutionChainById(idEvolutionChain);

  const evolutionChainData = castAsSingle(evolutionChain);
  const evolution = await getEvolution(evolutionChainData);

  return {
    pokemon: pokemon,
    species: speciesData,
    evolutionChain: evolution,
  };
};

const getAllStats = (stats: StatElement[]) => {
  const total = stats.reduce((acc, stat) => acc + stat.base_stat, 0);
  const totalStat = {
    base_stat: total,
    effort: 0,
    stat: {
      name: "TOT",
      url: "",
    },
  };

  return [...stats, totalStat];
};

const getEvolution = async (
  evolutionChain: Pokedex.EvolutionChain
): Promise<PokemonEvolution[]> => {
  const pokemon = castAsSingle(evolutionChain.chain.species);
  const pokemons: Species[] = [{ species: pokemon, min_level: 1 }];

  let evolves = true;
  let nextIteration = evolutionChain.chain;

  while (evolves === true) {
    if (nextIteration.evolves_to.length > 0) {
      pokemons.push({
        species: nextIteration.evolves_to[0].species,
        min_level:
          nextIteration.evolves_to[0].evolution_details[0].min_level ??
          "unknown",
      });

      nextIteration = nextIteration.evolves_to[0];
    } else {
      evolves = false;
    }
  }

  const promises = pokemons.map((pok) => {
    const id = getIdFromUrl(pok.species.url);

    return getPokemon(id);
  });

  const evolutions = await Promise.all(promises);
  const pokemonsData: PokemonEvolution[] = evolutions.map((evol) => ({
    pokemon: evol,
    min_level:
      pokemons.find((pok) => pok.species.name === evol.name)?.min_level ??
      "unknown",
  }));

  return pokemonsData;
};

const getPokemon = async (id: string | number) => {
  const pokemons = await P.getPokemonByName(id);
  const pokemon = castAsSingle(pokemons);

  return pokemon;
};

const getPokemons = async () => {
  const pokemons = await P.getPokemonsList();
  await new Promise((resolve) => setTimeout(resolve, 500));

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
      id: id,
      types: typesDetails.filter((type) => {
        return type.pokemon.some((t) => t.pokemon.name === pokemon.name);
      }),
    };

    return pokemonWithTypes;
  });

  return pokemonsWithTypes;
};
