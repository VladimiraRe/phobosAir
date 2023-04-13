import { test, describe, vi, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Slider from './Slider';

const getNewList = vi.fn();
const changeCurrentDay = vi.fn();
const selectedDate = 'Su 6 Jul';
let slider: HTMLElement;
let leftButton: HTMLButtonElement;
let rightButton: HTMLButtonElement;
let elementButton: HTMLButtonElement;

describe('Тестируем компонент Slider', () => {
  const list = [
    { cost: 1230, date: 'Su 1 Jul', cheapest: false },
    { cost: 1230, date: 'Su 2 Jul', cheapest: false },
    { cost: 1230, date: 'Su 3 Jul', cheapest: false },
    { cost: 998, date: 'Su 4 Jul', cheapest: true },
    { cost: 2500, date: 'Su 5 Jul', cheapest: false },
    { cost: 1400, date: 'Su 6 Jul', cheapest: false },
    { cost: 1100, date: 'Su 7 Jul', cheapest: false },
    { cost: 2550, date: 'Su 8 Jul', cheapest: false },
    { cost: 1478, date: 'Su 9 Jul', cheapest: false },
    { cost: 1478, date: 'Su 10 Jul', cheapest: false },
  ];

  beforeEach(() => {
    render(
      <Slider
        list={list}
        weekToggle={getNewList}
        changeCurrentDay={changeCurrentDay}
        selectedDate={selectedDate}
      />
    );
    slider = screen.getByTestId('slider');
    leftButton = screen.getByTestId('left-button');
    rightButton = screen.getByTestId('right-button');
    elementButton = screen.getByText('Su 7 Jul');
  });

  test('Компонент рендерится', () => {
    expect(slider).toBeInTheDocument();
  });

  test('Рендерятся семь элементов списка, по три с каждой стороны от выбранного дня', () => {
    expect(screen.getByText('Su 3 Jul')).toBeInTheDocument();
    expect(screen.getByText('Su 4 Jul')).toBeInTheDocument();
    expect(screen.getByText('Su 5 Jul')).toBeInTheDocument();
    expect(screen.getByText('Su 6 Jul')).toBeInTheDocument();
    expect(screen.getByText('Su 7 Jul')).toBeInTheDocument();
    expect(screen.getByText('Su 8 Jul')).toBeInTheDocument();
    expect(screen.getByText('Su 9 Jul')).toBeInTheDocument();
  });

  test('Лишние элементы списка НЕ рендерятся', () => {
    expect(screen.queryByText('Su 2 Jul')).not.toBeInTheDocument();
  });

  test('При клике кнопок влево и вправо вызывается функция переключения недели', async () => {
    await userEvent.click(rightButton);
    await userEvent.click(leftButton);
    expect(getNewList).toHaveBeenCalledTimes(2);
  });

  test("При наличии у элемента списка 'cheapest: true' (самый дешевый) рендерится иконка", () => {
    expect(screen.getByTestId('cheapest')).toBeInTheDocument();
  });

  test('При клике на элемент вызывается функция changeCurrentDay', async () => {
    await userEvent.click(elementButton);
    expect(changeCurrentDay).toHaveBeenCalledTimes(1);
  });
});
