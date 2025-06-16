'use client';

import { Position, Handle as XYFlowHandle } from '@xyflow/react';
import { ReactNode } from 'react';
import { PlusIcon } from './icons/plus-icon';

export interface CustomHandleProps {
  id: string;
  type: 'source' | 'target';
  position: Position;
  style?: React.CSSProperties;
  className?: string;
  icon?: ReactNode;
  size?: number;
  isConnectable?: boolean;
  selected?: boolean;
  isHovered?: boolean;
}

export function CustomHandle({
  id,
  type,
  position,
  style,
  className = '',
  icon,
  size = 16,
  isConnectable,
  selected = false,
  isHovered = false,
}: CustomHandleProps) {
  // 只有当元素被选中或者鼠标悬停时才显示
  const isVisible = selected || isHovered;

  // 默认样式
  const defaultStyle: React.CSSProperties = {
    width: size,
    height: size,
    backgroundColor: '#ffffff',
    border: '1px solid #0071e3',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    opacity: isVisible ? 1 : 0,
    ...style,
  };

  return (
    <XYFlowHandle
      id={id}
      type={type}
      position={position}
      isConnectable={isConnectable}
      style={defaultStyle}
      className={className}
    >
      {/* 图标容器 */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '100%',
          color: '#0071e3',
          fontSize: size * 0.6,
        }}
      >
        {icon || <PlusIcon size={size * 0.6} />}
      </div>
    </XYFlowHandle>
  );
}
