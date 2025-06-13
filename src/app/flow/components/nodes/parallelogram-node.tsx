'use client';

import { Handle, Position } from '@xyflow/react';
import { ShapeNodeProps, getHandleStyle, getNodeBaseStyle } from './types';

export function ParallelogramNode({ data, selected }: ShapeNodeProps) {
  const style = getHandleStyle(selected, data.isHovered);

  return (
    <div className="relative flex h-24 w-28 items-center justify-center">
      <div
        className={`absolute h-16 w-24 ${getNodeBaseStyle(selected)}`}
        style={{
          transform: 'skew(-20deg)',
          borderRadius: '8px',
          background: selected
            ? 'linear-gradient(135deg, #ffffff 0%, #f5f5f7 100%)'
            : '#ffffff',
          boxShadow: selected
            ? '0 4px 12px rgba(0, 113, 227, 0.2)'
            : '0 2px 6px rgba(0, 0, 0, 0.05)',
        }}
      ></div>

      {/* 平行四边形节点的连接点应在四个顶点 */}
      <Handle
        type="source"
        position={Position.Top}
        id="topLeft"
        style={{ ...style, top: 4, left: 'calc(50% - 15px)' }}
      />
      <Handle
        type="source"
        position={Position.Top}
        id="topRight"
        style={{ ...style, top: 4, left: 'calc(50% + 5px)' }}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        id="bottomLeft"
        style={{ ...style, bottom: 4, left: 'calc(50% - 5px)' }}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        id="bottomRight"
        style={{ ...style, bottom: 4, left: 'calc(50% + 15px)' }}
      />

      <div className="z-10 text-center text-sm font-medium text-gray-700">
        {data.label}
      </div>
    </div>
  );
}
