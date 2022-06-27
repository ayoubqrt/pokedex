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

type FilterType = typeof types[number];

export const Filter = (props: IFilterProps) => {
  const [selectedFilter, setSelectedFilter] = useState("");
  const [options, setOptions] = useState<string[]>([]);

  const handleChange = (selectedFilter: FilterType) => {
    setSelectedFilter(selectedFilter);
    props.onChange(selectedFilter);
  };

  return (
    <select
      value={selectedFilter}
      onChange={(e) => handleChange(e.target.value)}
    >
      {types.map((type) => (
        <option key={type} value={type}>
          {type}
        </option>
      ))}
    </select>
  );
};
