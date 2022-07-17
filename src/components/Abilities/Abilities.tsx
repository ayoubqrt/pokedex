import { Tooltip } from "@chakra-ui/react";
import { Oval } from "@components/Oval/Oval";
import { abilitiesColors } from "helpers";
import Image from "next/image";
import { AbilityElement } from "pokedex-promise-v2";
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
    <Tooltip
      isDisabled={!ability.is_hidden}
      hasArrow
      placement="top"
      label="Hidden"
    >
      <Oval
        styles={{
          border: "2px solid",
          flexDirection: "row",
          borderColor: getBackgroundColor(ability.ability.name),
        }}
        key={ability.ability.url}
      >
        <h5>{ability.ability.name}</h5>
        {ability.is_hidden && (
          <Image src={"/hide.png"} width={20} height={20} />
        )}
      </Oval>
    </Tooltip>
  );
};
