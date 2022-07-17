import { Type } from "@components/Type/Type";
import { BasicPokemon, getPokemonDetails } from "@hooks/usePokeApi";
import styles from "./PokemonDetail.module.css";
import Image from "next/image";
import { useQuery } from "react-query";
import { Abilities } from "@components/Abilities/Abilities";
import { Box, Flex } from "@chakra-ui/react";
import { Stats } from "@components/Stats/Stats";
import { Oval } from "@components/Oval/Oval";
import { Evolution } from "@components/Evolution/Evolution";

interface IPokemonDetailProps {
  pokemon: BasicPokemon;
}

const urlPicture =
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white";

export const PokemonDetail: React.FC<IPokemonDetailProps> = ({ pokemon }) => {
  const {
    isLoading,
    error,
    data: pokemonDetails,
    isSuccess,
  } = useQuery(["pokemon", pokemon.id], () => getPokemonDetails(pokemon.id));
  console.log(pokemonDetails);

  const url =
    parseInt(pokemon.id) < 650
      ? `${urlPicture}/animated/${pokemon.id}.gif`
      : `${urlPicture}/${pokemon.id}.png`;

  const justifyCenter = isLoading ? styles.justifyCenter : "";

  const getFullDescription = (language: string, descriptions: any[]) => {
    const description = descriptions.find(
      (des) => des.language.name === language
    );

    return description.flavor_text;
  };

  if (isLoading || !pokemonDetails) {
    return (
      <aside className={`${styles.detail} ${justifyCenter}`}>
        <Image
          className={styles.loadingBall}
          src="/pokeball-icon.png"
          alt="Loading"
          width={80}
          height={80}
        />{" "}
      </aside>
    );
  }

  const description = getFullDescription(
    "fr",
    pokemonDetails?.species?.flavor_text_entries
  );

  const { abilities } = pokemonDetails.pokemon;

  return (
    <aside className={`${styles.detail} ${justifyCenter}`}>
      <>
        <img className={styles.img} src={url}></img>
        <span className={styles.idPokemon}>#{pokemon.id}</span>
        <h4>{pokemon.name}</h4>
        <div className={styles.types}>
          {pokemon.types.map((type) => (
            <Type key={type.id} type={type.name} />
          ))}
        </div>
        <h4>Pokedex Entry</h4>
        {description}
        <h4>ABILITIES</h4>
        <Abilities abilities={abilities} />
        <Flex w="100%" flexDir={"row"}>
          <Flex w="100%" flexDir={"column"}>
            HEIGHT
            <Oval justifyContent="center">
              {pokemonDetails.pokemon.height / 10} m
            </Oval>
          </Flex>
          <Flex w="100%" flexDir={"column"}>
            WEIGHT
            <Oval justifyContent="center">
              {pokemonDetails.pokemon.weight / 10} Kg
            </Oval>
          </Flex>
        </Flex>
        <Flex w="100%" flexDir={"column"}>
          BASE EXP
          <Oval justifyContent="center">
            {pokemonDetails.pokemon.base_experience}
          </Oval>
        </Flex>
        STATS
        <Stats stats={pokemonDetails.pokemon.stats} />
        Evolution
        <Evolution evolutions={pokemonDetails.evolutionChain} />
      </>
    </aside>
  );
};
