import { Type } from "@components/Type/Type";
import type { BasicPokemon } from "@hooks/usePokeApi";
import styles from "./Card.module.css";

interface ICardProps {
  pokemon: BasicPokemon;
}

export const Card = ({ pokemon }: ICardProps) => {
  return (
    <div className={`${styles.card} ${styles.container} ${styles.center}`}>
      <img
        className={styles.cardImg}
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
        alt="pokemon"
      />
      <h6 className={styles.idPokemon}>N°{pokemon.id}</h6>
      <span className={styles.cardTitle}>{pokemon.name}</span>
      <div className={styles.types}>
        {pokemon.types.map((type) => (
          <Type key={type.id} type={type.name} />
        ))}
      </div>
    </div>
  );
};
