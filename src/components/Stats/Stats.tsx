import { Flex } from "@chakra-ui/react";
import { StatElement } from "pokedex-promise-v2";
import { OvalStyle } from "styles/components.css";
import { StatName } from "./Stats.css";

interface IStatsProps {
  stats: StatElement[];
}

export const Stats: React.FC<IStatsProps> = ({ stats }) => {
  return (
    <Flex flexDir="row">
      {stats.map((stat) => (
        <Stat stat={stat} key={stat.stat.name} />
      ))}
    </Flex>
  );
};

const Stat = ({ stat }: { stat: StatElement }) => {
  return (
    <Flex flexDir="column">
      <h5 className={StatName}>{stat.stat.name}</h5>
      <h5>{stat.base_stat}</h5>
    </Flex>
  );
};
