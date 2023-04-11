interface IArrowProps {
  rotateAngle?: number;
  translateX?: number;
  translateY?: number;
  scale?: number;
  fill?: string;
}

const ArrowLeft = ({
  rotateAngle = 0,
  translateX = 0,
  translateY = 0,
  scale = 1,
  fill = '000',
}: IArrowProps) => {
  return (
    <svg
      width={8}
      height={14}
      viewBox="0 0 8 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      transform={`rotate(${rotateAngle}) translate(${translateX} ${translateY}) scale(${scale})`}
    >
      <path
        d="M2.82808 6.99974L7.77808 11.9497L6.36408 13.3637L7.60158e-05 6.99974L6.36408 0.635742L7.77808 2.04974L2.82808 6.99974Z"
        fill={`#${String(fill)}`}
      />
    </svg>
  );
};

export default ArrowLeft;
