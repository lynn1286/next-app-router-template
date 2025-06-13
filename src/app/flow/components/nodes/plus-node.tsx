'use client';

import { Handle, Position } from '@xyflow/react';
import { ShapeNodeProps, getHandleStyle } from './types';

export function PlusNode({ data, selected }: ShapeNodeProps) {
  const plusColor = selected ? 'border-[#0071e3]' : 'border-gray-200';
  const plusShadow = selected ? 'shadow-lg' : 'shadow-sm';
  const plusGradient = selected
    ? 'linear-gradient(135deg, #ffffff 0%, #f5f5f7 100%)'
    : '#ffffff';
  const style = getHandleStyle(selected, data.isHovered);

  return (
    <div className="relative flex h-24 w-24 items-center justify-center transition-all duration-200">
      <div
        className={`absolute h-20 w-6 rounded-md border-2 ${plusColor} ${plusShadow}`}
        style={{ background: plusGradient }}
      ></div>
      <div
        className={`absolute h-6 w-20 rounded-md border-2 ${plusColor} ${plusShadow}`}
        style={{ background: plusGradient }}
      ></div>

      {/* 加号节点的连接点应在四个端点 */}
      <Handle
        type="source"
        position={Position.Top}
        id="top"
        style={{ ...style, top: 2 }}
      />
      <Handle
        type="source"
        position={Position.Right}
        id="right"
        style={{ ...style, right: 2 }}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        id="bottom"
        style={{ ...style, bottom: 2 }}
      />
      <Handle
        type="source"
        position={Position.Left}
        id="left"
        style={{ ...style, left: 2 }}
      />

      <div className="z-10 text-center text-sm font-medium text-gray-700">
        {data.label}
      </div>
    </div>
  );
}
