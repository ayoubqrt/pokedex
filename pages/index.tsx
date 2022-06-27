import type { NextPage } from "next";
import Pokedex from "@components/Pokedex/Pokedex";
import styles from "./index.module.css";

const Home: NextPage = () => {
  return (
    <div className={styles.app}>
      <Pokedex />
    </div>
  );
};

export default Home;
