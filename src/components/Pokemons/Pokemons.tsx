import { PokemonCard } from "@components/PokemonCard/PokemonCard";
import { BasicPokemon, getPokemonsWithTypes } from "@hooks/usePokeApi";
import { usePokemons } from "@hooks/usePokemons";
import { useState } from "react";
import { useQuery } from "react-query";
import styles from "./Pokemons.module.css";

interface IPokemonsProps {
  pokemonsType: string;
  onClick: (pokemon: BasicPokemon) => void;
}

export const Pokemons: React.FC<IPokemonsProps> = ({
  pokemonsType,
  onClick,
}) => {
  const {
    isLoading,
    error,
    data: pokemons,
    isSuccess,
  } = useQuery(["pokemons"], getPokemonsWithTypes);

  // const pokemons = usePokemons();

  const filterByType = (type: string) => {
    const pokemonsFilteredByType = pokemons?.filter((pokemon) => {
      return pokemon.types.some((t) => t.name === type);
    });

    // setfilteredPokemons(pokemonsFilteredByType);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isSuccess) {
    return <div>Error</div>;
  }

  return (
    <div className={styles.pokemons}>
      {pokemons.slice(390, 410).map((pokemon) => (
        <PokemonCard
          onClick={() => onClick(pokemon)}
          key={pokemon.id}
          pokemon={pokemon}
        />
      ))}
    </div>
  );
};