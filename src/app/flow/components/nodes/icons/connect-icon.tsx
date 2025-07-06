'use client';

interface ConnectIconProps {
  size?: number;
  color?: string;
  className?: string;
}

export function ConnectIcon({
  size = 12,
  color = 'currentColor',
  className = '',
}: ConnectIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M7 8C7 9.10457 6.10457 10 5 10C3.89543 10 3 9.10457 3 8C3 6.89543 3.89543 6 5 6C6.10457 6 7 6.89543 7 8Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M21 16C21 17.1046 20.1046 18 19 18C17.8954 18 17 17.1046 17 16C17 14.8954 17.8954 14 19 14C20.1046 14 21 14.8954 21 16Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7 8H17M17 16L7 8"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
