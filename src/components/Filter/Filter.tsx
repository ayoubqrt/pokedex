import { getBackgroundColor } from "@components/Type/Type";
import { MultiValueProps, Select } from "chakra-react-select";
import { useState } from "react";

interface IFilterProps {
  onChange: (values: string[]) => void;
  type: "Type" | "Ability" | "Height" | "Weight";
  className?: string;
}

const types = [
  "normal",
  "fire",
  "water",
  "electric",
  "grass",
  "ice",
  "fighting",
  "poison",
  "ground",
  "flying",
  "psychic",
  "bug",
  "rock",
  "ghost",
  "dragon",
  "dark",
  "steel",
  "fairy",
];

export type FilterType = typeof types[number];

export const Filter: React.FC<IFilterProps> = ({ onChange, className }) => {
  const [selectedFilter, setSelectedFilter] = useState<string[]>([]);
  const [options, setOptions] = useState<string[]>([]);

  const handleChange = (options: string[]) => {
    setSelectedFilter(options);
    onChange(options);
  };

  return (
    <Select
      className={className}
      isMulti
      placeholder="Type"
      colorScheme="messenger"
      onChange={(values) => handleChange(values.map((v) => v.value))}
      options={types.map((type) => ({
        value: type,
        label: type,
      }))}
    />
  );
};
