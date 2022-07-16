import { abilitiesColors } from "helpers";
import Image from "next/image";
import { AbilityElement } from "pokedex-promise-v2";
import { OvalStyle } from "../../styles/components.css";
import { AbilitiesStyles } from "./Abilities.css";

interface IAbilitiesProps {
  abilities: AbilityElement[];
}

export const Abilities: React.FC<IAbilitiesProps> = ({ abilities }) => {
  return (
    <div className={AbilitiesStyles}>
      {abilities.map((ability) => (
        <Ability ability={ability} key={ability.ability.name} />
      ))}
    </div>
  );
};

const Ability = ({ ability }: { ability: AbilityElement }) => {
  const getBackgroundColor = (name: string) => {
    const newName = name.charAt(0).toUpperCase() + name.slice(1);

    return abilitiesColors[newName];
  };

  return (
    <div
      style={{
        border: "2px solid",
        borderColor: getBackgroundColor(ability.ability.name),
      }}
      className={OvalStyle}
      key={ability.ability.url}
    >
      <h5>{ability.ability.name}</h5>
      {ability.is_hidden && <Image src={"/hide.png"} width={20} height={20} />}
    </div>
  );
};
