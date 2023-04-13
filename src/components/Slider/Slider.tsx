import * as React from 'react';

import CheapestIcon from '@common/CheapestIcon/CheapestIcon';
import { ChevronArrow } from '@common/ChevronArrow';

interface ISliderProps {
  list: { cost: number; date: string; cheapest: boolean }[];
  weekToggle: (event: React.MouseEvent<HTMLButtonElement>) => void;
  changeCurrentDay: (event: React.MouseEvent<HTMLButtonElement>) => void;
  selectedDate: string;
}

const Slider: React.FC<ISliderProps> = ({
  list,
  weekToggle,
  selectedDate,
  changeCurrentDay,
}) => {
  const selectedDateIdx = list.findIndex((item) => item.date === selectedDate);
  const week =
    selectedDateIdx != -1
      ? list.slice(selectedDateIdx - 3, selectedDateIdx + 4)
      : list.slice(0, 7);

  const sliderList = week.map((item, idx) => {
    const selected = idx === 3 && item.date === selectedDate;
    return (
      <button
        key={item.date}
        className={`grid grid-cols-1 justify-items-center items-center h-full w-36 relative ${
          selected ? 'z-20' : null
        }`}
        onClick={changeCurrentDay}
      >
        <span
          className={`font-open-sans ${
            selected ? 'text-sm text-blue z-20' : 'text-xs'
          }  self-end`}
        >
          CHF {item.cost}
        </span>
        <span
          className={`font-open-sans self-start ${
            selected ? 'text-sm text-blue z-20' : 'text-xs'
          }`}
        >
          {item.date}
        </span>
        <div className="absolute left-[68%] top-0.5">
          {item.cheapest ? <CheapestIcon /> : null}
        </div>
      </button>
    );
  });

  return (
    <div className="flex w-min relative" data-testid="slider">
      <button className="px-6" onClick={weekToggle} data-testid="left-button">
        <ChevronArrow />
      </button>
      <div className="h-12 border-2 border-gray flex overflow-hidden rounded">
        {sliderList}
      </div>
      {selectedDateIdx != -1 ? (
        <div className="w-28 h-20 absolute z-10 border-2 border-blue bg-white left-[45%] top-[-35%] rounded" />
      ) : null}
      <button className="px-6" onClick={weekToggle} data-testid="right-button">
        <ChevronArrow rotate />
      </button>
    </div>
  );
};

export default Slider;
