'use client';

import { Handle, Position } from '@xyflow/react';
import { ShapeNodeProps, getHandleStyle, getNodeBaseStyle } from './types';

export function CircleNode({ data, selected }: ShapeNodeProps) {
  const style = getHandleStyle(selected, data.isHovered);

  return (
    <div
      className={`flex h-20 w-20 items-center justify-center rounded-full ${getNodeBaseStyle(selected)}`}
      style={{
        background: selected
          ? 'linear-gradient(135deg, #ffffff 0%, #f5f5f7 100%)'
          : '#ffffff',
        boxShadow: selected
          ? '0 4px 12px rgba(0, 113, 227, 0.2)'
          : '0 2px 6px rgba(0, 0, 0, 0.05)',
      }}
    >
      {/* 圆形节点的连接点应在圆周上均匀分布 */}
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

      <div className="text-center text-sm font-medium text-gray-700">
        {data.label}
      </div>
    </div>
  );
}
