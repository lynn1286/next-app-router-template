'use client';

import { NodeTypes } from '@xyflow/react';
import {
  CircleNode,
  CylinderNode,
  DiamondNode,
  ParallelogramNode,
  PlusNode,
  RectangleNode,
  SquareNode,
  TrapezoidNode,
  TriangleNode,
} from './nodes';

// 定义所有节点类型
export const nodeTypes: NodeTypes = {
  // 自定义形状节点
  circleNode: CircleNode,
  squareNode: SquareNode,
  rectangleNode: RectangleNode,
  diamondNode: DiamondNode,
  triangleNode: TriangleNode,
  parallelogramNode: ParallelogramNode,
  cylinderNode: CylinderNode,
  trapezoidNode: TrapezoidNode,
  plusNode: PlusNode,
};
