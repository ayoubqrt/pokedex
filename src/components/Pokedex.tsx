import { NextPage } from "next";
import { useEffect, useState } from "react";
import { BasicPokemon, getPokemonsWithTypes } from "../../hooks/usePokeApi";
import styles from "./Pokedex.module.css";
import { Card } from "./Card";

const Pokedex: NextPage = () => {
  const [pokemons, setPokemons] = useState<BasicPokemon[]>([]);

  useEffect(() => {
    getPokemonsWithTypes().then(setPokemons);
  }, []);

  return (
    <div className={styles.home}>
      {pokemons.slice(0, 25).map((pokemon) => {
        return <Card pokemon={pokemon} />;
      })}
    </div>
  );
};

export default Pokedex;
