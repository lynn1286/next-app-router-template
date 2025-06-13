'use client';

import { Handle, Position } from '@xyflow/react';
import { ShapeNodeProps, getHandleStyle } from './types';

export function CylinderNode({ data, selected }: ShapeNodeProps) {
  const cylinderColor = selected ? 'border-[#0071e3]' : 'border-gray-200';
  const cylinderShadow = selected ? 'shadow-lg' : 'shadow-sm';
  const cylinderGradient = selected
    ? 'linear-gradient(180deg, #f5f5f7 0%, #ffffff 100%)'
    : '#ffffff';
  const style = getHandleStyle(selected, data.isHovered);

  return (
    <div className="relative flex h-28 w-24 flex-col items-center transition-all duration-200">
      <div
        className={`h-5 w-20 rounded-t-full border-2 border-b-0 ${cylinderColor} ${cylinderShadow}`}
        style={{ background: cylinderGradient }}
      ></div>
      <div
        className={`h-16 w-20 border-2 border-t-0 border-b-0 ${cylinderColor}`}
        style={{ background: cylinderGradient }}
      ></div>
      <div
        className={`h-5 w-20 rounded-b-full border-2 border-t-0 ${cylinderColor} ${cylinderShadow}`}
        style={{ background: cylinderGradient }}
      ></div>

      {/* 圆柱体节点的连接点应在上下和左右中间 */}
      <Handle
        type="source"
        position={Position.Top}
        id="top"
        style={{ ...style, top: 0 }}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        id="bottom"
        style={{ ...style, bottom: 0 }}
      />
      <Handle
        type="source"
        position={Position.Left}
        id="left"
        style={{ ...style, left: 2, top: '50%' }}
      />
      <Handle
        type="source"
        position={Position.Right}
        id="right"
        style={{ ...style, right: 2, top: '50%' }}
      />

      <div className="absolute top-12 right-0 left-0 z-10 flex items-center justify-center text-sm font-medium text-gray-700">
        {data.label}
      </div>
    </div>
  );
}
