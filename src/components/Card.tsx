import { useEffect, useState } from "react";
import { BasicPokemon } from "../../hooks/usePokeApi";
import styles from "./Card.module.css";

interface ICardProps {
  pokemon: BasicPokemon;
}

export const Card = ({ pokemon }: ICardProps) => {
  const [details, setDetails] = useState<BasicPokemon>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const details = await pokemon.getDetails();
        setDetails(details);
        setLoading(false);
      } catch (error) {
        setError(true);
      }
    };
    fetchData();
  }, [pokemon]);

  if (loading) return <>Loading ...</>;

  if (error) return <>Error ...</>;

  return (
    <div className={styles.card}>
      <img
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
        alt="pokemon"
      />
      <div className="card-body">
        <h5 className="card-title">{pokemon.name}</h5>
        <p className="card-text">
          {pokemon.types.map((type) => type.name).join(", ")}
        </p>
      </div>
    </div>
  );
};
