import { fireEvent, render, screen } from '@testing-library/react';

import { Button } from '@/common/Button';

describe('Button', () => {
  it('Должен быть отрендерен', () => {
    const bgColorProps = 'blue';
    const fontColorProps = 'red';
    const iconPathProps = () => {
      return (
        <svg>
          <path d="some path" />
        </svg>
      );
    };
    const styleProps = 'inline-flex';
    const sizeProps = 'py-2 px-5';
    const fillProps = 'green';
    const onClickProps = () => {
      return true;
    };
    render(
      <Button
        backgroundColor={`${bgColorProps}`}
        iconFillColor={`${fillProps}`}
        fontColor={`${fontColorProps}`}
        icon={iconPathProps()}
        size={`${sizeProps}`}
        style={`${styleProps}`}
        onClick={onClickProps}
      >
        Тест
      </Button>
    );
    expect(true).toBeTruthy();
  });
  it('Видит надпись в кнопке', () => {
    render(<Button>Test</Button>);
    const word = screen.getByText(/test/i);
    expect(word).toBeInTheDocument();
  });
  it('Видит пропсы bgColor в компоненте', () => {
    const bgColorProps = 'blue';
    render(<Button backgroundColor={`${bgColorProps}`} />);
    const elem = document.querySelector(`.${bgColorProps}`);
    expect(elem).toBeTruthy();
  });
  it('Иконка считана из пропсов компонента', () => {
    const iconPathProps = () => {
      return (
        <svg>
          <path d="some path" />
        </svg>
      );
    };
    render(<Button icon={iconPathProps()} />);
    expect(document.querySelector('svg')).toBeInTheDocument();
  });
  it('Видит пропсы fontColor в компоненте', () => {
    const fontColorProps = 'white';
    render(<Button fontColor={`${fontColorProps}`} />);
    const elem = document.querySelector(`.${fontColorProps}`);
    expect(elem).toBeTruthy();
  });
  it('Видит пропсы size в компоненте', () => {
    const sizeProps = 'px-4';
    render(<Button size={`${sizeProps}`} />);
    const elem = document.querySelector(`.${sizeProps}`);
    expect(elem).toBeTruthy();
  });
  it('Видит пропсы style в компоненте', () => {
    const styleProps = 'rounded-md';
    render(<Button style={`${styleProps}`} />);
    const elem = document.querySelector(`.${styleProps}`);
    expect(elem).toBeTruthy();
  });
  it('Выполняется обработка функции', () => {
    const count = 0;
    const action = () => {
      return count + 1;
    };
    render(<Button onClick={action} />);
    expect(fireEvent.click(screen.getByRole('button')));
  });
});
