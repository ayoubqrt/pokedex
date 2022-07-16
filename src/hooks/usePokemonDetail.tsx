import { castAsSingle } from "helpers";
import { Pokemon } from "pokedex-promise-v2";
import { useEffect, useState } from "react";
import {
  BasicPokemon,
  getPokemonDetail,
  getPokemonsWithTypes,
} from "./usePokeApi";

export const usePokemonDetail = (pokemonId: string) => {
  const [pokemonDetail, setPokemonDetail] = useState<Pokemon | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetch = async () => {
    setIsLoading(true);
    const pokemon = await getPokemonDetail(pokemonId);
    setIsLoading(false);

    return castAsSingle(pokemon);
  };

  useEffect(() => {
    fetch().then((pokemon) => setPokemonDetail(pokemon));
  }, [pokemonId]);

  return { pokemonDetail, isLoading };
};
