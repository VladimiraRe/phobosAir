import { useLayoutEffect, useRef, useState } from 'react';

import { validateValue } from '@/utils/validation';
import { formatValue } from '@/utils/formatting';
import type { formattingType } from '@/interfaces/formatting';
import type { IField, ValueType } from '@/interfaces/form-fields';
import type { ValidationType } from '@/interfaces/validation';

import createFields from './createFormFields';

interface IState {
  [key: string]: ValueType | '';
}

type ValidationsType = { [name: string]: ValidationType };

interface IAddFormProps {
  title: string;
  fields: IField[];
  onSubmit: (values: IState) => void;
  children?: JSX.Element | JSX.Element[];
}

const AddForm = ({ title, fields, onSubmit, children }: IAddFormProps) => {
  const fieldsProps = useRef<{
    validations: ValidationsType;
    presets: { [key: string]: string };
    formatting: { [name: string]: formattingType };
  }>({ validations: {}, presets: {}, formatting: {} });

  const [values, setValues] = useState<IState>();
  const [errors, setErrors] = useState<{
    [key: string]: string;
  }>();

  useLayoutEffect(() => {
    const initial = createInitialValues(fields);
    fieldsProps.current = initial.fieldsProps;
    setValues(initial.state);
  }, [fields]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target.id;
    if (errors && errors[target])
      setErrors((prevState) => {
        const newState = { ...prevState };
        delete newState[target];
        return newState;
      });
    let newValue: ValueType = e.target.value;
    const formatting = fieldsProps.current?.formatting[target];
    const preset = fieldsProps.current?.presets[target];
    if (formatting || preset)
      newValue = formatValue(newValue, formatting, preset);

    setValues((prevState) => ({ ...prevState, [target]: newValue }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validations = fieldsProps.current.validations;
    let isError = false;
    Object.keys(validations).forEach((name) => {
      const validation = validations[name];
      let value = values ? (values[name] as string) : '';
      const preset = fieldsProps.current.presets[name];
      if (value !== '' && preset) {
        const regex = new RegExp(
          `^${preset.replace(/([.?*+^$[\]\\(){}|-])/gi, '\\$1')}`
        );
        value = value.replace(regex, '');
      }
      const checkValue = validateValue(value, validation);
      if (!checkValue.result) {
        isError = true;
        setErrors((prevState) => ({
          ...prevState,
          [name]: checkValue.message as string,
        }));
      }
    });
    if (!isError && Object.values(errors || {}).length === 0 && values) {
      console.log('submit');
      onSubmit(values);
    }
  };

  return (
    <div className="font-open-sans max-w-[600px] m-auto p-7 bg-white max-h-min">
      <h3 className="mb-[24px] font-semibold text-xl text-middle-gray leading-7">
        {title}
      </h3>
      <form onSubmit={handleSubmit} className="flex flex-col gap-[22px]">
        {values &&
          createFields(fields, values, errors || {}, handleChange, setValues)}
        {children || null}
        <button type="submit">Сохранить</button>
      </form>
    </div>
  );
};

export default AddForm;

function createInitialValues(fields: IField[]) {
  interface IFieldsProps {
    validations: ValidationsType;
    presets: { [name: string]: string };
    formatting: { [name: string]: formattingType };
  }
  const state: IState = {};
  const fieldsProps: IFieldsProps = {
    validations: {},
    presets: {},
    formatting: {},
  };

  fields.forEach(({ name, value, validation, preset, formatting }) => {
    state[name] =
      value !== undefined ? formatValue(value, formatting, preset) : '';
    if (validation) fieldsProps.validations[name] = validation;
    if (preset) fieldsProps.presets[name] = preset;
    if (formatting) fieldsProps.formatting[name] = formatting;
  });
  return { state, fieldsProps };
}
