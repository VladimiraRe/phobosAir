import { test, expect, describe, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Dropdown } from '@common/Dropdown';
import { flightStatus } from '@/interfaces/flight-status';

describe('Dropdown. Elements should be rendered:', () => {
  const onChange = vi.fn();

  beforeEach(() => {
    render(
      <Dropdown
        currentInitial={flightStatus.Completed}
        onChange={onChange}
        flightStatus={flightStatus}
      />
    );
  });

  test('Dropdown', () => {
    const navigation = screen.queryByRole('menu');
    expect(navigation).toBeInTheDocument();
  });

  test('menuitem Прибыл', () => {
    const menuItem = screen.queryByRole('menuitem', { name: /Прибыл/i });
    expect(menuItem).toBeInTheDocument();
  });

  test('menuitem Отменен', () => {
    const menuItem = screen.queryByRole('menuitem', { name: /Отменен/i });
    expect(menuItem).toBeInTheDocument();
  });

  test('menuitem Завершенный', () => {
    const menuItem = screen.queryByRole('menuitem', { name: /Завершенный/i });
    expect(menuItem).toBeInTheDocument();
  });

  test('menuitem Отложен', () => {
    const menuItem = screen.queryByRole('menuitem', { name: /Отложен/i });
    expect(menuItem).toBeInTheDocument();
  });

  test('menuitem Отправлен', () => {
    const menuItem = screen.getByRole('menuitem', { name: /Отправлен/i });
    expect(menuItem).toBeInTheDocument();
  });

  test('menuitem В срок', () => {
    const menuItem = screen.getByRole('menuitem', { name: /В срок/i });
    expect(menuItem).toBeInTheDocument();
  });
});

describe('Dropdown. Function called:', () => {
  const onChange = vi.fn();

  test('should call onChange function twice', async () => {
    const user = userEvent.setup();
    render(
      <Dropdown
        currentInitial={flightStatus.Completed}
        onChange={onChange}
        flightStatus={flightStatus}
      />
    );
    await user.click(screen.getByRole('menuitem', { name: /Отправлен/i }));
    await user.click(screen.getByRole('menuitem', { name: /Завершенный/i }));
    expect(onChange).toBeCalledTimes(2);
  });
});
