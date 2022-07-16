import { Pokedex } from "@components/Pokedex/Pokedex";
import type { NextPage } from "next";
import { QueryClient, QueryClientProvider } from "react-query";
import styles from "./index.module.css";

const queryClient = new QueryClient();

const App: NextPage = () => {
  return (
    <div className={styles.app}>
      <QueryClientProvider client={queryClient}>
        <Pokedex />
      </QueryClientProvider>
    </div>
  );
};

export default App;
