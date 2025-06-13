'use client';

import { Handle, Position } from '@xyflow/react';
import { ShapeNodeProps, getHandleStyle, getNodeBaseStyle } from './types';

export function DiamondNode({ data, selected }: ShapeNodeProps) {
  const style = getHandleStyle(selected, data.isHovered);

  return (
    <div className="relative flex h-24 w-24 items-center justify-center">
      <div
        className={`absolute h-20 w-20 rotate-45 rounded-xl ${getNodeBaseStyle(selected)}`}
        style={{
          background: selected
            ? 'linear-gradient(135deg, #ffffff 0%, #f5f5f7 100%)'
            : '#ffffff',
          boxShadow: selected
            ? '0 4px 12px rgba(0, 113, 227, 0.2)'
            : '0 2px 6px rgba(0, 0, 0, 0.05)',
        }}
      ></div>

      {/* 菱形节点的连接点应在四个顶点 */}
      <Handle type="source" position={Position.Top} id="top" style={style} />
      <Handle
        type="source"
        position={Position.Right}
        id="right"
        style={style}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        id="bottom"
        style={style}
      />
      <Handle type="source" position={Position.Left} id="left" style={style} />

      <div className="z-10 text-center text-sm font-medium text-gray-700">
        {data.label}
      </div>
    </div>
  );
}
