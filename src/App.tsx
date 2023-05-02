import './App.css';

import AddForm from './components/AddForm/AddForm';
import { IField } from './interfaces/form-fields';

const fields: IField[] = [
  {
    label: 'статус',
    name: 'status',
    type: 'select',
    value: 'Отложен',
    selectOptions: {
      arrived: 'Прибыл',
      canceled: 'Отменен',
      delayed: 'Отложен',
    },
  },
  {
    label: 'город',
    name: 'city',
    validation: 'word',
    type: 'text',
    formatting: 'toCapitalize',
  },
  {
    label: 'телефон',
    name: 'tel',
    type: 'tel',
    validation: [
      'integer',
      {
        type: 'length',
        length: { equal: 8 },
      },
    ],
    preset: '+',
  },
  {
    label: 'дата рождения',
    name: 'birthday',
    type: 'date',
  },
  {
    label: 'модель самолета',
    name: 'plane_model',
    type: 'text',
  },
  {
    label: 'номер самолета',
    name: 'plane_number',
    type: 'number',
    validation: 'integer',
  },
  {
    label: 'серийный номер',
    name: 'serial_number',
    validation: [
      'integer',
      {
        type: 'length',
        length: { min: 10 },
      },
    ],
    formatting: 'toSerialNumber',
  },
  {
    label: 'длина самолета',
    name: 'plane_length',
    formatting: 'toNumberWithSpace',
  },
  {
    label: 'код аэропорта',
    name: 'airport_code',
    formatting: 'toUppercase',
  },
  {
    label: 'часовой пояс',
    name: 'timezone',
    preset: 'GMT ',
    validation: 'timezone',
    formatting: 'toGMT',
  },
  {
    label: 'дата отбытия',
    name: 'departure_date',
    type: 'datetime-local',
  },
];

const initialValues = [
  'Прибыл',
  '111',
  '111',
  new Date(Date.now()).toISOString().split('T')[0],
  '111',
  '111',
  '111',
  '111',
  '111',
  'GMT -11',
  (() => {
    const now = new Date(Date.now());
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    return now.toISOString().slice(0, 16);
  })(),
];
initialValues.forEach((value, id) => (fields[id].value = value));

const App = () => {
  return (
    <div style={{ background: '#D9D9D9' }}>
      <AddForm title="Тестовая форма" fields={fields} onSubmit={() => null} />
    </div>
  );
};

export default App;
