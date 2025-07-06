'use client';

import {
  ControlButton,
  useReactFlow,
  useStore,
  useViewport,
} from '@xyflow/react';
import {
  ChangeEvent,
  KeyboardEvent,
  useCallback,
  useEffect,
  useState,
} from 'react';

const ScaleFactor = () => {
  const { zoomIn, zoomOut, setViewport, getViewport } = useReactFlow();

  const minZoom = useStore((state) => state.minZoom);
  const maxZoom = useStore((state) => state.maxZoom);
  const width = useStore((state) => state.width);
  const height = useStore((state) => state.height);

  const minZoomPercent = Math.round(minZoom * 100);
  const maxZoomPercent = Math.round(maxZoom * 100);

  const { x, y, zoom } = useViewport();

  const [zoomLevel, setZoomLevel] = useState<string>('100');

  useEffect(() => {
    setZoomLevel(Math.round(zoom * 100).toString());
  }, [zoom]);

  const handleZoomIn = useCallback(() => {
    zoomIn();
  }, [zoomIn]);

  const handleZoomOut = useCallback(() => {
    zoomOut();
  }, [zoomOut]);

  const handleZoomInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.value === '') {
        setZoomLevel('');
        return;
      }

      const value = e.target.value.replace(/[^\d]/g, '');
      if (value) {
        setZoomLevel(value);
      } else {
        setZoomLevel('');
      }
    },
    [],
  );

  const handleZoomInputBlur = useCallback(() => {
    if (zoomLevel === '') {
      setZoomLevel(Math.round(zoom * 100).toString());
    } else {
      applyZoomLevel();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [zoomLevel, zoom]);

  const handleZoomInputKeyDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        if (zoomLevel === '') {
          setZoomLevel(Math.round(zoom * 100).toString());
        } else {
          applyZoomLevel();
        }
      }
    },

    // eslint-disable-next-line react-hooks/exhaustive-deps
    [zoomLevel, zoom],
  );

  const applyZoomLevel = useCallback(() => {
    const newZoom = parseInt(zoomLevel, 10);
    if (!isNaN(newZoom) && newZoom > 0) {
      const clampedZoom = Math.max(
        minZoomPercent,
        Math.min(maxZoomPercent, newZoom),
      );

      const viewport = getViewport();
      const currentZoom = viewport.zoom;

      if (width && height) {
        const centerX = width / 2;
        const centerY = height / 2;

        const zoomFactor = clampedZoom / 100 / currentZoom;
        const newX = viewport.x - (centerX - viewport.x) * (zoomFactor - 1);
        const newY = viewport.y - (centerY - viewport.y) * (zoomFactor - 1);

        setViewport({ x: newX, y: newY, zoom: clampedZoom / 100 });

        if (clampedZoom !== newZoom) {
          setZoomLevel(clampedZoom.toString());
        }
      } else {
        const clampedZoomValue = Math.max(
          minZoom,
          Math.min(maxZoom, newZoom / 100),
        );
        setViewport({ x, y, zoom: clampedZoomValue });

        if (Math.round(clampedZoomValue * 100) !== newZoom) {
          setZoomLevel(Math.round(clampedZoomValue * 100).toString());
        }
      }
    } else {
      setZoomLevel(Math.round(zoom * 100).toString());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    zoomLevel,
    x,
    y,
    zoom,
    setViewport,
    getViewport,
    minZoom,
    maxZoom,
    width,
    height,
  ]);

  return (
    <>
      <ControlButton
        onClick={handleZoomOut}
        title={`缩小 (最小 ${minZoomPercent}%)`}
        aria-label={`缩小 (最小 ${minZoomPercent}%)`}
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
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
      </ControlButton>

      <div className="flex items-center justify-center rounded-lg bg-white px-2 shadow-sm">
        <input
          type="text"
          value={zoomLevel}
          onChange={handleZoomInputChange}
          onBlur={handleZoomInputBlur}
          onKeyDown={handleZoomInputKeyDown}
          className="w-12 bg-transparent text-center text-sm text-gray-800 outline-none"
          aria-label={`缩放比例 (${minZoomPercent}% - ${maxZoomPercent}%)`}
          title={`缩放范围: ${minZoomPercent}% - ${maxZoomPercent}%`}
        />
        <span className="text-sm text-gray-600">%</span>
      </div>

      <ControlButton
        onClick={handleZoomIn}
        title={`放大 (最大 ${maxZoomPercent}%)`}
        aria-label={`放大 (最大 ${maxZoomPercent}%)`}
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
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
      </ControlButton>
    </>
  );
};

export default ScaleFactor;
