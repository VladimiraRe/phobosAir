import type { validate } from '@/utils/validation';

import type { ValueType } from './form-fields';

export interface IValidationObj {
  type: keyof typeof validate | ValidationFunkType;
  oldValue?: ValueType;
  length?: { max?: number; min?: number; equal?: number };
  [key: string]: unknown;
}

export type ValidationFunkType = (
  value: ValueType,
  props?: { [key: string]: unknown }
) => { result: boolean; message: string };

export type ValidationType =
  | keyof typeof validate
  | (keyof typeof validate | ValidationFunkType | IValidationObj)[]
  | IValidationObj
  | ValidationFunkType;
