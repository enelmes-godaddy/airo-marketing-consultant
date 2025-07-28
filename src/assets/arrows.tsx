import React from "react";

interface ArrowsProps {
  fill?: string;
  strokeWidth?: number;
  strokeLineCap?: "round" | "square";
  width?: number;
  height?: number;
  className?: string;
  style?: React.CSSProperties;
}

export const Arrows: React.FC<ArrowsProps> = ({
  fill = "#613EA3",
  strokeWidth = 3,
  strokeLineCap = "round",
  width = 122,
  height = 292,
  className,
  style,
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 122 292"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
    >
      <g>
        {/* Arrow 1 */}
        <path
          d="M120 144.5C119.172 144.5 118.5 145.172 118.5 146C118.5 146.829 119.172 147.5 120 147.5V144.5ZM121.061 147.061C121.647 146.475 121.647 145.525 121.061 144.939L111.515 135.393C110.929 134.808 109.979 134.808 109.393 135.393C108.808 135.979 108.808 136.929 109.393 137.515L117.879 146L109.393 154.485C108.808 155.071 108.808 156.021 109.393 156.607C109.979 157.192 110.929 157.192 111.515 156.607L121.061 147.061ZM120 146H121.5C121.5 146.828 120.828 147.5 120 147.5V146V144.5C119.172 144.5 118.5 145.172 118.5 146H120ZM120 146V147.5C120.828 147.5 121.5 146.829 121.5 146H120H118.5C118.5 145.172 119.172 144.5 120 144.5V146Z"
          fill={fill}
          strokeWidth={strokeWidth}
          strokeLinecap={strokeLineCap}
        />
        {/* Arrow 2 */}
        <path
          d="M2 290H40C51.0457 290 60 281.046 60 270V166C60 154.954 68.9543 146 80 146H118"
          fill={fill}
          strokeWidth={strokeWidth}
          strokeLinecap={strokeLineCap}
        />
        {/* Arrow 3 */}
        <path
          d="M2 194H40C51.0457 194 60 185.046 60 174V166C60 154.954 68.9543 146 80 146H118"
          fill={fill}
          strokeWidth={strokeWidth}
          strokeLinecap={strokeLineCap}
        />
        {/* Arrow 4 */}
        <path
          d="M2 98H40C51.0457 98 60 106.954 60 118V126C60 137.046 68.9543 146 80 146H118"
          fill={fill}
          strokeWidth={strokeWidth}
          strokeLinecap={strokeLineCap}
        />
        {/* Arrowhead */}
        <path
          d="M2 2H40C51.0457 2 60 10.9543 60 22V126C60 137.046 68.9543 146 80 146H118"
          fill={fill}
          strokeWidth={strokeWidth}
          strokeLinecap={strokeLineCap}
        />
      </g>
    </svg>
  );
};
