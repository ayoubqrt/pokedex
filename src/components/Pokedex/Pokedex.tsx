import { Flex } from "@chakra-ui/react";
import { Filter, FilterType } from "@components/Filter/Filter";
import { PokemonDetail } from "@components/PokemonDetail/PokemonDetail";
import { Pokemons } from "@components/Pokemons/Pokemons";
import { InputNumber } from "@components/Range/Range";
import {
  BasicPokemon,
  getPokemonDetails,
  getPokemonsWithTypes,
  PokemonDetails,
} from "@hooks/usePokeApi";
import { NextPage } from "next";
import Image from "next/image";
import { createContext, createRef, useEffect, useRef, useState } from "react";
import { useQuery } from "react-query";
import { animated, config, useSpring, useTransition } from "react-spring";
import styles from "./Pokedex.module.css";

export const SelectedPokemonContext = createContext<any>(null);

export const Pokedex: NextPage = () => {
  const [selectedType, setSelectedType] = useState<FilterType>("all");
  const [selectedPokemonId, setSelectedPokemonId] = useState<number>(-1);
  const [filteredPokemons, setfilteredPokemons] = useState<BasicPokemon[]>([]);
  const [from, setFrom] = useState<number>(0);
  const [to, setTo] = useState<number>(50);

  const {
    isLoading: isLoadingPokemons,
    error: errorPokemons,
    data: pokemons,
    isSuccess: isSuccessPokemons,
  } = useQuery(["pokemons"], getPokemonsWithTypes, {
    onSuccess: (data) => {
      setfilteredPokemons(data);
    },
    refetchOnReconnect: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  const {
    isLoading: isLoadingDetails,
    error,
    data: pokemonDetails,
    isSuccess,
  } = useQuery(["pokemon", selectedPokemonId], () => fakeFetchLoading(), {
    enabled: selectedPokemonId > -1,
    refetchOnReconnect: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  const fakeFetchLoading = async () => {
    const startTime = new Date().getTime();

    const result = await getPokemonDetails(selectedPokemonId);

    const endTime = new Date().getTime();

    const fetchTime = endTime - startTime;
    await new Promise((resolve) => setTimeout(resolve, 400 - fetchTime));

    return result;
  };

  if (isLoadingPokemons) {
    return (
      <Flex justifyContent={"center"} alignItems="center" w={"100%"} h={"100%"}>
        <Image
          width={250}
          height={250}
          className={styles.loadingBall}
          src={"/pokeball.png"}
        />
      </Flex>
    );
  }

  if (!isSuccessPokemons) {
    return <></>;
  }

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

  const AnimatedPokemonDetail: React.FC<{
    isLoading: boolean;
    pokemonDetails: PokemonDetails | undefined;
  }> = ({ isLoading, pokemonDetails }) => {
    const AnimatedCard = animated(PokemonDetail);

    const style = useSpring({
      to: { x: isLoading ? "50vw" : "0" },
      from: { x: isLoading ? "0" : "50vw" },
    });

    return <AnimatedCard pokemonDetails={pokemonDetails} style={style} />;
  };

  return (
    // @ts-ignore
    <div>
      <header className={styles.header}>
        <Filter type="Type" onChange={(val) => filterByType(val)} />
        <InputNumber
          title="From"
          value={from}
          onChange={(val) => setFrom(val)}
        />
        <InputNumber title="To" value={to} onChange={(val) => setTo(val)} />
      </header>
      <Flex flexDir={"row"} justifyContent={"space-around"}>
        <Pokemons
          pokemons={filteredPokemons.slice(from, to)}
          onClick={(pokemon) => setSelectedPokemonId(pokemon.id)}
        />

        {selectedPokemonId > -1 && (
          <SelectedPokemonContext.Provider
            value={{ selectedPokemonId, setSelectedPokemonId }}
          >
            <AnimatedPokemonDetail
              key={pokemonDetails?.pokemon.id}
              isLoading={isLoadingDetails}
              pokemonDetails={pokemonDetails}
            />
          </SelectedPokemonContext.Provider>
        )}
      </Flex>
    </div>
  );
};
