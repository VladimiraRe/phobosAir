import { beforeEach, describe, test, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Input from '@common/input/input';

const labelText = 'Название поля';
const testText = 'test';
const widthValue = '150px';
const heightValue = '20px';
const onChange = vi.fn();
let input: HTMLInputElement;

describe('Тестирование компонента Input', () => {
  beforeEach(() => {
    render(
      <Input
        label={labelText}
        onChange={onChange}
        value={testText}
        width={widthValue}
        height={heightValue}
        textSizeClass={'text-xs'}
      />
    );
    input = screen.getByRole('textbox');
  });

  test('Input рендерится', () => {
    expect(input).toBeInTheDocument();
  });

  test('Label рендерится, когда передаем пропс', () => {
    const element = screen.getByText(labelText);
    expect(element).toBeInTheDocument();
  });

  test('onChange выполняется', async () => {
    await userEvent.type(input, testText);
    expect(onChange).toHaveBeenCalledTimes(4);
  });

  test('value отображается корректно', () => {
    expect(input.value).toBe(testText);
  });

  test('width задается корректно', () => {
    expect(input.style.width).toBe(widthValue);
  });

  test('height задается корректно', () => {
    expect(input.style.height).toBe(heightValue);
  });

  test('Размер шрифта применяется корректно', () => {
    expect(input.className).toContain('text-xs');
  });
});
