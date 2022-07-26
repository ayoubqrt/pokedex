import { Select } from "@chakra-ui/react";
import { useState } from "react";

interface IFilterProps {
  onChange: (value: string) => void;
  type: "Type" | "Ability" | "Height" | "Weight";
}

const types = [
  "all",
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

export const Filter: React.FC<IFilterProps> = ({ onChange }) => {
  const [selectedFilter, setSelectedFilter] = useState("");
  const [options, setOptions] = useState<string[]>([]);

  const handleChange = (selectedFilter: FilterType) => {
    const filter = selectedFilter === "" ? "all" : selectedFilter;

    setSelectedFilter(filter);
    onChange(filter);
  };

  return (
    <Select
      value={selectedFilter}
      onChange={(e) => handleChange(e.target.value)}
      placeholder="Type"
      size="md"
    >
      {types.map((type) => (
        <option key={type} value={type}>
          {type}
        </option>
      ))}
    </Select>
  );
};
