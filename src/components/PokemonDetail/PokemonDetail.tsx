import { Type } from "@components/Type/Type";
import { PokemonDetails } from "@hooks/usePokeApi";
import styles from "./PokemonDetail.module.css";
import { Abilities } from "@components/Abilities/Abilities";
import { Box, Flex } from "@chakra-ui/react";
import { Stats } from "@components/Stats/Stats";
import { Oval } from "@components/Oval/Oval";
import { Evolution } from "@components/Evolution/Evolution";
import { Pokemon, PokemonSpeciesFlavorTextEntry } from "pokedex-promise-v2";
import { forwardRef, useContext, useEffect, useState } from "react";
import { SelectedPokemonContext } from "@components/Pokedex/Pokedex";
import { CloseButton } from "@chakra-ui/react";

interface IPokemonDetailProps {
  pokemonDetails: PokemonDetails | undefined;
}

const getImage = (pokemon: Pokemon, isFrontImage: boolean) => {
  if (pokemon.id >= 650) {
    const image = isFrontImage
      ? pokemon.sprites.front_default
      : pokemon.sprites.back_default;

    return image ? image : pokemon.sprites.front_default ?? "pokeball.png";
  }

  const image = isFrontImage
    ? pokemon.sprites.versions["generation-v"]["black-white"].animated.front_default
    : pokemon.sprites.versions["generation-v"]["black-white"].animated.back_default;

  return image ? image : pokemon.sprites.front_default ?? "pokeball.png";
};

const getFullDescription = (
  language: string,
  descriptions: PokemonSpeciesFlavorTextEntry[]
) => {
  const description = descriptions.find((des) => des.language.name === language);

  return description ? description.flavor_text.replace(/\f/, "") : "";
};

const PokemonDetailRef: React.ForwardRefRenderFunction<
  HTMLElement,
  IPokemonDetailProps
> = ({ pokemonDetails }, ref) => {
  const [isFrontPokemon, setIsFrontPokemon] = useState(true);
  const { selectedPokemonId, setSelectedPokemonId } = useContext(SelectedPokemonContext);

  if (!pokemonDetails) {
    return <aside ref={ref} className={`${styles.detail}`}></aside>;
  }

  const { pokemon, evolutionChain, species } = pokemonDetails;
  const description = getFullDescription("en", species?.flavor_text_entries);

  return (
    <aside ref={ref} className={styles.detail}>
      <Box w={"100%"} h={"100%"}>
        <CloseButton className={styles.close} onClick={() => setSelectedPokemonId(-1)} />
        <Flex w={"100%"} h={180} m={2} justifyContent="center">
          <img
            alt="front"
            className={
              getImage(pokemon, isFrontPokemon) === "pokeball.png"
                ? styles.imgError
                : styles.img
            }
            src={getImage(pokemon, isFrontPokemon)}
            onClick={() => setIsFrontPokemon((isFront) => !isFront)}
          ></img>
        </Flex>
        <h5 className={styles.idPokemon}>#{pokemon.id}</h5>
        <h4>{pokemon.name}</h4>
        <div className={styles.types}>
          {pokemon.types.map((type) => (
            <Type key={type.type.name} type={type.type.name} />
          ))}
        </div>
        <h4>Pokedex Entry</h4>
        {description}
        <h4>ABILITIES</h4>
        <Abilities abilities={pokemon.abilities} />
        <Flex w="100%" flexDir={"row"}>
          <Flex w="100%" flexDir={"column"}>
            <h4>HEIGHT</h4>
            <Oval justifyContent="center">{pokemon.height / 10} m</Oval>
          </Flex>
          <Flex w="100%" flexDir={"column"}>
            <h4>WEIGHT</h4>
            <Oval justifyContent="center">{pokemon.weight / 10} Kg</Oval>
          </Flex>
        </Flex>
        <Flex w="100%" flexDir={"column"}>
          <h4>BASE EXP</h4>
          <Oval justifyContent="center">{pokemon.base_experience}</Oval>
        </Flex>
        <h4>STATS</h4>
        <Stats stats={pokemon.stats} />
        <h4>EVOLUTION</h4>
        <Evolution evolutions={evolutionChain} />
      </Box>
    </aside>
  );
};

export const PokemonDetail = forwardRef(PokemonDetailRef);
