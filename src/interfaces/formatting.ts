import type { format } from '@/utils/formatting';

import type { ValueType } from './form-fields';

export type formattingType = formattingFunc | keyof typeof format;
export type formattingFunc = (value: ValueType) => typeof value;
