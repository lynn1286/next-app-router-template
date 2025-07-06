'use client';

import {
  Background,
  Connection,
  ConnectionLineType,
  ConnectionMode,
  Edge,
  Node,
  OnConnectEnd,
  OnConnectStart,
  OnNodesDelete,
  Panel,
  ReactFlow,
  useEdgesState,
  useNodesState,
  useReactFlow,
} from '@xyflow/react';
import { nanoid } from 'nanoid';
import { useCallback, useEffect, useRef, useState } from 'react';
import Controls from './controls';
import { nodeTypes } from './node-types';
import Sidebar from './sidebar';

const Flow = () => {
  const reactFlowInstance = useReactFlow();

  const [nodes, setNodes, onNodesChange] = useNodesState([] as Node[]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([] as Edge[]);

  const reactFlowWrapper = useRef<HTMLDivElement>(null);

  // 添加连线状态跟踪
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectionNodeId, setConnectionNodeId] = useState<string | null>(null);

  const [panOnDrag, setPanOnDrag] = useState(true);
  const [isLocked, setIsLocked] = useState(false);

  useEffect(() => {
    setPanOnDrag(!isLocked);
  }, [isLocked]);

  const toggleLock = useCallback(() => {
    setIsLocked((prev) => !prev);
  }, []);

  // 连接开始时的处理
  const onConnectStart: OnConnectStart = useCallback((_, { nodeId }) => {
    setIsConnecting(true);
    setConnectionNodeId(nodeId);
  }, []);

  // 连接结束时的处理
  const onConnectEnd: OnConnectEnd = useCallback(() => {
    setIsConnecting(false);
    setConnectionNodeId(null);

    // 重置所有节点的hover状态
    setNodes((nds) =>
      nds.map((node) => ({
        ...node,
        data: { ...node.data, isHovered: false },
      })),
    );
  }, [setNodes]);

  // 节点悬停处理
  const onNodeMouseEnter = useCallback(
    (event: React.MouseEvent, node: Node) => {
      if (isConnecting && node.id !== connectionNodeId) {
        // 在连线过程中，标记被悬停的节点
        setNodes((nds) =>
          nds.map((n) => ({
            ...n,
            data: {
              ...n.data,
              isHovered: n.id === node.id,
            },
          })),
        );
      }
    },
    [isConnecting, connectionNodeId, setNodes],
  );

  // 节点鼠标离开处理
  const onNodeMouseLeave = useCallback(
    (event: React.MouseEvent, node: Node) => {
      if (isConnecting) {
        // 鼠标离开节点时，取消悬停状态
        setNodes((nds) =>
          nds.map((n) => ({
            ...n,
            data: {
              ...n.data,
              isHovered: false,
            },
          })),
        );
      }
    },
    [isConnecting, setNodes],
  );

  const onConnect = useCallback(
    (connection: Connection) => {
      setEdges((eds) => [
        ...eds,
        {
          ...connection,
          id: `e${connection.source}-${connection.target}`,
          type: 'smoothstep', // 使用平滑的阶梯连接线
          animated: true, // 添加动画效果
          style: { stroke: '#3b82f6', strokeWidth: 2 }, // 蓝色连接线
        },
      ]);
    },
    [setEdges],
  );

  // 删除节点和相关边的处理函数
  const onNodesDelete: OnNodesDelete = useCallback(
    (nodesToDelete) => {
      // 删除与被删除节点相关的边
      setEdges((currentEdges) => {
        const nodeIdsToDelete = new Set(nodesToDelete.map((n) => n.id));
        return currentEdges.filter(
          (edge) =>
            !nodeIdsToDelete.has(edge.source) &&
            !nodeIdsToDelete.has(edge.target),
        );
      });
    },
    [setEdges],
  );

  // 处理拖拽结束事件（从侧边栏拖到画布）
  const onDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();

      if (!reactFlowWrapper.current) return;

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const dataStr = event.dataTransfer.getData('application/reactflow');

      if (!dataStr) return;

      try {
        const { nodeType, label } = JSON.parse(dataStr);

        // 计算放置位置（相对于ReactFlow容器）
        const position = reactFlowInstance.screenToFlowPosition({
          x: event.clientX - reactFlowBounds.left,
          y: event.clientY - reactFlowBounds.top,
        });

        // 创建新节点
        const newNode: Node = {
          id: nanoid(6),
          type: nodeType,
          position,
          data: { label: label || '节点', isHovered: false },
        };

        // 添加节点
        setNodes((nds) => nds.concat(newNode));
      } catch (error) {
        console.error('Error adding new node:', error);
      }
    },
    [reactFlowInstance, setNodes],
  );

  const proOptions = { hideAttribution: true };

  return (
    <div className="flex-1">
      <Sidebar />
      <div className="h-full w-full" ref={reactFlowWrapper}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onConnectStart={onConnectStart}
          onConnectEnd={onConnectEnd}
          onNodeMouseEnter={onNodeMouseEnter}
          onNodeMouseLeave={onNodeMouseLeave}
          onNodesDelete={onNodesDelete}
          nodeTypes={nodeTypes}
          onDragOver={onDragOver}
          onDrop={onDrop}
          proOptions={proOptions}
          panOnDrag={panOnDrag}
          deleteKeyCode={['Backspace', 'Delete']}
          connectionLineType={ConnectionLineType.SmoothStep}
          connectionLineStyle={{ stroke: '#3b82f6', strokeWidth: 2 }}
          connectionMode={ConnectionMode.Loose}
          defaultEdgeOptions={{
            type: 'smoothstep',
            style: { stroke: '#3b82f6', strokeWidth: 2 },
          }}
          fitView
          fitViewOptions={{
            maxZoom: 1,
          }}
          minZoom={0.1}
          maxZoom={2}
        >
          <Background />
          <Controls isLocked={isLocked} toggleLock={toggleLock} />
          <Panel position="top-right">
            <div className="rounded-xl bg-white/90 p-2 shadow-md backdrop-blur-md">
              <p className="text-sm font-medium text-gray-600">
                选中节点后按 Delete 或 Backspace 键删除
              </p>
            </div>
          </Panel>
          <Panel position="bottom-center">
            <div className="rounded-xl bg-white/90 p-2 shadow-md backdrop-blur-md">
              <p className="text-sm font-medium text-gray-600">
                选中节点后会显示连接点，拖动连接点到其他节点实现连接
              </p>
            </div>
          </Panel>
        </ReactFlow>
      </div>
    </div>
  );
};

export default Flow;
