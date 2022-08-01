import { Flex, NumberInput, NumberInputField } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { InputNumberStyle } from "./InputNumber.css";

interface IInputNumberProps {
  title: string;
  onChange: (value: number) => void;
  value?: number;
  className?: string;
}

export const InputNumber: React.FC<IInputNumberProps> = ({
  title,
  onChange,
  value = 0,
  className,
}) => {
  const [val, setVal] = useState<number>(value);

  useEffect(() => {
    onChange(val);
  }, [val]);

  const isNumber = (value: string) => {
    return !isNaN(Number(value));
  };

  const handleChange = (value: string) => {
    if (isNumber(value)) {
      setVal(Number(value));
      return;
    }

    setVal(0);
  };

  return (
    <Flex flexDir="row" alignItems="center">
      <label htmlFor="range">{title}</label>
      <NumberInput
        className={className}
        name="range"
        onChange={(val) => handleChange(val)}
        value={value}
      >
        <NumberInputField />
      </NumberInput>
    </Flex>
  );
};
