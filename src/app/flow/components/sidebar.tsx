'use client';

import { DragEvent, useEffect, useState } from 'react';
import {
  CircleNode,
  CrossNode,
  CylinderNode,
  DiamondNode,
  IrregularRectangleNode,
  NormalSquareNode,
  ParallelogramNode,
  RightIrregularRectangleNode,
  SquareNode,
  TriangleNode,
} from './nodes';

interface DragItemData {
  nodeType: string;
  label?: string;
}

export const Sidebar = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [isOpen, setIsOpen] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);

  const toggleSidebar = () => {
    setIsAnimating(true);
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimating(false);
    }, 300); // 动画持续时间

    return () => clearTimeout(timer);
  }, [isOpen]);

  const onDragStart = (
    event: DragEvent<HTMLDivElement>,
    nodeType: string,
    label?: string,
  ) => {
    const dragData: DragItemData = { nodeType, label };

    // 设置拖拽数据
    event.dataTransfer.setData(
      'application/reactflow',
      JSON.stringify(dragData),
    );
    event.dataTransfer.effectAllowed = 'move';

    // 设置拖拽时的图像
    const dragPreview = event.currentTarget.cloneNode(true) as HTMLDivElement;
    dragPreview.style.position = 'absolute';
    dragPreview.style.top = '-1000px';
    document.body.appendChild(dragPreview);
    event.dataTransfer.setDragImage(dragPreview, 0, 0);

    // 延迟删除预览元素
    setTimeout(() => {
      document.body.removeChild(dragPreview);
    }, 0);

    setIsDragging(true);
  };

  const onDragEnd = () => {
    setIsDragging(false);
  };

  return (
    <>
      {/* 浮动侧边栏 */}
      <div
        className={`fixed top-20 left-0 z-10 transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        style={{
          marginLeft: isOpen ? '10px' : '0',
          boxShadow: '0 0 20px rgba(0, 0, 0, 0.1)',
          borderRadius: '16px',
          maxHeight: 'calc(100vh - 120px)',
          overflow: 'auto',
        }}
      >
        <div className="flex w-64 flex-col overflow-hidden rounded-2xl bg-white/90 backdrop-blur-md">
          <div className="flex items-center justify-between border-b border-gray-100 p-4">
            <h2 className="text-lg font-medium text-gray-900">形状库</h2>
            <button
              onClick={toggleSidebar}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4 p-4">
            <div
              className="cursor-grab rounded-xl bg-gray-50 p-3 transition-all hover:bg-gray-100 hover:shadow-sm"
              draggable
              onDragStart={(event) => onDragStart(event, 'circleNode', '圆形')}
              onDragEnd={onDragEnd}
            >
              <div className="flex flex-col items-center">
                <div className="scale-85 transform">
                  <CircleNode data={{}} selected={false} notHanle />
                </div>
                <span className="mt-2 text-sm text-gray-600">圆形</span>
              </div>
            </div>

            <div
              className="cursor-grab rounded-xl bg-gray-50 p-3 transition-all hover:bg-gray-100 hover:shadow-sm"
              draggable
              onDragStart={(event) =>
                onDragStart(event, 'squareNode', '正方形')
              }
              onDragEnd={onDragEnd}
            >
              <div className="flex flex-col items-center">
                <div className="scale-85 transform">
                  <SquareNode data={{}} selected={false} notHanle />
                </div>
                <span className="mt-2 text-sm text-gray-600">正方形</span>
              </div>
            </div>

            <div
              className="cursor-grab rounded-xl bg-gray-50 p-3 transition-all hover:bg-gray-100 hover:shadow-sm"
              draggable
              onDragStart={(event) => onDragStart(event, 'diamondNode', '菱形')}
              onDragEnd={onDragEnd}
            >
              <div className="flex flex-col items-center">
                <div className="scale-85 transform">
                  <DiamondNode data={{}} selected={false} notHanle />
                </div>
                <span className="mt-2 text-sm text-gray-600">菱形</span>
              </div>
            </div>

            <div
              className="cursor-grab rounded-xl bg-gray-50 p-3 transition-all hover:bg-gray-100 hover:shadow-sm"
              draggable
              onDragStart={(event) =>
                onDragStart(event, 'cylinderNode', '圆柱体')
              }
              onDragEnd={onDragEnd}
            >
              <div className="flex flex-col items-center">
                <div className="scale-85 transform">
                  <CylinderNode data={{}} selected={false} notHanle />
                </div>
                <span className="mt-2 text-sm text-gray-600">圆柱体</span>
              </div>
            </div>

            <div
              className="cursor-grab rounded-xl bg-gray-50 p-3 transition-all hover:bg-gray-100 hover:shadow-sm"
              draggable
              onDragStart={(event) =>
                onDragStart(event, 'triangleNode', '三角形')
              }
              onDragEnd={onDragEnd}
            >
              <div className="flex flex-col items-center">
                <div className="scale-85 transform">
                  <TriangleNode data={{}} selected={false} notHanle />
                </div>
                <span className="mt-2 text-sm text-gray-600">三角形</span>
              </div>
            </div>

            <div
              className="cursor-grab rounded-xl bg-gray-50 p-3 transition-all hover:bg-gray-100 hover:shadow-sm"
              draggable
              onDragStart={(event) => onDragStart(event, 'crossNode', '十字形')}
              onDragEnd={onDragEnd}
            >
              <div className="flex flex-col items-center">
                <div className="scale-85 transform">
                  <CrossNode data={{}} selected={false} notHanle />
                </div>
                <span className="mt-2 text-sm text-gray-600">十字形</span>
              </div>
            </div>

            <div
              className="cursor-grab rounded-xl bg-gray-50 p-3 transition-all hover:bg-gray-100 hover:shadow-sm"
              draggable
              onDragStart={(event) =>
                onDragStart(event, 'normalSquareNode', '方形')
              }
              onDragEnd={onDragEnd}
            >
              <div className="flex flex-col items-center">
                <div className="scale-85 transform">
                  <NormalSquareNode data={{}} selected={false} notHanle />
                </div>
                <span className="mt-2 text-sm text-gray-600">方形</span>
              </div>
            </div>

            <div
              className="cursor-grab rounded-xl bg-gray-50 p-3 transition-all hover:bg-gray-100 hover:shadow-sm"
              draggable
              onDragStart={(event) =>
                onDragStart(event, 'parallelogramNode', '平行四边形')
              }
              onDragEnd={onDragEnd}
            >
              <div className="flex flex-col items-center">
                <div className="scale-85 transform">
                  <ParallelogramNode data={{}} selected={false} notHanle />
                </div>
                <span className="mt-2 text-sm text-gray-600">平行四边形</span>
              </div>
            </div>

            <div
              className="cursor-grab rounded-xl bg-gray-50 p-3 transition-all hover:bg-gray-100 hover:shadow-sm"
              draggable
              onDragStart={(event) =>
                onDragStart(event, 'irregularRectangleNode', '不规则矩形')
              }
              onDragEnd={onDragEnd}
            >
              <div className="flex flex-col items-center">
                <div className="scale-85 transform">
                  <IrregularRectangleNode data={{}} selected={false} notHanle />
                </div>
                <span className="mt-2 text-sm text-gray-600">不规则矩形</span>
              </div>
            </div>

            <div
              className="cursor-grab rounded-xl bg-gray-50 p-3 transition-all hover:bg-gray-100 hover:shadow-sm"
              draggable
              onDragStart={(event) =>
                onDragStart(
                  event,
                  'rightIrregularRectangleNode',
                  '右侧不规则矩形',
                )
              }
              onDragEnd={onDragEnd}
            >
              <div className="flex flex-col items-center">
                <div className="scale-85 transform">
                  <RightIrregularRectangleNode
                    data={{}}
                    selected={false}
                    notHanle
                  />
                </div>
                <span className="mt-2 text-sm text-gray-600">
                  右侧不规则矩形
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {!isOpen && (
        <button
          onClick={toggleSidebar}
          className="fixed top-20 left-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 shadow-lg backdrop-blur-md transition-transform hover:scale-105"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      )}
    </>
  );
};

export default Sidebar;
