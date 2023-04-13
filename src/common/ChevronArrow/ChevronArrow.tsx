import * as React from 'react';

interface IChevronArrowProps {
  rotate: boolean;
}

const ChevronArrow: React.FC<IChevronArrowProps> = ({ rotate }) => {
  return (
    <div className={rotate ? 'rotate-180' : null}>
      <svg
        width="9"
        height="16"
        viewBox="0 0 9 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M7.33268 15.1982L1.31529 8.83202C0.950941 8.44655 0.950943 7.84366 1.31529 7.45819L7.33268 1.09196"
          stroke="#0A66C2"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
};

export default ChevronArrow;
