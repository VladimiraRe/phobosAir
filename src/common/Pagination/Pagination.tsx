import * as React from 'react';

import ArrowLeft from '@/common/icons/ArrowLeft';
import DoubleArrowLeft from '@/common/icons/DoubleArrowLeft';

interface IPaginationProps {
  total: number;
  current: number;
  pageSize: number;
  onChange: (page: number) => void;
}

const Pagination = ({
  total = 50,
  current = 4,
  pageSize = 5,
  onChange,
}: IPaginationProps) => {
  const totalPages = Math.ceil(total / pageSize);

  if (current <= 0 || current > totalPages) {
    throw new Error(`Invalid page number: ${current}`);
  }

  const onFirst = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    onChange(1);
  };

  const onLast = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    onChange(Math.ceil(total / pageSize));
  };

  const onNext = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    onChange(current + 1);
  };

  const onPrevious = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    onChange(current - 1);
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const button: HTMLButtonElement = event.currentTarget;
    onChange(Number(button.value));
  };

  const range = (start: number, end: number) => {
    const length: number = end - start + 1;
    return Array.from({ length }, (_, index) => index + start);
  };

  const threeDots = '...';

  const paginationRangeFunc = () => {
    const totalPageNumbers = 6;

    if (totalPageNumbers >= totalPages) {
      return range(1, totalPages);
    }

    const leftSiblingIndex = Math.max(current - 1, 1);
    const rightSiblingIndex = Math.min(current + 1, totalPages);

    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPages - 2;

    const firstPageIndex = 1;
    const lastPageIndex = totalPages;

    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftRange = range(1, 5);

      return [...leftRange, threeDots, totalPages];
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightRange = range(totalPages - 6, totalPages);
      return [firstPageIndex, threeDots, ...rightRange];
    }

    if (shouldShowLeftDots && shouldShowRightDots) {
      const middleRange = range(leftSiblingIndex, rightSiblingIndex);
      return [
        firstPageIndex,
        threeDots,
        ...middleRange,
        threeDots,
        lastPageIndex,
      ];
    }
  };

  const renderPagination = () => {
    const paginationRangeElements = paginationRangeFunc();

    if (Array.isArray(paginationRangeElements)) {
      const elements = paginationRangeElements.map(
        (pageNumber: number | string | undefined) => {
          return (
            <li
              key={pageNumber}
              className={
                pageNumber === current
                  ? 'relative z-10 inline-flex items-center text-sm bg-blue-500 font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 rounded-sm  ring-1 ring-inset ring-gray-300'
                  : 'relative inline-flex items-center text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 rounded-sm bg-gray-50 hover:bg-gray-100 focus:z-20 focus:outline-offset-0'
              }
            >
              <button
                key={pageNumber}
                className="px-4 py-2"
                aria-current={pageNumber === current ? true : false}
                type="button"
                onClick={pageNumber !== threeDots ? handleClick : undefined}
                value={pageNumber}
                name={String(pageNumber)}
              >
                {pageNumber !== threeDots ? pageNumber : threeDots}
              </button>
            </li>
          );
        }
      );
      return elements;
    }
  };

  return (
    <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <nav
            className="isolate inline-flex -space-x-px rounded-md shadow-sm gap-1"
            aria-label="Pagination"
            role="navigation"
          >
            <ul className="flex gap-1">
              {current > 2 ? (
                <li className="relative inline-flex items-center text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 rounded-sm bg-gray-50 hover:bg-gray-100 focus:z-20 focus:outline-offset-0">
                  <button className="px-3 py-3" onClick={onFirst}>
                    <span className="sr-only">First page</span>
                    <DoubleArrowLeft translateX={1} />
                  </button>
                </li>
              ) : null}
              {current > 1 ? (
                <li className="relative inline-flex items-center text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 rounded-sm bg-gray-50 hover:bg-gray-100 focus:z-20 focus:outline-offset-0">
                  <button className="px-4 py-3" onClick={onPrevious}>
                    <span className="sr-only">Previous</span>
                    <ArrowLeft
                      rotateAngle={0}
                      translateX={0}
                      translateY={0}
                      scale={1}
                      fill={'000'}
                    />
                  </button>
                </li>
              ) : null}
              {renderPagination()}
              {current < Math.ceil(total / pageSize) ? (
                <li className="relative inline-flex items-center text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 rounded-sm bg-gray-50 hover:bg-gray-100 focus:z-20 focus:outline-offset-0">
                  <button className="px-4 py-3" onClick={onNext}>
                    <span className="sr-only">Next</span>
                    <ArrowLeft
                      rotateAngle={180}
                      translateX={0}
                      translateY={0}
                      scale={1}
                      fill={'000'}
                    />
                  </button>
                </li>
              ) : null}
              {current < Math.ceil(total / pageSize) - 1 ? (
                <li className="relative inline-flex items-center text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 rounded-sm bg-gray-50 hover:bg-gray-100 focus:z-20 focus:outline-offset-0">
                  <button className="px-3 py-3" onClick={onLast}>
                    <span className="sr-only">Last page</span>
                    <DoubleArrowLeft
                      rotateAngle={180}
                      translateX={-1}
                      translateY={0}
                      scale={1}
                      fill={'000'}
                    />
                  </button>
                </li>
              ) : null}
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
