import { Pokedex } from "@components/Pokedex/Pokedex";
import type { NextPage } from "next";
import { QueryClient, QueryClientProvider } from "react-query";
import styles from "./index.module.css";
import { ChakraProvider } from "@chakra-ui/react";

const queryClient = new QueryClient();

const App: NextPage = () => {
  return (
    <div className={styles.app}>
      <ChakraProvider>
        <QueryClientProvider client={queryClient}>
          <Pokedex />
        </QueryClientProvider>
      </ChakraProvider>
    </div>
  );
};

export default App;
