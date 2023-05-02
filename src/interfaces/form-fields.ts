import type { formattingType } from './formatting';
import { ValidationType } from './validation';

export type inputType =
  | 'date'
  | 'datetime-local'
  | 'tel'
  | 'text'
  | 'number'
  | 'select';

export type ValueType = string | number | readonly string[];

export interface IField {
  name: string;
  label: string;
  validation?: ValidationType;
  type?: inputType;
  value?: ValueType;
  required?: boolean;
  selectOptions?: { [key: string]: string };
  preset?: string;
  formatting?:
    | formattingType
    | ((
        newValue: ValueType,
        oldValue?: ValueType,
        validationProps?: { [key: string]: unknown }
      ) => ValueType);
}
