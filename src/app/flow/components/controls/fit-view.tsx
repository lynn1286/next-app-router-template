'use client';

import { ControlButton, useReactFlow } from '@xyflow/react';
import { useCallback } from 'react';

const FitView = () => {
  const { fitView } = useReactFlow();

  const handleFitView = useCallback(() => {
    fitView({
      includeHiddenNodes: false,
    });
  }, [fitView]);

  return (
    <ControlButton
      onClick={handleFitView}
      title="适应视图"
      aria-label="适应视图"
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
        <path d="M3 8V5a2 2 0 0 1 2-2h3" />
        <path d="M16 3h3a2 2 0 0 1 2 2v3" />
        <path d="M21 16v3a2 2 0 0 1-2 2h-3" />
        <path d="M8 21H5a2 2 0 0 1-2-2v-3" />
      </svg>
    </ControlButton>
  );
};

export default FitView;
