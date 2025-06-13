import { Edge, Node } from '@xyflow/react';

export const initialNodes: Node[] = [
  {
    id: '1',
    type: 'appleBase',
    position: { x: 100, y: 100 },
    data: {
      label: '基础节点',
    },
  },
  {
    id: '2',
    type: 'appleCard',
    position: { x: 400, y: 100 },
    data: {
      label: '卡片节点',
      description: '这是一个带有描述的卡片节点',
      buttonText: '确认',
      onClick: () => alert('点击了卡片节点按钮'),
    },
  },
  {
    id: '3',
    type: 'appleDark',
    position: { x: 100, y: 250 },
    data: {
      label: '暗色节点',
      action1Text: '取消',
      action2Text: '确认',
      onAction1: () => alert('点击了取消'),
      onAction2: () => alert('点击了确认'),
    },
  },
  {
    id: '4',
    type: 'appleIcon',
    position: { x: 400, y: 250 },
    data: {
      label: '图标节点',
      icon: '🍎',
      iconBg: '#FF3B30',
    },
  },
  {
    id: '5',
    type: 'appleStatus',
    position: { x: 100, y: 400 },
    data: {
      label: '成功状态',
      status: 'success',
    },
  },
  {
    id: '6',
    type: 'appleStatus',
    position: { x: 400, y: 400 },
    data: {
      label: '警告状态',
      status: 'warning',
    },
  },
];

export const initialEdges: Edge[] = [];
