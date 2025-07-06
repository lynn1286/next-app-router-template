'use client';

import { ControlButton, useKeyPress } from '@xyflow/react';
import { useEffect, useState } from 'react';
import { AppleControlsProps } from '.';

type LockTranslationProps = AppleControlsProps;

const LockTranslation = ({ isLocked, toggleLock }: LockTranslationProps) => {
  // 监听空格键是否被按下
  const spacePressed = useKeyPress('Space');
  // 跟踪实际显示的锁定状态
  const [displayLocked, setDisplayLocked] = useState(isLocked);

  // 当 isLocked 状态或空格键状态变化时更新显示状态
  useEffect(() => {
    if (spacePressed && isLocked) {
      // 空格键按下且处于锁定状态时，临时显示为未锁定
      setDisplayLocked(false);
    } else {
      // 其他情况下，显示实际的锁定状态
      setDisplayLocked(isLocked);
    }
  }, [spacePressed, isLocked]);

  return (
    <ControlButton
      onClick={toggleLock}
      title={displayLocked ? '解除锁定' : '锁定平移'}
      aria-label={displayLocked ? '解除锁定' : '锁定平移'}
      className={`flex h-9 w-9 items-center justify-center rounded-lg shadow-sm transition-all duration-200 ${
        displayLocked
          ? 'border border-blue-200 bg-blue-50 text-blue-600'
          : 'bg-white text-gray-800 hover:bg-gray-50'
      }`}
    >
      {displayLocked ? (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 32">
          <path d="M21.333 10.667H19.81V7.619C19.81 3.429 16.38 0 12.19 0 8 0 4.571 3.429 4.571 7.619v3.048H3.048A3.056 3.056 0 000 13.714v15.238A3.056 3.056 0 003.048 32h18.285a3.056 3.056 0 003.048-3.048V13.714a3.056 3.056 0 00-3.048-3.047zM12.19 24.533a3.056 3.056 0 01-3.047-3.047 3.056 3.056 0 013.047-3.048 3.056 3.056 0 013.048 3.048 3.056 3.056 0 01-3.048 3.047zm4.724-13.866H7.467V7.619c0-2.59 2.133-4.724 4.723-4.724 2.591 0 4.724 2.133 4.724 4.724v3.048z"></path>
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 32">
          <path d="M21.333 10.667H19.81V7.619C19.81 3.429 16.38 0 12.19 0c-4.114 1.828-1.37 2.133.305 2.438 1.676.305 4.42 2.59 4.42 5.181v3.048H3.047A3.056 3.056 0 000 13.714v15.238A3.056 3.056 0 003.048 32h18.285a3.056 3.056 0 003.048-3.048V13.714a3.056 3.056 0 00-3.048-3.047zM12.19 24.533a3.056 3.056 0 01-3.047-3.047 3.056 3.056 0 013.047-3.048 3.056 3.056 0 013.048 3.048 3.056 3.056 0 01-3.048 3.047z"></path>
        </svg>
      )}
    </ControlButton>
  );
};

export default LockTranslation;
