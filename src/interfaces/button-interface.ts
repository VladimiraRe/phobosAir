export interface IButtonProps {
  fontColor?: string;
  height: string;
  width: string;
  buttonType: 'button' | 'reset' | 'submit';
  icon?: React.ReactElement;
  onFocus?: string;
  onHover?: string;
  margin?: string;
  padding?: string;
  flexDirection?: string;
  flexWrap?: 'flex-wrap' | 'flex-wrap-reverse' | 'flex-nowrap';
  justifyContent?:
    | 'justify-normal'
    | 'justify-start'
    | 'justify-end'
    | 'justify-center'
    | 'justify-between'
    | 'justify-around'
    | 'justify-evenly'
    | 'justify-stretch';
  alignItems?:
    | 'items-start'
    | 'items-end'
    | 'items-center'
    | 'items-baseline'
    | 'items-stretch';
  onClick?: (e: React.MouseEvent) => void;
  backgroundColor?: string;
  size?: string;
  style?: string;
  children?: React.ReactNode;
  [x: string]: any;
}
