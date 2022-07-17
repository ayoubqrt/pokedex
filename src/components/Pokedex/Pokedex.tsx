import { NextPage } from "next";
import { useEffect, useState } from "react";
import { PokemonCard } from "@components/PokemonCard/PokemonCard";
import { Filter, FilterType } from "@components/Filter/Filter";
import { BasicPokemon, getPokemonsWithTypes } from "@hooks/usePokeApi";
import styles from "./Pokedex.module.css";
import { PokemonDetail } from "@components/PokemonDetail/PokemonDetail";
import { usePokemons } from "@hooks/usePokemons";
import { Pokemons } from "@components/Pokemons/Pokemons";

export const Pokedex: NextPage = () => {
  const [selectedType, setSelectedType] = useState<FilterType>("all");
  const [selectedPokemon, setSelectedPokemon] = useState<BasicPokemon | null>(
    null
  );
  return (
    <>
      <header className={styles.header}>
        <Filter type="Type" onChange={(val) => setSelectedType(val)} />
      </header>
      <div className={styles.container}>
        <Pokemons
          pokemonsType={selectedType}
          onClick={(pokemon) => setSelectedPokemon(pokemon)}
        />
        {selectedPokemon && <PokemonDetail pokemon={selectedPokemon} />}
      </div>
    </>
  );
};
