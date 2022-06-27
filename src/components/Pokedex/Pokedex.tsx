import { NextPage } from "next";
import { useEffect, useState } from "react";
import { Card } from "@components/Card/Card";
import { Filter } from "@components/Filter/Filter";
import { BasicPokemon, getPokemonsWithTypes } from "@hooks/usePokeApi";
import styles from "./Pokedex.module.css";

const Pokedex: NextPage = () => {
  const [pokemons, setPokemons] = useState<BasicPokemon[]>([]);
  const [filteredPokemons, setfilteredPokemons] = useState<BasicPokemon[]>([]);
  const [typeSelected, setTypesSelected] = useState<string>("");

  useEffect(() => {
    getPokemonsWithTypes().then((pokemons) => {
      setPokemons(pokemons);
      setfilteredPokemons(pokemons);
    });
  }, []);

  useEffect(() => {
    filterByType(typeSelected);
  }, [typeSelected]);

  const filterByType = (type: string) => {
    const pokemonsFilteredByType = pokemons.filter((pokemon) => {
      return pokemon.types.some((t) => t.name === type);
    });

    setfilteredPokemons(pokemonsFilteredByType);
  };

  return (
    <div className={styles.home}>
      <div>
        <Filter type="Type" onChange={(val) => setTypesSelected(val)} />
        <div className={styles.pokemons}>
          {filteredPokemons.slice(0, 25).map((pokemon) => {
            return <Card key={pokemon.id} pokemon={pokemon} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Pokedex;
