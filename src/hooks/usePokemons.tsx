import { useEffect, useState } from "react";
import { BasicPokemon, getPokemonsWithTypes } from "./usePokeApi";

export const usePokemons = () => {
  const [pokemons, setPokemons] = useState<BasicPokemon[]>([]);

  const fetch = async () => {
    const pokemons = await getPokemonsWithTypes();
    return pokemons;
  };

  useEffect(() => {
    fetch().then((pokemons) => setPokemons(pokemons));
  }, []);

  return pokemons;
};
