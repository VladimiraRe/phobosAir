import { render } from '@testing-library/react';

import { AdminFooter } from '@/components/AdminFooter';

describe('AdminFooter рендерится', () => {
  beforeEach(() => {
    render(<AdminFooter />);
  });
  it('backgroundColor отображается в FooterAdmin', () => {
    const backgroundColor = 'bg-sky-900';
    const elem = document.querySelector(`.${backgroundColor}`);
    expect(elem).toBeDefined();
  });
  it('Размеры задаются в FooterAdmin', () => {
    const footer = document.querySelector('footer');
    expect(footer).toHaveClass('h-16');
    expect(footer).toHaveClass('w-full');
  });
});
