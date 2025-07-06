'use client';

import { ReactFlowProvider } from '@xyflow/react';
import Flow from './components';
import Header from './components/header';

import '@xyflow/react/dist/style.css';

export default function FlowPage() {
  return (
    <ReactFlowProvider>
      <div className="flex h-screen w-screen flex-col">
        <Header />
        <Flow />
      </div>
    </ReactFlowProvider>
  );
}
