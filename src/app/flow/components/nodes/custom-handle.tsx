'use client';

import { Position, Handle as XYFlowHandle } from '@xyflow/react';
import { ReactNode } from 'react';

export interface CustomHandleProps {
  id: string;
  type: 'source' | 'target';
  position: Position;
  style?: React.CSSProperties;
  className?: string;
  icon?: ReactNode; // 仅作为接口保留，但我们不会使用这个属性
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
  size = 16,
  isConnectable,
  selected = false,
  isHovered = false,
}: CustomHandleProps) {
  // 只有当元素被选中或者鼠标悬停时才显示
  const isVisible = selected || isHovered;

  // 创建一个带有加号图标的自定义样式
  const customStyle: React.CSSProperties = {
    width: size,
    height: size,
    backgroundColor: '#ffffff',
    border: '1px solid #0071e3',
    borderRadius: '50%',
    opacity: isVisible ? 1 : 0,
    zIndex: 10,
    // 使用伪元素创建加号
    backgroundImage: `url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M12 5V19M5 12H19' stroke='%230071e3' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: `${size * 0.6}px`,
    ...style,
  };

  return (
    <XYFlowHandle
      id={id}
      type={type}
      position={position}
      isConnectable={isConnectable !== false}
      style={customStyle}
      className={className}
    />
  );
}
