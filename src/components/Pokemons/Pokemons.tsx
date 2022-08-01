import { PokemonCard } from "@components/PokemonCard/PokemonCard";
import { BasicPokemon, getPokemonsWithTypes } from "@hooks/usePokeApi";
import { usePokemons } from "@hooks/usePokemons";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import styles from "./Pokemons.module.css";
import Image from "next/image";
import { FilterType } from "@components/Dropdown/Dropdown";

interface IPokemonsProps {
  pokemons: BasicPokemon[];
  onClick: (pokemon: BasicPokemon) => void;
  isLoading?: boolean;
}

export const Pokemons: React.FC<IPokemonsProps> = ({ pokemons, onClick, isLoading }) => {
  return (
    <div className={styles.pokemons}>
      {isLoading ? (
        <Image
          alt="pokemonLoading"
          width={300}
          height={300}
          className={styles.loadingBall}
          src={"/pokeball.png"}
        />
      ) : (
        pokemons.map((pokemon) => (
          <PokemonCard
            onClick={() => onClick(pokemon)}
            key={pokemon.id}
            pokemon={pokemon}
          />
        ))
      )}
    </div>
  );
};
