import { Pokedex } from "@components/Pokedex/Pokedex";
import type { NextPage } from "next";
import { QueryClient, QueryClientProvider } from "react-query";
import styles from "./index.module.css";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";

const queryClient = new QueryClient();

const theme = extendTheme({
  colors: {
    types: {
      normal: "#BCBCAC",
      fighting: "#BC5442",
      flying: "#669AFF",
      poison: "#AB549A",
      ground: "#DEBC54",
      rock: "#BCAC66",
      bug: "#ABBC1C",
      ghost: "#6666BC",
      steel: "#ABACBC",
      fire: "#FF421C",
      water: "#2F9AFF",
      grass: "#78CD54",
      electric: "#FFCD30",
      psychic: "#FF549A",
      ice: "#78DEFF",
      dragon: "#7866EF",
      dark: "#785442",
      fairy: "#FFACFF",
      shadow: "#0E2E4C",
    },
  },
});

const App: NextPage = () => {
  return (
    <div className={styles.app}>
      <ChakraProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <Pokedex />
        </QueryClientProvider>
      </ChakraProvider>
    </div>
  );
};

export default App;
