import * as React from 'react';

interface IInputProps {
  label: string | null;
  width: number;
  height: number;
  shadow: boolean;
  textSizeClass: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<IInputProps> = ({
  label = null,
  width = 544,
  height = 40,
  shadow = false,
  textSizeClass = 'text-sm',
  value,
  onChange,
}) => {
  return (
    <label className="grid grid-cols-1">
      <span className={`text-dark-gray ${textSizeClass} pb-3.5`}>{label}</span>
      <input
        style={{
          width: width,
          height: height,
        }}
        className={`p-3 border-gray outline-none rounded-sm font-sans ${textSizeClass} border-2 bg-light-gray ${
          shadow ? 'drop-shadow-md' : null
        }`}
        type="text"
        value={value}
        onChange={onChange}
      />
    </label>
  );
};

export default Input;
