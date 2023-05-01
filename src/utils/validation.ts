import {
  ValidationFunk,
  ValidationObj,
  ValidationType,
  ValueType,
} from '@/interfaces/form-fields';

type ValidateResultType = { result: boolean; message?: string };

export const ERROR_MESSAGE = {
  validateWord: 'Допустимы только буквы',
  validateNumber: 'Допустимы только цифры',
  validateInteger: 'Допустимы только целые числа',
  validateYear: 'Год в правильном формате',
  validateTimezone: 'Число в диапазоне от -12 до +12',
  validateLength: ({
    max,
    min,
    equal,
  }: {
    max?: number;
    min?: number;
    equal?: number;
  }) => {
    let message = 'Количество знаков: ';
    if (max) message += `не больше ${max}`;
    if (min) message += `не меньше ${min}`;
    if (equal) message += `должно равняться ${equal}`;
    return message;
  },
} as const;

export const validateRegex = (
  value: string | number,
  oldValue: ValueType = '',
  regex: RegExp,
  message: string
) => {
  const res: ValidateResultType = { result: true };
  const newValue = String(value)
    .toLowerCase()
    .replace(String(oldValue).toLowerCase(), '')
    .replace(' ', '');
  const isValidated = regex.test(newValue);
  if (!isValidated) {
    res.result = false;
    res.message = message;
  }
  return res;
};

export const validateWord = (
  value: string | number,
  { oldValue }: { oldValue?: ValueType }
) => {
  const REGEX = /^[a-z]+|[а-я]+$/;
  return validateRegex(value, oldValue, REGEX, ERROR_MESSAGE.validateWord);
};

export const validateNumber = (
  value: string | number,
  { oldValue }: { oldValue?: ValueType }
) => {
  const REGEX = /^[0-9]+.[0-9]+$/;
  return validateRegex(value, oldValue, REGEX, ERROR_MESSAGE.validateNumber);
};

export const validateInteger = (
  value: string | number,
  { oldValue }: { oldValue?: ValueType }
) => {
  const REGEX = /^[0-9]+$/;
  return validateRegex(value, oldValue, REGEX, ERROR_MESSAGE.validateInteger);
};

export const validateYear = (
  value: string | number,
  { oldValue }: { oldValue?: ValueType }
) => {
  const REGEX = /^(19|20)\d{2}$/;
  return validateRegex(value, oldValue, REGEX, ERROR_MESSAGE.validateYear);
};

export const validateTimezone = (
  value: string | number,
  { oldValue }: { oldValue?: ValueType }
) => {
  const REGEX = /^(\+|-)([0-9]|1[0-2])$/;
  return validateRegex(value, oldValue, REGEX, ERROR_MESSAGE.validateTimezone);
};

export const validateLength = (
  value: ValueType,
  props?: { length?: { max?: number; min?: number; equal?: number } }
) => {
  const length = String(value).length;
  const { max, min, equal } = props?.length || {};
  const errorRes = (message: { [key: string]: number }) => {
    const errRes: ValidateResultType = { result: false };
    errRes.message = ERROR_MESSAGE.validateLength(message);
    return errRes;
  };
  if (min && length < min) return errorRes({ min });
  if (max && length > max) return errorRes({ max });
  if (equal && length !== equal) return errorRes({ equal });
  return { result: true };
};

export const validate = {
  word: validateWord,
  number: validateNumber,
  integer: validateInteger,
  timezone: validateTimezone,
  year: validateYear,
  length: validateLength,
} as const;

export function validateValue(value: string, validation: ValidationType) {
  if (Array.isArray(validation)) {
    let result: ValidateResultType = { result: true };
    validation.find((el) => {
      const check = getResult(el, value);
      if (!check.result) {
        result = check;
        return true;
      }
      return false;
    });
    return result;
  } else return getResult(validation, value);
}

function getResult(
  validation: keyof typeof validate | ValidationObj | ValidationFunk,
  value: string | number,
  props?: Omit<ValidationObj, 'type'>
): ValidateResultType {
  if (typeof validation === 'object') {
    const { type, ...other } = validation;
    return getResult(type, value, other);
  } else if (typeof validation === 'function') return validation(value);
  else if (validation === 'length') return validate[validation](value, props);
  else
    return validate[validation](value, {
      oldValue: (props?.oldValue as ValueType) || '',
    });
}
