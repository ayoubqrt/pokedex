import { useEffect, useState } from "react";

interface IInputNumberProps {
  title: string;
  onChange: (value: number) => void;
  value?: number;
}

export const InputNumber: React.FC<IInputNumberProps> = ({
  title,
  onChange,
  value = 0,
}) => {
  const [val, setVal] = useState<number>(value);

  useEffect(() => {
    onChange(val);
  }, [val]);

  return (
    <>
      <label htmlFor="range">{title}</label>
      <input
        name="range"
        type="number"
        onChange={(e) => setVal(parseInt(e.target.value))}
        value={value}
      />
    </>
  );
};
