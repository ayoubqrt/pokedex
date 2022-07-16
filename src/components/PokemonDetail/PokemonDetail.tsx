import { Type } from "@components/Type/Type";
import { BasicPokemon, getPokemonDetail } from "@hooks/usePokeApi";
import styles from "./PokemonDetail.module.css";
import Image from "next/image";
import { useQuery } from "react-query";

interface IPokemonDetailProps {
  pokemon: BasicPokemon;
}

const urlPicture =
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white";

export const PokemonDetail: React.FC<IPokemonDetailProps> = ({ pokemon }) => {
  const {
    isLoading,
    error,
    data: pokemonDetails,
    isSuccess,
  } = useQuery(["pokemon", pokemon.id], () => getPokemonDetail(pokemon.id));

  const url =
    parseInt(pokemon.id) < 650
      ? `${urlPicture}/animated/${pokemon.id}.gif`
      : `${urlPicture}/${pokemon.id}.png`;

  const justifyCenter = isLoading ? styles.justifyCenter : "";

  return (
    <aside className={`${styles.detail} ${justifyCenter}`}>
      {isLoading ? (
        <>
          <Image
            className={styles.loadingBall}
            src="/pokeball-icon.png"
            alt="Loading"
            width={80}
            height={80}
          />
        </>
      ) : (
        <>
          <img className={styles.img} src={url}></img>
          <span className={styles.idPokemon}>#{pokemon.id}</span>
          <h4>{pokemon.name}</h4>
          <div className={styles.types}>
            {pokemon.types.map((type) => (
              <Type key={type.id} type={type.name} />
            ))}
          </div>
          <h4>POKÉDEX ENTRY</h4>
          Description Abilities
        </>
      )}
    </aside>
  );
};
