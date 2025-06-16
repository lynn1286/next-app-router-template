'use client';

interface ArrowIconProps {
  size?: number;
  color?: string;
  className?: string;
  direction?: 'up' | 'right' | 'down' | 'left';
}

export function ArrowIcon({
  size = 12,
  color = 'currentColor',
  className = '',
  direction = 'right',
}: ArrowIconProps) {
  // 根据方向设置旋转角度
  const rotationDegrees = {
    up: -90,
    right: 0,
    down: 90,
    left: 180,
  };

  const rotation = rotationDegrees[direction];

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      <path
        d="M5 12H19M19 12L12 5M19 12L12 19"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
