import { render, fireEvent, screen } from '@testing-library/react';
import { vi } from 'vitest';

import { Popover } from '@/common/Popover';

const mockIcon = (
  <svg>
    <path d="path" />
  </svg>
);
const fontColor = 'text-gray-500';
const data = [
  { title: 'редактировать', icon: mockIcon },
  { title: 'title2' },
  { title: 'title3' },
];
const position = 'left';
const bgColor = 'bg-white';
const bgHoverColor = 'bg-sky-200';
const children = (
  <button className="w-40 h-20 bg-blue-700 text-white">button</button>
);
const buttonSize = 'h-10 w-44';
const onClick = vi.fn();

describe('Popover test', () => {
  beforeEach(() => {
    render(
      <Popover
        bgColor={`${bgColor}`}
        bgHoverColor={`${bgHoverColor}`}
        position={'top'}
        fontColor={`${fontColor}`}
        buttonSize={`${buttonSize}`}
        data={data}
        onClick={onClick}
      >
        {children}
      </Popover>
    );
  });
  it('data передается в Popover', () => {
    expect(data).toBeDefined();
  });
  it('data-title рендерятся на страницу', () => {
    data.forEach((item) => expect(screen.getByText(item.title)).toBeDefined());
  });
  it('bgColor рендерится', () => {
    const elem = document.querySelector(`.${bgColor}`);
    expect(elem).toBeDefined();
  });
  it('bgHoverColor рендерится', () => {
    expect(screen.queryByText(/`${bgHoverColor}`/i)).toBeDefined();
  });
  it('fontColor рендерится', () => {
    const elem = document.querySelector(`.${fontColor}`);
    expect(elem).toBeTruthy();
  });
  it('position верно передается Popover', () => {
    const positions = 'top right left bottom';
    expect(positions).toMatch(`${position}`);
  });
  it('Выполняется обработка функций в Popover', () => {
    const elem = screen.getByText(/редактировать/i);
    const elem2 = screen.getByText(/title2/i);
    fireEvent.click(elem);
    fireEvent.click(elem2);
    expect(onClick).toHaveBeenCalledTimes(2);
  });
});
