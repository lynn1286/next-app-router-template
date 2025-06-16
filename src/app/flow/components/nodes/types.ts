import { ReactNode } from 'react';

export interface ShapeNodeProps {
  data: {
    label?: string;
    isHovered?: boolean;
    topIcon?: ReactNode;
    rightIcon?: ReactNode;
    bottomIcon?: ReactNode;
    leftIcon?: ReactNode;
    [key: string]: unknown;
  };
  selected: boolean;
  notHanle?: boolean;
}

// Apple风格颜色
export const appleColors = {
  blue: '#0071e3',
  lightBlue: '#42a5f5',
  gray: '#f5f5f7',
  darkGray: '#86868b',
  white: '#ffffff',
  black: '#1d1d1f',
  gradient: 'linear-gradient(135deg, #42a5f5 0%, #0071e3 100%)',
};

// 连接点样式
export const handleStyle = {
  opacity: 0,
  background: appleColors.blue,
};

export const selectedHandleStyle = {
  ...handleStyle,
  opacity: 1,
};

// 获取连接点样式
export const getHandleStyle = (selected: boolean, isHovered?: boolean) => {
  if (selected || isHovered) {
    return selectedHandleStyle;
  }
  return handleStyle;
};

// 获取节点基础样式
export const getNodeBaseStyle = (selected: boolean) => {
  return `
    transition-all duration-200 ease-out
    ${selected ? 'shadow-lg' : 'shadow-sm'}
    ${selected ? 'border-[#0071e3]' : 'border-gray-200'}
    bg-white border-2
  `;
};
