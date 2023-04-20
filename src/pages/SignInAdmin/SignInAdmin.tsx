import * as React from 'react';
import { useState } from 'react';

import XMarkIcon from '@icons/XMarkIcon';
import EyeSlashIcon from '@icons/EyeSlashIcon';
import EyeIcon from '@icons/EyeIcon';

const SignInAdmin = () => {
  const [open, setOpen] = useState(false);
  const [values, setValues] = useState({
    email: '',
    password: '',
  });
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setOpen(!open);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      [event.target.id]: event.target.value,
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // console.log(values);
  };

  return (
    <div data-testid="signInAdmin" className="flex flex-col min-h-screen">
      {
        //header
      }
      <main className="flex flex-grow w-full">
        <div className="w-[443px] h-[440px] relative p-8 pt-12 m-auto bg-white border border-slate-200 rounded-md shadow-md">
          <span className="text-sm font-bold text-slate-500">
            Зайти как админ
          </span>
          <XMarkIcon
            className={'absolute w-6 h-6 cursor-pointer top-3 right-3'}
          />
          <form onSubmit={handleSubmit} className="flex flex-col gap-3 mt-6">
            <div>
              <label className="text-xs text-gray-800" htmlFor="email">
                E-mail
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-2 bg-white shadow-md focus:outline-none"
                onChange={handleChange}
                value={values.email}
              />
            </div>
            <div className="relative">
              <label className="text-xs text-gray-800" htmlFor="password">
                Пароль
              </label>
              <input
                type={open ? 'text' : 'password'}
                id="password"
                className="w-full px-4 py-2 bg-white shadow-md focus:outline-none"
                onChange={handleChange}
                value={values.password}
              ></input>
              <button onClick={onClick} className="absolute right-2 bottom-2">
                {open ? <EyeSlashIcon /> : <EyeIcon />}
              </button>
            </div>
            <div className="flex mt-4">
              <input
                id="remember"
                type="checkbox"
                className="mr-1 checked:bg-sky-800 focus:ring-transparent"
              />
              <label htmlFor="remember" className="mr-auto text-xs">
                Запомни меня таким какой я есть
              </label>
              <span className="text-xs text-red-700">Забыл меня?</span>
            </div>
            <div className="self-end mt-3 ">
              <button
                type="submit"
                className="w-40 h-10 text-white bg-red-600 rounded-md shadow-md"
              >
                Войти
              </button>
            </div>
          </form>
        </div>
      </main>
      {
        //footer
      }
    </div>
  );
};

export default SignInAdmin;
