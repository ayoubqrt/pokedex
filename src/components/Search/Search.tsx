import { Input, InputGroup, InputRightAddon } from "@chakra-ui/react";
import Image from "next/image";

interface ISearchProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export const Search: React.FC<ISearchProps> = ({ value, className, onChange }) => {
  return (
    <InputGroup className={className}>
      <Input
        bg="white"
        onChange={(e) => onChange(e.target.value)}
        value={value}
        type="text"
        placeholder="Search your pokemon"
      />
    </InputGroup>
  );
};
