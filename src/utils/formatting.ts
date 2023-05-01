import { ValueType, formattingType } from '@/interfaces/form-fields';

export const toUppercase = (value: string | number) =>
  String(value).toUpperCase();

export const toCapitalize = (value: string | number) => {
  const newValue = String(value);
  return newValue[0].toUpperCase() + newValue.slice(1).toLowerCase();
};

export const toNumberWithSpace = (value: string | number) => {
  const newValue = Number(String(value).replace(' ', ''));
  const isInteger = Number.isInteger(newValue);
  if (isInteger) return newValue.toLocaleString();
  return (
    Number(newValue.toFixed(0)).toLocaleString() +
    '.' +
    Number(
      newValue.toString().slice(newValue.toString().indexOf('.') + 1)
    ).toLocaleString()
  );
};

export const toSerialNumber = (value: string | number) => {
  const REGEX = /^\d{4} \d*$/;
  let strValue = String(value);
  if (strValue.match(REGEX)) return value;
  strValue = strValue.replace(' ', '');
  return strValue.slice(0, 4) + ' ' + strValue.slice(4);
};

export const toGMT = (value: string | number) => {
  const newValue = String(value);
  return newValue[0] !== '-' && newValue[0] !== '+' ? `+${newValue}` : newValue;
};

export const format = {
  toUppercase,
  toCapitalize,
  toNumberWithSpace,
  toSerialNumber,
  toGMT,
} as const;

export function formatValue(
  value: ValueType,
  formatting?: formattingType,
  preset?: string
): ValueType {
  if (Array.isArray(value))
    return [...value].map((el) => formatValue(el) as string);
  let newValue: ValueType = preset ? String(value).replace(preset, '') : value;
  if (typeof formatting === 'function') newValue = formatting(newValue);
  if (typeof formatting === 'string')
    newValue = format[formatting](newValue as string | number);
  return preset ? preset + newValue : newValue;
}
