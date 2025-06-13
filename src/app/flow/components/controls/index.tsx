'use client';

import FitView from './fit-view';
import LockTranslation from './lock-translation';
import ResetZoom from './reset-zoom';
import ScaleFactor from './scale-factor';

export interface AppleControlsProps {
  isLocked: boolean;
  toggleLock: () => void;
}

const AppleControls = ({ isLocked, toggleLock }: AppleControlsProps) => {
  return (
    <div className="absolute bottom-[50px] left-1/2 z-10 flex -translate-x-1/2 gap-2 rounded-xl border border-black/5 bg-white/85 p-1.5 shadow-md backdrop-blur-lg">
      <ScaleFactor />
      <ResetZoom />
      <FitView />
      <LockTranslation isLocked={isLocked} toggleLock={toggleLock} />
    </div>
  );
};

export default AppleControls;
