import { getBackgroundColor } from "@components/Type/Type";
import { ChakraStylesConfig, MultiValueProps, Select } from "chakra-react-select";
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
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  const handleChange = (options: string[]) => {
    setSelectedFilters(options);
    onChange(options);
  };

  const chakraStyles: ChakraStylesConfig = {
    control: (provided) => ({
      ...provided,
      background: "white",
    }),
  };

  return (
    <Select
      closeMenuOnSelect={false}
      chakraStyles={chakraStyles}
      styles={{ valueContainer: (provided) => ({ ...provided, background: "red" }) }}
      isMulti
      placeholder="Type"
      colorScheme="messenger"
      // @ts-ignore
      onChange={(values) => handleChange(values.map((v) => v.value))}
      options={types.map((type) => ({
        value: type,
        label: type[0].toUpperCase() + type.slice(1),
      }))}
    />
  );
};
