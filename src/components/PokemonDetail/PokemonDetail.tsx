import { Type } from "@components/Type/Type";
import { BasicPokemon } from "@hooks/usePokeApi";
import { usePokemonDetail } from "@hooks/usePokemonDetail";
import { useEffect, useRef } from "react";
import styles from "./PokemonDetail.module.css";
import Image from "next/image";

interface IPokemonDetailProps {
  pokemon: BasicPokemon;
}

const urlPicture =
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white";

export const PokemonDetail: React.FC<IPokemonDetailProps> = ({ pokemon }) => {
  const { pokemonDetail, isLoading } = usePokemonDetail(pokemon.id);
  let url = "";

  const ref = useRef<HTMLDivElement>(null);

  if (parseInt(pokemon.id) >= 650) {
    url = urlPicture + "/" + pokemon.id + ".png";
  } else {
    url = urlPicture + "/animated/" + pokemon.id + ".gif";
  }

  // useEffect(() => {
  //   // console.log(pokemonDetail);
  //   if (!ref.current) {
  //     return;
  //   }

  //   if (isLoading) {
  //     ref.current.className = `${styles.detail} ${styles.slidesOut}`;
  //     return;
  //   }
  //   ref.current.className = `${styles.detail} ${styles.slidesIn}`;
  // }, [isLoading]);

  return (
    <aside ref={ref} className={`${styles.detail} ${styles.slidesIn}`}>
      {isLoading ? (
        <>
          <Image
            className={styles.loadingBall}
            src="/pokeball-icon.png"
            alt="Picture of the author"
            width={500}
            height={500}
          />{" "}
        </>
      ) : (
        <>
          <img className={styles.img} src={url}></img>
          <span className={styles.idPokemon}>#{pokemon.id}</span>
          <h5>{pokemon.name}</h5>
          <div className={styles.types}>
            {pokemon.types.map((type) => (
              <Type key={type.id} type={type.name} />
            ))}
          </div>
        </>
      )}
    </aside>
  );
};
