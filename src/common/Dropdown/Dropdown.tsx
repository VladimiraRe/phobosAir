import * as React from 'react';

import { flightStatus as flightStatusInitial } from '@/interfaces/flight-status';
import ArrowLeft from '@/common/icons/ArrowLeft';

interface IDropdownProps {
  currentInitial: string;
  onChange: (page: string) => void;
  flightStatus: object;
}

const onChangeInitial = () => {
  return null;
};

const Dropdown = ({
  currentInitial = flightStatusInitial.Completed,
  onChange = onChangeInitial,
  flightStatus = flightStatusInitial,
}: IDropdownProps) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [current, setCurrent] = React.useState(currentInitial);

  const handleOpenCloseMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setIsOpen((value) => !value);
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const button: HTMLButtonElement = event.currentTarget;
    onChange(button.value);
    setCurrent(button.value);
    setIsOpen(false);
  };

  const renderFlightStatus = () => {
    const elements = Object.values(flightStatus).map((menuItem, index) => {
      return (
        <div
          className={`box-border block w-[540px] h-[40px] text-sm ring-1 ring-gray-300 ${
            menuItem.valueOf() === current
              ? 'bg-sky-500 text-white  '
              : 'hover: text-gray-900 bg-gray-50 hover:bg-gray-100'
          } ${index === 0 && 'rounded-t-[2px] hover:rounded-t-[2px]'} ${
            index === Object.values(flightStatus).length - 1 &&
            'rounded-b-[2px] hover:rounded-b-[2px]'
          }`}
          role="none"
          key={index}
        >
          <button
            className="box-border block w-full px-[16px] h-[40px] align-middle py-2 text-sm text-left leading-none"
            role="menuitem"
            tabIndex={Number(-1)}
            id={`menu-item-${index + 1}`}
            onClick={handleClick}
            value={menuItem}
          >
            {menuItem.valueOf()}
          </button>
        </div>
      );
    });
    return elements;
  };

  const renderFlightStatusMenuList = renderFlightStatus();

  return (
    <div
      className={`relative inline-block text-left ${
        !isOpen && 'delay-300 overflow-hidden'
      }`}
    >
      <div className="pb-[15px]">Статус</div>
      <div className="w-[540px] leading-3 rounded-[2px] hover:rounded-[2px]">
        <button
          type="button"
          className="inline-flex w-full h-[40px] justify-between items-center gap-x-1.5 bg-gray-50 px-[16px] py-2 text-sm text-left font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-100 rounded hover:rounded"
          id="menu-button"
          aria-expanded="true"
          aria-haspopup="true"
          onClick={handleOpenCloseMenu}
        >
          {current}
          {isOpen ? (
            <ArrowLeft
              rotateAngle={90}
              translateX={0}
              translateY={0}
              scale={1}
              fill={'8A8A8A'}
            />
          ) : (
            <ArrowLeft
              rotateAngle={270}
              translateX={0}
              translateY={0}
              scale={1}
              fill={'8A8A8A'}
            />
          )}
        </button>
      </div>

      <div
        className={
          isOpen
            ? 'absolute origin-top transition ease-out duration-200 transform opacity-100 scale-100 right-0 z-50 mt-1 w-[540px] divide-y divide-gray-100 rounded hover:rounded bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'
            : 'absolute origin-top transition ease-in duration-200 transform opacity-0 scale-95 -z-50 overflow-hidden'
        }
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="menu-button"
        tabIndex={Number(-1)}
      >
        {renderFlightStatusMenuList}
      </div>
    </div>
  );
};

export default Dropdown;
