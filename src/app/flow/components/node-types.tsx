'use client';

import { NodeTypes } from '@xyflow/react';
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

// 定义所有节点类型
export const nodeTypes: NodeTypes = {
  // 自定义形状节点
  circleNode: CircleNode,
  squareNode: SquareNode,
  diamondNode: DiamondNode,
  triangleNode: TriangleNode,
  parallelogramNode: ParallelogramNode,
  cylinderNode: CylinderNode,
  normalSquareNode: NormalSquareNode,
  irregularRectangleNode: IrregularRectangleNode,
  rightIrregularRectangleNode: RightIrregularRectangleNode,
  crossNode: CrossNode,
};
