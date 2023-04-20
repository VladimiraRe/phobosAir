import { render, screen } from '@testing-library/react';

import { ClientFooter } from '@/components/ClientFooter';

let clientFooter: HTMLElement;
describe('ClientFooter test', () => {
  beforeEach(() => {
    render(<ClientFooter />);
    clientFooter = screen.getByTestId('ClientFooter');
  });
  it('ClientFooter рендерится', () => {
    expect(clientFooter).toBeInTheDocument();
  });
  it('backgroundColor отображается в ClientFooter', () => {
    const backgroundColor = 'bg-sky-900';
    const elem = document.querySelector(`.${backgroundColor}`);
    expect(elem).toBeDefined();
  });
  it('Размеры задаются в ClientFooter', () => {
    const footer = document.querySelector('footer');
    expect(footer).toHaveClass('h-20');
    expect(footer).toHaveClass('w-full');
  });
  it('Ссылки рендерятся в ClientFooter', () => {
    const elem = screen.getByText(/About Us/i);
    const elem2 = screen.getByText(/Contact Us/i);
    const elem3 = screen.getByText(/Terms and Conditions/i);
    expect(elem).toBeDefined();
    expect(elem2).toBeDefined();
    expect(elem3).toBeDefined();
  });
});
