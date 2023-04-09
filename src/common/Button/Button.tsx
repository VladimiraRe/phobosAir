import { IButtonProps } from '@/interfaces/button-interface';

const Button = ({
  fontColor = '',
  backgroundColor = '',
  margin = '',
  padding = '',
  size = '',
  style = '',
  onHover = '',
  onFocus = '',
  height,
  width,
  buttonType = 'button',
  onClick,
  children,
  icon,
  flexDirection = '',
  flexWrap = 'flex-nowrap',
  justifyContent = 'justify-normal',
  alignItems = 'items-center',
  ...props
}: IButtonProps) => {
  const text = children ? <span>{children}</span> : null;

  return (
    <button
      type={`${buttonType}`}
      className={`${style} w-[${width}px] h-[${height}px] hover:${onHover} focus:${onFocus} ${size} ${margin} ${padding} ${backgroundColor} ${fontColor} ${flexDirection} ${flexWrap} ${justifyContent} ${alignItems}`}
      onClick={onClick}
      {...props}
    >
      {icon ? icon : null}
      {text}
    </button>
  );
};

export default Button;
