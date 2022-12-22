import { Box, Button, Flex, Switch } from "@chakra-ui/react";
import { Filter, FilterType } from "@components/Dropdown/Dropdown";
import { InputNumber } from "@components/InputNumber/InputNumber";
import { AnimatedPokemonDetail } from "@components/PokemonDetail/PokemonDetail";
import { Pokemons } from "@components/Pokemons/Pokemons";
import { Search } from "@components/Search/Search";
import { BasicPokemon, getPokemonDetails, getPokemonsWithTypes } from "@hooks/usePokeApi";
import { NextPage } from "next";
import Image from "next/image";
import { createContext, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useKey } from "react-use";
import styles from "./Pokedex.module.css";

export const SelectedPokemonContext = createContext<any>(null);

const filterByType = (types: FilterType[], pokemons: BasicPokemon[]): BasicPokemon[] => {
  if (types.some((t) => t === "all")) {
    return pokemons;
  }

  const pokemonsFilteredByType = pokemons?.filter((pokemon) => {
    return pokemon.types.some((t) => types.find((type) => t.name === type));
  });

  return pokemonsFilteredByType;
};

const filterByName = (name: string, pokemons: BasicPokemon[]): BasicPokemon[] => {
  if (name === "") {
    return pokemons;
  }

  const pokemonsFilteredByName = pokemons?.filter((pokemon) => {
    return pokemon.name.includes(name);
  });

  return pokemonsFilteredByName;
};

export const Pokedex: NextPage = () => {
  const [selectedTypes, setSelectedTypes] = useState<FilterType[]>([]);
  const [selectedPokemonId, setSelectedPokemonId] = useState<number>(-1);
  const [filteredPokemons, setfilteredPokemons] = useState<BasicPokemon[]>([]);
  const [from, setFrom] = useState<number>(0);
  const [to, setTo] = useState<number>(50);
  const [searchedPokemon, setSearchedPokemon] = useState<string>("");
  const [isAscending, setIsAscending] = useState<boolean>(true);
  useKey("Escape", () => setSelectedPokemonId(-1));

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

  useEffect(() => {
    if (!pokemons) {
      return;
    }
    let pokemonsFiltered = isAscending ? [...pokemons] : [...pokemons].reverse();

    if (selectedTypes.length > 0) {
      pokemonsFiltered = filterByType(selectedTypes, pokemonsFiltered);
    }

    pokemonsFiltered = filterByName(searchedPokemon, pokemonsFiltered);

    setfilteredPokemons(pokemonsFiltered);
  }, [isAscending, selectedTypes, searchedPokemon]);

  if (isLoadingPokemons) {
    return (
      <Flex justifyContent={"center"} alignItems="center" w={"100%"} h={"100vh"}>
        <Image
          width={250}
          height={250}
          className={styles.loadingBall}
          src={"/pokeball.png"}
          alt="pokeball"
        />
      </Flex>
    );
  }

  if (!isSuccessPokemons) {
    return <></>;
  }

  const showMorePokemons = () => {
    setTo((to) => to + 50);
  };

  const handleSwitchChange = () => {
    setIsAscending((isAscending) => !isAscending);
  };

  return (
    <div>
      <header className={styles.header}>
        <h1>Pokedex</h1>
        <Search
          className={styles.marginBottom}
          value={searchedPokemon}
          onChange={(val) => {
            if (!val) {
              setSearchedPokemon(val);
              return;
            }

            setSearchedPokemon(val.toLowerCase());
          }}
        />
        <Filter
          className={`${styles.marginBottom} ${styles.bgWhite}`}
          type="Type"
          onChange={(val) => {
            setSelectedTypes(val);
          }}
        />
        <Flex justifyContent="space-between" alignItems="center" flexDir="row">
          <Flex alignItems="center">
            <Box marginRight={1}>Ascending</Box>
            <Switch
              isChecked={isAscending}
              id="switch"
              onChange={() => handleSwitchChange()}
              size="md"
            />
          </Flex>
          <Flex>
            <InputNumber
              className={styles.margin}
              title="From"
              value={from}
              onChange={(val) => setFrom(val)}
            />
            <InputNumber
              className={styles.margin}
              title="To"
              value={to}
              onChange={(val) => setTo(val)}
            />
          </Flex>
        </Flex>
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
      <Flex justifyContent="center">
        <Button
          colorScheme="red"
          visibility={to < filteredPokemons.length ? "visible" : "hidden"}
          onClick={() => showMorePokemons()}
        >
          Show more !
        </Button>
      </Flex>
    </div>
  );
};
