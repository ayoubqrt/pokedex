import { Flex } from "@chakra-ui/react";
import { Oval } from "@components/Oval/Oval";
import { StatElement } from "pokedex-promise-v2";
// import { OvalStyle } from "styles/components.css";
import { StatName } from "./Stats.css";

interface IStatsProps {
  stats: StatElement[];
}

export const Stats: React.FC<IStatsProps> = ({ stats }) => {
  return (
    <Flex w={"100%"} justifyContent={"space-between"} flexDir="row">
      {stats.map((stat) => (
        <Stat stat={stat} key={stat.stat.name} />
      ))}
    </Flex>
  );
};

const Stat = ({ stat }: { stat: StatElement }) => {
  const getShortName = (name: string) => {
    if (name === "special-defense") {
      return "SpD";
    }
    if (name === "special-attack") {
      return "SpA";
    }
    if (name === "defense") {
      return "DEF";
    }
    if (name === "attack") {
      return "ATK";
    }
    if (name === "hp") {
      return "HP";
    }
    if (name === "speed") {
      return "SPD";
    }
    return name;
  };

  const getBackgroundColor = (name: string) => {
    if (name === "special-defense") {
      return "#96da83";
    }
    if (name === "special-attack") {
      return "#85DDFF";
    }
    if (name === "defense") {
      return "#eecd3d";
    }
    if (name === "attack") {
      return "#FF994D";
    }
    if (name === "hp") {
      return "#DF2140";
    }
    if (name === "speed") {
      return "#FB94A8";
    }
    if (name === "TOT") {
      return "#7195DC";
    }
    return "";
  };

  return (
    <Flex w={100} flexDir="column">
      <Oval
        styles={{
          flexDirection: "column",
          padding: "5px",
          backgroundColor: stat.stat.name === "TOT" ? "#88AAEA" : "",
        }}
        key={stat.stat.name}
      >
        <h5
          style={{
            backgroundColor: getBackgroundColor(stat.stat.name),
          }}
          className={StatName}
        >
          {getShortName(stat.stat.name)}
        </h5>
        <h5>{stat.base_stat}</h5>
      </Oval>
    </Flex>
  );
};
