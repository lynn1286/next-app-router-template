'use client';

import { Handle, Position } from '@xyflow/react';
import { ShapeNodeProps, getHandleStyle } from './types';

export function TriangleNode({ data, selected }: ShapeNodeProps) {
  const style = getHandleStyle(selected, data.isHovered);

  return (
    <div className="relative flex h-24 w-24 items-center justify-center">
      <svg
        width="60"
        height="52"
        viewBox="0 0 60 52"
        className="drop-shadow-md"
        style={{
          filter: selected
            ? 'drop-shadow(0 4px 8px rgba(0, 113, 227, 0.3))'
            : 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1))',
          transition: 'all 0.2s ease-out',
        }}
      >
        <path
          d="M30 2L58 50H2L30 2Z"
          fill={selected ? '#0071e3' : '#ffffff'}
          stroke={selected ? '#0071e3' : '#e5e7eb'}
          strokeWidth="2"
          strokeLinejoin="round"
        />
      </svg>

      {/* 顶部连接点 */}
      <div
        className={`absolute -top-[10px] left-1/2 z-10 h-2 w-2 -translate-x-1/2 rounded-full border-2 border-white bg-blue-500 shadow-sm ${
          selected || data.isHovered ? 'opacity-100' : 'opacity-0'
        } transition-opacity duration-300`}
      >
        <Handle
          type="source"
          position={Position.Top}
          id="top"
          className="inset-0 m-0 h-full w-full border-0 bg-transparent opacity-0"
          style={{ transform: 'none' }}
        />
      </div>

      {/* 左下角连接点 */}
      <div
        className={`absolute -bottom-[10px] left-[10px] z-10 h-2 w-2 rounded-full border-2 border-white bg-blue-500 shadow-sm ${
          selected || data.isHovered ? 'opacity-100' : 'opacity-0'
        } transition-opacity duration-300`}
      >
        <Handle
          type="source"
          position={Position.Bottom}
          id="bottomLeft"
          className="inset-0 m-0 h-full w-full border-0 bg-transparent opacity-0"
          style={{ transform: 'none' }}
        />
      </div>

      {/* 右下角连接点 */}
      <div
        className={`absolute right-[10px] -bottom-[10px] z-10 h-2 w-2 rounded-full border-2 border-white bg-blue-500 shadow-sm ${
          selected || data.isHovered ? 'opacity-100' : 'opacity-0'
        } transition-opacity duration-300`}
      >
        <Handle
          type="source"
          position={Position.Bottom}
          id="bottomRight"
          className="inset-0 m-0 h-full w-full border-0 bg-transparent opacity-0"
          style={{ transform: 'none' }}
        />
      </div>

      <div
        className="absolute z-10 mt-2 text-center text-sm font-medium"
        style={{ color: selected ? 'white' : '#374151' }}
      >
        {data.label}
      </div>
    </div>
  );
}
