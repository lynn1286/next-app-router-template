'use client';

import { Handle, Position } from '@xyflow/react';
import { ShapeNodeProps, getHandleStyle } from './types';

export function IrregularRectangleNode({
  data,
  selected,
  notHanle,
}: ShapeNodeProps) {
  const style = getHandleStyle(selected, data.isHovered);

  return (
    <div
      className="flex items-center justify-center"
      style={{
        width: !notHanle ? '120px' : '40px',
        height: !notHanle ? '120px' : '40px',
      }}
    >
      <div
        className="relative h-full w-full"
        style={{
          filter: selected
            ? 'drop-shadow(0 5px 15px rgba(0, 113, 227, 0.25))'
            : 'drop-shadow(0 3px 8px rgba(0, 0, 0, 0.08))',
        }}
      >
        <svg
          width="100%"
          height="100%"
          className="absolute inset-0"
          viewBox="0 0 40 40"
          preserveAspectRatio="xMidYMid meet"
        >
          <g transform="translate(2, 2)">
            <path
              d="M0,18 L3.6,0 L32.4,0 L36,18 L32.4,36 L3.6,36 Z"
              fill={selected ? 'url(#irregular-gradient)' : '#ffffff'}
              stroke={selected ? '#0071e3' : '#e5e5e5'}
              strokeWidth="1.5"
            />
          </g>
          {/* 渐变定义 */}
          <defs>
            <linearGradient
              id="irregular-gradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#f0f0f5" />
            </linearGradient>
          </defs>
        </svg>

        {!notHanle && (
          <>
            <Handle
              type="source"
              position={Position.Top}
              id="top"
              style={{ ...style, left: '50%', top: 0 }}
            />
            <Handle
              type="source"
              position={Position.Right}
              id="right"
              style={{ ...style, right: 0, top: '50%' }}
            />
            <Handle
              type="source"
              position={Position.Bottom}
              id="bottom"
              style={{ ...style, left: '50%', bottom: 0 }}
            />
            <Handle
              type="source"
              position={Position.Left}
              id="left"
              style={{ ...style, left: 0, top: '50%' }}
            />
          </>
        )}

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-xs font-medium text-gray-700">
            {data.label}
          </div>
        </div>
      </div>
    </div>
  );
}
