import React from "react";

interface ArrowsProps {
  fill?: string;
  stroke?: string;
  strokeWidth?: string;
  width?: number;
  height?: number;
  className?: string;
  style?: React.CSSProperties;
}

export const Arrows: React.FC<ArrowsProps> = ({
  fill = "none",
  stroke = "#613EA3",
  strokeWidth = "3",
  width = 119,
  height = 290,
  className,
  style,
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 122 292"
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
    >
      <g>
        {/* Lines - animate first */}
        {/* Line 1 */}
        <path
          d="M1 1H39C50.0457 1 59 9.95431 59 21V125C59 136.046 67.9543 145 79 145H117"
          fill={fill}
          stroke={stroke}
          strokeWidth={strokeWidth}
        />
        {/* Line 2 */}
        <path
          d="M1 289H39C50.0457 289 59 280.046 59 269V165C59 153.954 67.9543 145 79 145H117"
          fill={fill}
          stroke={stroke}
          strokeWidth={strokeWidth}
        />
        {/* Line 3 */}
        <path
          d="M1 193H39C50.0457 193 59 184.046 59 173V165C59 153.954 67.9543 145 79 145H117"
          fill={fill}
          stroke={stroke}
          strokeWidth={strokeWidth}
        />

        {/* Line 4 */}
        <path
          d="M1 97H39C50.0457 97 59 105.954 59 117V125C59 136.046 67.9543 145 79 145H117"
          fill={fill}
          stroke={stroke}
          strokeWidth={strokeWidth}
        />

        {/* Arrowhead - animate last */}
        <path
          d="M118 144.5C117.724 144.5 117.5 144.724 117.5 145C117.5 145.276 117.724 145.5 118 145.5V144.5ZM118.354 145.354C118.549 145.158 118.549 144.842 118.354 144.646L115.172 141.464C114.976 141.269 114.66 141.269 114.465 141.464C114.269 141.66 114.269 141.976 114.465 142.172L117.293 145L114.465 147.828C114.269 148.024 114.269 148.34 114.465 148.536C114.66 148.731 114.976 148.731 115.172 148.536L118.354 145.354ZM118 145H118.5C118.5 145.276 118.276 145.5 118 145.5V145V144.5C117.724 144.5 117.5 144.724 117.5 145H118ZM118 145V145.5C118.276 145.5 118.5 145.276 118.5 145H118H117.5C117.5 144.724 117.724 144.5 118 144.5V145Z"
          fill={fill}
          stroke={stroke}
          strokeWidth={strokeWidth}
        />
      </g>
    </svg>
  );
};
