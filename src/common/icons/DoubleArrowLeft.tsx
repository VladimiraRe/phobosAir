interface IArrowProps {
  rotateAngle?: number;
  translateX?: number;
  translateY?: number;
  scale?: number;
  fill?: string;
}

const DoubleArrowLeft = ({
  rotateAngle = 0,
  translateX = 0,
  translateY = 0,
  scale = 1,
  fill = '000',
}: IArrowProps) => {
  return (
    <svg
      width={14}
      height={14}
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      viewBox="0 0 15.6 14"
      transform={`rotate(${rotateAngle}) translate(${translateX} ${translateY}) scale(${scale})`}
    >
      <path
        d="M10.7,7l4.9,4.9l-1.4,1.4L7.8,7l6.4-6.4L15.6,2L10.7,7z"
        fill={`#${String(fill)}`}
      />
      <path
        d="M2.9,7l4.9,5l-1.4,1.4L0,7l6.4-6.4L7.8,2L2.9,7z"
        fill={`#${String(fill)}`}
      />
    </svg>
  );
};

export default DoubleArrowLeft;
