'use client';

import { Handle, Node, NodeProps, Position } from '@xyflow/react';

// 基础Apple风格节点
export function AppleBaseNode({ data }: NodeProps<Node<{ label: string }>>) {
  return (
    <div
      style={{
        padding: 16,
        borderRadius: 12,
        background: 'rgba(255, 255, 255, 0.9)',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(0, 0, 0, 0.1)',
        minWidth: 180,
      }}
    >
      <div
        style={{
          fontWeight: 500,
          marginBottom: 8,
          fontSize: '14px',
          color: '#1d1d1f',
        }}
      >
        {String(data.label)}
      </div>
      <Handle
        type="source"
        position={Position.Right}
        style={{ background: '#007AFF' }}
      />
      <Handle
        type="target"
        position={Position.Left}
        style={{ background: '#007AFF' }}
      />
    </div>
  );
}

// 卡片风格节点
export function AppleCardNode({
  data,
}: NodeProps<
  Node<{
    label: string;
    description?: string;
    buttonText?: string;
    onClick?: () => void;
  }>
>) {
  return (
    <div
      style={{
        padding: 16,
        borderRadius: 12,
        background: 'rgba(255, 255, 255, 0.9)',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(0, 0, 0, 0.05)',
        minWidth: 200,
      }}
    >
      <div
        style={{
          fontWeight: 600,
          marginBottom: 10,
          fontSize: '15px',
          color: '#1d1d1f',
        }}
      >
        {String(data.label)}
      </div>
      <div
        style={{
          fontSize: '13px',
          color: '#86868b',
          marginBottom: 12,
        }}
      >
        {data.description || '描述信息'}
      </div>
      <button
        onClick={data.onClick}
        style={{
          background: '#007AFF',
          color: '#fff',
          border: 'none',
          borderRadius: 8,
          padding: '6px 12px',
          fontSize: '13px',
          fontWeight: 500,
          cursor: 'pointer',
          transition: 'all 0.2s ease',
        }}
      >
        {data.buttonText || '操作'}
      </button>
      <Handle
        type="source"
        position={Position.Right}
        style={{ background: '#007AFF' }}
      />
      <Handle
        type="target"
        position={Position.Left}
        style={{ background: '#007AFF' }}
      />
    </div>
  );
}

// 暗色模式节点
export function AppleDarkNode({
  data,
}: NodeProps<
  Node<{
    label: string;
    onAction1?: () => void;
    onAction2?: () => void;
    action1Text?: string;
    action2Text?: string;
  }>
>) {
  return (
    <div
      style={{
        padding: 16,
        borderRadius: 12,
        background: 'rgba(40, 40, 40, 0.9)',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(70, 70, 70, 0.5)',
        minWidth: 180,
        color: '#ffffff',
      }}
    >
      <div
        style={{
          fontWeight: 500,
          marginBottom: 10,
          fontSize: '14px',
        }}
      >
        {String(data.label)}
      </div>
      <div
        style={{
          display: 'flex',
          gap: '8px',
          marginTop: '8px',
        }}
      >
        <button
          onClick={data.onAction1}
          style={{
            background: 'rgba(255, 255, 255, 0.1)',
            color: '#fff',
            border: 'none',
            borderRadius: 8,
            padding: '6px 12px',
            fontSize: '12px',
            fontWeight: 500,
            cursor: 'pointer',
            flex: 1,
          }}
        >
          {data.action1Text || '选项1'}
        </button>
        <button
          onClick={data.onAction2}
          style={{
            background: '#007AFF',
            color: '#fff',
            border: 'none',
            borderRadius: 8,
            padding: '6px 12px',
            fontSize: '12px',
            fontWeight: 500,
            cursor: 'pointer',
            flex: 1,
          }}
        >
          {data.action2Text || '选项2'}
        </button>
      </div>
      <Handle
        type="source"
        position={Position.Right}
        style={{ background: '#007AFF' }}
      />
      <Handle
        type="target"
        position={Position.Left}
        style={{ background: '#007AFF' }}
      />
    </div>
  );
}

// 图标节点
export function AppleIconNode({
  data,
}: NodeProps<Node<{ label: string; icon?: string; iconBg?: string }>>) {
  return (
    <div
      style={{
        padding: 16,
        borderRadius: 16,
        background: 'rgba(255, 255, 255, 0.9)',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(0, 0, 0, 0.05)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minWidth: 120,
      }}
    >
      <div
        style={{
          width: 48,
          height: 48,
          borderRadius: 12,
          background: data.iconBg || '#007AFF',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 12,
          color: '#fff',
          fontSize: '20px',
          fontWeight: 'bold',
        }}
      >
        {data.icon || 'A'}
      </div>
      <div
        style={{
          fontWeight: 500,
          fontSize: '14px',
          color: '#1d1d1f',
          textAlign: 'center',
        }}
      >
        {String(data.label)}
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
        style={{ background: '#007AFF' }}
      />
      <Handle
        type="target"
        position={Position.Top}
        style={{ background: '#007AFF' }}
      />
    </div>
  );
}

// 状态节点
export function AppleStatusNode({
  data,
}: NodeProps<Node<{ label: string; status?: string }>>) {
  const statusColors: Record<string, { bg: string; text: string }> = {
    success: { bg: '#34C759', text: '成功' },
    warning: { bg: '#FF9500', text: '警告' },
    error: { bg: '#FF3B30', text: '错误' },
    info: { bg: '#007AFF', text: '信息' },
  };

  const status = data.status || 'info';
  const statusInfo = statusColors[status];

  return (
    <div
      style={{
        padding: 16,
        borderRadius: 12,
        background: 'rgba(255, 255, 255, 0.9)',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(0, 0, 0, 0.05)',
        minWidth: 180,
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          marginBottom: 10,
        }}
      >
        <div
          style={{
            width: 10,
            height: 10,
            borderRadius: '50%',
            background: statusInfo.bg,
            marginRight: 8,
          }}
        />
        <div
          style={{
            fontWeight: 600,
            fontSize: '15px',
            color: '#1d1d1f',
          }}
        >
          {String(data.label)}
        </div>
      </div>
      <div
        style={{
          background: `rgba(${
            statusInfo.bg === '#34C759'
              ? '52, 199, 89'
              : statusInfo.bg === '#FF9500'
                ? '255, 149, 0'
                : statusInfo.bg === '#FF3B30'
                  ? '255, 59, 48'
                  : '0, 122, 255'
          }, 0.1)`,
          borderRadius: 6,
          padding: '4px 8px',
          fontSize: '12px',
          color: statusInfo.bg,
          display: 'inline-block',
          fontWeight: 500,
        }}
      >
        {statusInfo.text}
      </div>
      <Handle
        type="source"
        position={Position.Right}
        style={{ background: statusInfo.bg }}
      />
      <Handle
        type="target"
        position={Position.Left}
        style={{ background: statusInfo.bg }}
      />
    </div>
  );
}
