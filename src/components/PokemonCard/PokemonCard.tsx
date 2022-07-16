import { Type } from "@components/Type/Type";
import type { BasicPokemon } from "@hooks/usePokeApi";
import styles from "./PokemonCard.module.css";

interface ICardProps {
  pokemon: BasicPokemon;
  onClick: () => void;
}

export const PokemonCard: React.FC<ICardProps> = ({ pokemon, onClick }) => {
  return (
    <div
      onClick={() => onClick()}
      className={`${styles.card} ${styles.container} ${styles.center}`}
    >
      <img
        className={styles.pokemonImg}
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
