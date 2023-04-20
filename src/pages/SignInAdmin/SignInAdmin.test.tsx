import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
// import userEvent from '@testing-library/react'
import { vi } from 'vitest';

import { SignInAdmin } from '@/pages/SignInAdmin';

describe('SignInAdmin test', () => {
  beforeEach(() => {
    render(<SignInAdmin />);
  });
  it('SignInAdmin рендерится на страницу', () => {
    const signInPageAdmin = screen.getByTestId('signInAdmin');
    expect(signInPageAdmin).toBeDefined();
  });
  it('Поле email рендерится на страницу SignInAdmin', () => {
    const email = screen.getByLabelText(/E-mail/i);
    expect(email).toBeInTheDocument();
  });
  it('Поле password рендерится на страницу SignInAdmin', () => {
    const password = screen.getByLabelText(/Пароль/i);
    expect(password).toBeInTheDocument();
  });
  it('Button рендерится на страницу SignInAdmin', () => {
    const submitButton = screen.getByText(/Войти/i);
    expect(submitButton).toBeInTheDocument();
  });
  it('Передаются верные данные', () => {
    const submit = vi.fn();

    const emailField = screen.getByLabelText(/E-mail/i);
    const passwordField = screen.getByLabelText(/Пароль/i);

    userEvent.type(emailField, 'kakoi-tomail@mail.ru');
    userEvent.type(passwordField, 'superSecret666');

    submit({
      email: 'kakoi-tomail@mail.ru',
      password: 'superSecret666',
    });

    expect(submit).toHaveBeenCalledWith({
      email: 'kakoi-tomail@mail.ru',
      password: 'superSecret666',
    });
  });
});
