'use client';

import {
  Background,
  Connection,
  ReactFlow,
  useEdgesState,
  useNodesState,
} from '@xyflow/react';
import { useCallback, useEffect, useState } from 'react';
import {
  AppleBaseNode,
  AppleCardNode,
  AppleDarkNode,
  AppleIconNode,
  AppleStatusNode,
} from './apple-nodes';
import Controls from './controls';
import { initialEdges, initialNodes } from './initial-elements';

const Flow = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const [panOnDrag, setPanOnDrag] = useState(true);
  const [isLocked, setIsLocked] = useState(false);

  useEffect(() => {
    setPanOnDrag(!isLocked);
  }, [isLocked]);

  const toggleLock = useCallback(() => {
    setIsLocked((prev) => !prev);
  }, []);

  const nodeTypes = {
    appleBase: AppleBaseNode,
    appleCard: AppleCardNode,
    appleDark: AppleDarkNode,
    appleIcon: AppleIconNode,
    appleStatus: AppleStatusNode,
  };

  const proOptions = { hideAttribution: true };

  const onConnect = useCallback(
    (connection: Connection) => {
      setEdges((eds) => [
        ...eds,
        { ...connection, id: `e${connection.source}-${connection.target}` },
      ]);
    },
    [setEdges],
  );

  return (
    <div className="flex-1">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        proOptions={proOptions}
        panOnDrag={panOnDrag}
        fitView
        fitViewOptions={{
          maxZoom: 1,
        }}
        minZoom={0.1}
        maxZoom={2}
      >
        <Background />
        <Controls isLocked={isLocked} toggleLock={toggleLock} />
      </ReactFlow>
    </div>
  );
};

export default Flow;
