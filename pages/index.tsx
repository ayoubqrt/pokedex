import { Pokedex } from "@components/Pokedex/Pokedex";
import type { NextPage } from "next";
import { QueryClient, QueryClientProvider } from "react-query";
import styles from "./index.module.css";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import Head from "next/head";

const queryClient = new QueryClient();

const App: NextPage = () => {
	return (
		<div className={styles.app}>
			<Head>
				<title>Pokedex - Pokémon list</title>
				<meta name="description" content="Check out all the pokemons from generation 1 to 8" key="desc" />
				<meta property="og:title" content="Pokedex - Pokémon list" />
				<meta property="og:description" content="Check out all the pokemons from generation 1 to 8" />
				<meta property="og:image" content="https://example.com/images/cool-page.jpg" />
			</Head>
			<ChakraProvider>
				<QueryClientProvider client={queryClient}>
					<Pokedex />
				</QueryClientProvider>
			</ChakraProvider>
		</div>
	);
};

export default App;
