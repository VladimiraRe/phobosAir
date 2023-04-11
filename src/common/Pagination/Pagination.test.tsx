import { test, expect, describe, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Pagination } from '@common/Pagination';

describe('Pagination. Elements rendered:', () => {
  const total = 50;
  const current = 3;
  const pageSize = 5;
  const onChange = vi.fn();

  beforeEach(() => {
    render(
      <Pagination
        total={total}
        current={current}
        pageSize={pageSize}
        onChange={onChange}
      />
    );
  });

  test('Navigation', () => {
    const navigation = screen.queryByRole('navigation', {
      name: /Pagination/i,
    });
    expect(navigation).toBeInTheDocument();
  });

  test('First Page link', () => {
    const first = screen.queryByRole('button', { name: /First page/i });
    expect(first).toBeInTheDocument();
  });

  test('Previous Page link', () => {
    const previous = screen.queryByRole('button', { name: /Previous/i });
    expect(previous).toBeInTheDocument();
  });

  test('Next Page link', () => {
    const next = screen.queryByRole('button', { name: /Next/i });
    expect(next).toBeInTheDocument();
  });

  test('Last Page link', () => {
    const last = screen.queryByRole('button', { name: /Last page/i });
    expect(last).toBeInTheDocument();
  });

  test('Current page link', () => {
    const currentElement = screen.getByRole('button', { current: true });
    expect(currentElement).toBeInTheDocument();
  });

  test('Current page link', () => {
    const currentElement = screen.getByRole('button', { current: true });
    expect(currentElement).toBeInTheDocument();
  });
});

describe('Pagination. Three dots are rendered:', () => {
  test('Three dots on left side', () => {
    const total = 50;
    const current = 10;
    const pageSize = 5;
    const onChange = vi.fn();

    render(
      <Pagination
        total={total}
        current={current}
        pageSize={pageSize}
        onChange={onChange}
      />
    );
    const threeDotsOnLeft = screen.getAllByText('...');
    expect(threeDotsOnLeft.length).toEqual(1);
  });

  test('Three dots on right side', () => {
    const total = 50;
    const current = 1;
    const pageSize = 5;
    const onChange = vi.fn();

    render(
      <Pagination
        total={total}
        current={current}
        pageSize={pageSize}
        onChange={onChange}
      />
    );
    const threeDotsOnRight = screen.getAllByText('...');
    expect(threeDotsOnRight.length).toEqual(1);
  });

  test('Three dots on the left and on the right', () => {
    const total = 50;
    const current = 5;
    const pageSize = 5;
    const onChange = vi.fn();

    render(
      <Pagination
        total={total}
        current={current}
        pageSize={pageSize}
        onChange={onChange}
      />
    );
    const threeDotsTwice = screen.getAllByText('...');
    expect(threeDotsTwice.length).toEqual(2);
  });
});

describe('Pagination. Elements NOT rendered', () => {
  const total = 50;
  const pageSize = 5;
  const onChange = vi.fn();

  test('First Page link', () => {
    render(
      <Pagination
        total={total}
        current={1}
        pageSize={pageSize}
        onChange={onChange}
      />
    );
    const first = screen.queryByRole('button', { name: /First page/i });
    expect(first).not.toBeInTheDocument();
  });

  test('Previous Page link', () => {
    render(
      <Pagination
        total={total}
        current={1}
        pageSize={pageSize}
        onChange={onChange}
      />
    );
    const previous = screen.queryByRole('button', { name: /Previous/i });
    expect(previous).not.toBeInTheDocument();
  });

  test('Next Page link', () => {
    render(
      <Pagination
        total={total}
        current={10}
        pageSize={pageSize}
        onChange={onChange}
      />
    );
    const next = screen.queryByRole('button', { name: /Next/i });
    expect(next).not.toBeInTheDocument();
  });

  test('Last Page link', () => {
    render(
      <Pagination
        total={total}
        current={10}
        pageSize={pageSize}
        onChange={onChange}
      />
    );
    const last = screen.queryByRole('button', { name: /Last page/i });
    expect(last).not.toBeInTheDocument();
  });
});

describe('Pagination. Function called:', () => {
  const total = 50;
  const current = 3;
  const pageSize = 5;
  const onChange = vi.fn();

  test('should call onChange function twice', async () => {
    const user = userEvent.setup();
    render(
      <Pagination
        total={total}
        current={current}
        pageSize={pageSize}
        onChange={onChange}
      />
    );
    await user.click(screen.getByRole('button', { name: /2/i }));
    await user.click(screen.getByRole('button', { name: /3/i }));
    expect(onChange).toBeCalledTimes(2);
  });
});
