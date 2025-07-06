'use client';

import { useReactFlow } from '@xyflow/react';
import { useEffect, useRef, useState } from 'react';

const Header = () => {
  const reactFlowInstance = useReactFlow();

  const inputRef = useRef<HTMLInputElement>(null);

  const [title, setTitle] = useState('流程图制作工具');
  const [isEditing, setIsEditing] = useState(false);
  const [editableTitle, setEditableTitle] = useState(title);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleTitleClick = () => {
    setIsEditing(true);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditableTitle(e.target.value);
  };

  const handleTitleBlur = () => {
    setIsEditing(false);
    if (editableTitle.trim()) {
      setTitle(editableTitle);
    } else {
      setEditableTitle(title);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleTitleBlur();
    }
  };

  const saveFlow = () => {
    const nodes = reactFlowInstance.getNodes();
    const edges = reactFlowInstance.getEdges();
    console.log('保存流程图:', { title, nodes, edges });
    // 这里可以添加实际的保存逻辑，例如API调用
    alert(
      `流程图"${title}"已保存，包含 ${nodes.length} 个节点和 ${edges.length} 条边`,
    );
  };

  const clearCanvas = () => {
    if (window.confirm('确定要清空画布吗？此操作不可撤销。')) {
      reactFlowInstance.setNodes([]);
      reactFlowInstance.setEdges([]);
    }
  };

  return (
    <div className="flex items-center justify-between border-b bg-white p-4">
      <div className="flex-1">
        {isEditing ? (
          <input
            ref={inputRef}
            type="text"
            value={editableTitle}
            onChange={handleTitleChange}
            onBlur={handleTitleBlur}
            onKeyDown={handleKeyDown}
            className="w-full max-w-md border-b-2 border-blue-500 text-xl font-bold focus:outline-none"
          />
        ) : (
          <h1
            className="cursor-pointer text-xl font-bold hover:text-blue-600"
            onClick={handleTitleClick}
          >
            {title}
          </h1>
        )}
      </div>
      <div className="flex gap-2">
        <button
          onClick={clearCanvas}
          className="rounded border border-gray-300 bg-white px-4 py-2 text-gray-700 transition-colors hover:bg-gray-100"
        >
          清空画布
        </button>
        <button
          onClick={saveFlow}
          className="rounded bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600"
        >
          保存
        </button>
      </div>
    </div>
  );
};

export default Header;
