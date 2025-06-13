'use client';

import { Handle, Position } from '@xyflow/react';
import { ShapeNodeProps, getHandleStyle } from './types';

export function TrapezoidNode({ data, selected }: ShapeNodeProps) {
  const style = getHandleStyle(selected, data.isHovered);

  return (
    <div className="relative flex h-24 w-28 items-center justify-center">
      <svg
        width="100"
        height="60"
        viewBox="0 0 100 60"
        className="drop-shadow-md"
        style={{
          filter: selected
            ? 'drop-shadow(0 4px 8px rgba(0, 113, 227, 0.3))'
            : 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1))',
          transition: 'all 0.2s ease-out',
        }}
      >
        <path
          d="M20 2H80L95 58H5L20 2Z"
          fill={selected ? 'url(#trapezoidGradient)' : '#ffffff'}
          stroke={selected ? '#0071e3' : '#e5e7eb'}
          strokeWidth="2"
          strokeLinejoin="round"
          rx="4"
        />
        <defs>
          <linearGradient
            id="trapezoidGradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#f5f5f7" />
          </linearGradient>
        </defs>
      </svg>

      {/* 梯形节点的连接点应在四个顶点 */}
      <Handle
        type="source"
        position={Position.Top}
        id="topLeft"
        style={{ ...style, top: 2, left: 'calc(50% - 15px)' }}
      />
      <Handle
        type="source"
        position={Position.Top}
        id="topRight"
        style={{ ...style, top: 2, left: 'calc(50% + 15px)' }}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        id="bottomLeft"
        style={{ ...style, bottom: 2, left: 'calc(50% - 23px)' }}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        id="bottomRight"
        style={{ ...style, bottom: 2, left: 'calc(50% + 23px)' }}
      />

      <div className="z-10 text-center text-sm font-medium text-gray-700">
        {data.label}
      </div>
    </div>
  );
}
