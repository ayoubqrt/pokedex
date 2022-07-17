import { Box, Flex } from "@chakra-ui/react";
import { Oval } from "@components/Oval/Oval";
import type { EvolutionChain, PokemonEvolution } from "@hooks/usePokeApi";
import Image from "next/image";

interface IEvolutionProps {
  evolutions: PokemonEvolution[];
}

export const Evolution: React.FC<IEvolutionProps> = ({ evolutions }) => {
  return (
    <Flex w={"100%"} flexDir="row">
      {evolutions.map((pokemonEvol) => (
        <PokemonEvolution key={pokemonEvol.pokemon.name} {...pokemonEvol} />
      ))}
    </Flex>
  );
};

const PokemonEvolution: React.FC<PokemonEvolution> = ({
  pokemon,
  min_level,
}) => {
  return (
    <Oval>
      <div>{min_level === "unknown" ? "?" : `Lvl ${min_level}`}</div>
      <Image
        src={pokemon.sprites.front_default ?? ""}
        height={100}
        width={100}
        style={{
          margin: 0,
        }}
      />
    </Oval>
  );
};
