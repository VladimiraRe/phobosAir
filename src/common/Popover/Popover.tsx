import * as React from 'react';

interface IPopoverProps {
  fontColor?: string;
  onClick?: (event: React.MouseEvent) => void;
  buttonSize?: string;
  children?: React.ReactNode;
  position: 'top' | 'bottom' | 'left' | 'right';
  bgColor?: string;
  bgHoverColor?: string;
  data: Array<{
    title?: string;
    icon?: JSX.Element;
  }>;
}

const Popover: React.FC<IPopoverProps> = ({
  data,
  position,
  buttonSize,
  bgColor,
  bgHoverColor,
  fontColor,
  onClick,
  children,
}) => {
  const setPosition = () => {
    switch (position) {
      case 'bottom':
        return 'top-[calc(100%+1rem)] left-1/3 -translate-x-1/2 before:content-[""] before:absolute before:border-b-0 before:border-r-0 before:bottom-[calc(96%)] before:left-[calc(50%)] before:border-2 before:border-slate-900 before:w-3 before:h-3 before:rotate-45 before:bg-gradient-to-tl before:from-transparent before:from-40% before:to-white before:to-45%';
      case 'top':
        return '-translate-x-1/2 left-1/3 bottom-[calc(100%+1rem)] before:content-[""] before:absolute before:border-t-0 before:border-s-0 before:top-[calc(96.5%)] before:box-border before:left-1/2 before:border-2 before:border-slate-900 before:w-3 before:h-3 before:rotate-45 before:bg-gradient-to-br before:from-transparent before:from-40% before:to-white before:to-45%';
      case 'left':
        return 'right-[calc(100%+1.5rem)] top-[calc(100%-2.5rem)] before:content-[""] before:absolute before:border-s-0 before:border-b-0 before:box-border before:border-slate-900 before:border-2 before:left-[calc(98%)] before:top-2.5 before:w-3 before:h-3 before:rotate-45 before:bg-gradient-to-tr before:from-transparent before:from-40% before:to-white before:to-45%';
      case 'right':
        return 'left-[calc(100%+1.5rem)] top-[calc(100%-2.5rem)] before:content-[""] before:absolute before:border-r-0 before:border-t-0 before:box-border before:right-[calc(97.5%)] before:top-2.5 before:border-2 before:border-slate-900 before:w-3 before:h-3 before:rotate-45 before:bg-gradient-to-bl before:from-transparent before:from-40% before:to-white before:to-45%';
    }
  };

  const popoverButtonList = data.map((item) => {
    return (
      <li
        key={item.title}
        className={`first:rounded-t-md last:rounded-b-md ${bgColor} transition-colors ${bgHoverColor}`}
      >
        <button
          onClick={onClick}
          className={`px-3 py-2 ${buttonSize} w-full flex text-md gap-2 ${fontColor}`}
        >
          {item.icon}
          {item.title}
        </button>
      </li>
    );
  });
  return (
    <div className="relative">
      {children}
      <div
        className={`absolute ${setPosition()} border-slate-900 border-2 rounded-md w-52`}
      >
        <ul className={'divide-y divide-slate-900'}>{popoverButtonList}</ul>
      </div>
    </div>
  );
};

export default Popover;
