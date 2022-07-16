import { PokemonCard } from "@components/PokemonCard/PokemonCard";
import { BasicPokemon, getPokemonsWithTypes } from "@hooks/usePokeApi";
import { usePokemons } from "@hooks/usePokemons";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import styles from "./Pokemons.module.css";
import Image from "next/image";
import { FilterType } from "@components/Filter/Filter";

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

  const [filteredPokemons, setfilteredPokemons] = useState<
    BasicPokemon[] | undefined
  >(pokemons);

  useEffect(() => {
    if (!pokemons) return;
    filterByType(pokemonsType);
  }, [pokemonsType]);

  useEffect(() => {
    if (!pokemons) return;
    setfilteredPokemons(pokemons);
  }, [pokemons]);

  const filterByType = (type: FilterType) => {
    if (type === "all") {
      setfilteredPokemons(pokemons);
      return;
    }

    const pokemonsFilteredByType = pokemons?.filter((pokemon) => {
      return pokemon.types.some((t) => t.name === type);
    });

    setfilteredPokemons(pokemonsFilteredByType);
  };

  return (
    <div className={styles.pokemons}>
      {isLoading ? (
        <Image
          width={300}
          height={300}
          className={styles.loadingBall}
          src={"/pokeball.png"}
        />
      ) : (
        filteredPokemons?.map((pokemon) => (
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
