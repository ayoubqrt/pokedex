import { Pokedex } from "@components/Pokedex/Pokedex";
import type { NextPage } from "next";
import styles from "./index.module.css";

const App: NextPage = () => {
  return (
    <div className={styles.app}>
      <Pokedex />
    </div>
  );
};

export default App;
