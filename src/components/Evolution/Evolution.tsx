import { Box, Flex } from "@chakra-ui/react";
import { Oval } from "@components/Oval/Oval";
import { SelectedPokemonContext } from "@components/Pokedex/Pokedex";
import type { EvolutionChain, PokemonEvolution } from "@hooks/usePokeApi";
import Image from "next/image";
import { useContext } from "react";
import { EvolutionStyle } from "./Evolution.css";

interface IEvolutionProps {
  evolutions: PokemonEvolution[];
}

export const Evolution: React.FC<IEvolutionProps> = ({ evolutions }) => {
  return (
    <Flex w={"100%"} justifyContent="center" flexDir="row">
      {evolutions.length > 0 ? (
        evolutions.map((pokemonEvol) => (
          <PokemonEvolution key={pokemonEvol.pokemon.name} {...pokemonEvol} />
        ))
      ) : (
        <Box>No evolution </Box>
      )}
    </Flex>
  );
};

const PokemonEvolution: React.FC<PokemonEvolution> = ({
  pokemon,
  min_level,
}) => {
  const { selectedPokemonId, setSelectedPokemonId } = useContext(
    SelectedPokemonContext
  );

  return (
    <>
      {min_level !== 1 && (
        <Flex alignItems={"center"} flexDir={"row"}>
          <Oval
            styles={{
              border: "1px solid grey",
              padding: "4px 10px",
              height: "fit-content",
            }}
          >
            {min_level === "unknown" ? "?" : `Lvl ${min_level}`}
          </Oval>
          <Image
            alt="image"
            onClick={() => setSelectedPokemonId(pokemon.id)}
            className={EvolutionStyle}
            src={pokemon.sprites.front_default ?? ""}
            height={100}
            width={100}
          />
        </Flex>
      )}
    </>
  );
};
