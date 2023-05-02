import { ChangeEventHandler } from 'react';

import { ValueType, inputType } from '@/interfaces/form-fields';
import { Dropdown } from '@/common/Dropdown';

import Class from './AddForm.module.css';

interface IState {
  [key: string]: ValueType | '';
}

interface IField {
  name: string;
  type?: inputType;
  required?: boolean;
  selectOptions?: { [key: string]: string };
  label?: string;
}

export default function createFields(
  fields: IField[],
  values: IState,
  errors: { [key: string]: string },
  handleChange: ChangeEventHandler<HTMLSelectElement | HTMLInputElement>,
  setValues: React.Dispatch<React.SetStateAction<IState | undefined>>
) {
  return fields.map(({ name, type, required, selectOptions, label }, id) => {
    const errorMessage: string | undefined = errors[name];
    const itemClass = ['font-normal text-sm leading-4 text-dark-gray'];
    const fieldClass = [
      'bg-light-gray border border-gray rounded-sm p-[11px] w-[100%] focus:outline-none',
    ];
    const errorClass = ['text-alarm opacity-0 transition duration-[300ms]'];
    let field: JSX.Element;

    if (errorMessage) {
      fieldClass.push('border border-alarm');
      errorClass.push('opacity-100 pt-[5px]');
    }

    if (type === 'select') {
      field = createSelect(
        name,
        values[name] as string,
        selectOptions as { [key: string]: string }
      );
    } else field = createInput(name, values[name], fieldClass, type, required);

    return (
      <div key={id} className={itemClass.join(' ')}>
        {label && (
          <label
            htmlFor={name}
            className="capitalize font-semibold block pb-[14px]"
          >
            {label}
          </label>
        )}
        {field}
        <p className={errorClass.join(' ')}>{errorMessage || ''}</p>
      </div>
    );
  });

  function createSelect(
    name: string,
    value: string,
    options: { [key: string]: string }
  ) {
    const currentInitial = value || Object.values(options)[0];
    const onChange = (newValue: string) =>
      setValues((prevState) => ({ ...prevState, [name]: newValue }));
    return (
      <Dropdown
        currentInitial={currentInitial}
        onChange={onChange}
        flightStatus={options}
      />
    );
  }

  function createInput(
    name: string,
    value: ValueType,
    fieldClass: string[],
    type?: string,
    required?: boolean
  ) {
    let onClick:
      | ((e: React.MouseEvent<HTMLInputElement, MouseEvent>) => void)
      | undefined = undefined;
    const className = [...fieldClass];
    if (type === 'date' || type === 'datetime-local') {
      className.push(Class.fieldDate);
      onClick = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) =>
        e.currentTarget.showPicker();
    }

    return (
      <input
        type={type || 'text'}
        id={name}
        onChange={handleChange}
        onClick={onClick}
        value={value}
        required={required !== undefined ? required : true}
        className={className.join(' ')}
      />
    );
  }
}

// function createSelect(name: string, value: ValueType, options: OptionType[]) {
//   const selectFields = options.map((option, id) => (
//     <option key={`o-${id}`} value={option.optionValue}>
//       {option.optionName}
//     </option>
//   ));
//   return (
//     <select
//       value={value || options[0].optionValue}
//       onChange={handleChange}
//       id={name}
//       className={Class.addForm__field}
//     >
//       {selectFields}
//     </select>
//   );
// }
