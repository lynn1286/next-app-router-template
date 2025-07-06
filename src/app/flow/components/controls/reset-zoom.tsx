'use client';

import {
  ControlButton,
  useReactFlow,
  useStore,
  useViewport,
} from '@xyflow/react';
import { useCallback } from 'react';

const ResetZoom = () => {
  const { setViewport, getViewport } = useReactFlow();
  const { x, y } = useViewport();
  const width = useStore((state) => state.width);
  const height = useStore((state) => state.height);

  const handleFitView = useCallback(() => {
    const viewport = getViewport();
    const currentZoom = viewport.zoom;

    if (width && height) {
      const centerX = width / 2;
      const centerY = height / 2;

      // 计算新的视口位置，保持画布中心点不变
      // 当放大时，视口位置需要向中心点移动；当缩小时，视口位置需要远离中心点
      const zoomFactor = 1 / currentZoom;
      const newX = viewport.x - (centerX - viewport.x) * (zoomFactor - 1);
      const newY = viewport.y - (centerY - viewport.y) * (zoomFactor - 1);

      // 设置新的视口
      setViewport({ x: newX, y: newY, zoom: 1 });
    } else {
      // 如果找不到容器，则简单地更改缩放级别，保持当前位置
      setViewport({ x, y, zoom: 1 });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getViewport, setViewport, x, y]);

  return (
    <ControlButton
      onClick={handleFitView}
      title="缩放至100%"
      aria-label="缩放至100%"
      className="flex h-9 w-9 items-center justify-center rounded-lg bg-white shadow-sm transition-all duration-200 hover:bg-gray-50"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-gray-800"
      >
        <path d="M15 3h6v6"></path>
        <path d="M9 21H3v-6"></path>
        <path d="M21 3l-7 7"></path>
        <path d="M3 21l7-7"></path>
      </svg>
    </ControlButton>
  );
};

export default ResetZoom;
