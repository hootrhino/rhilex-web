import { DEFAULT_HEIGHT, DEFAULT_WIDTH } from '@/utils/constant';
import { BackgroundManager, Edge, Graph, Node } from '@antv/x6';
import { useState } from 'react';

export enum LineTypeOption {
  Solid = 'solid',
  Dotted = 'dotted',
  Pipeline = 'pipeline',
}

export enum ArrowTypeOption {
  Forward = 'forward',
  Reverse = 'reverse',
  Both = 'both',
  None = 'none',
}

export type EdgeForm = {
  lineType: LineTypeOption;
  arrowType: ArrowTypeOption;
  pipeline: {
    bg: string;
    fill: string;
    type: string;
  };
  line: {
    move: string;
    stroke: string;
    strokeWidth: number;
    [key: string]: any;
  };
  label: {
    fill: string;
    fontSize: number;
    bodyFill: string;
    offset: number;
  };
};

type Background = Omit<BackgroundManager.Options, 'position' | 'size'> & {
  position: string;
  size: string;
};

export type CanvasForm = Omit<Graph.Options, 'background'> & {
  background: Background;
  scale: number;
};

export type NodeForm = Node.Metadata & {
  rotate?: boolean;
  [key: string]: any;
};

export const DEFAULT_CANVAS_FORM_DATA = {
  background: {
    color: '#262626',
    repeat: 'no-repeat',
    size: 'auto auto',
    position: 'center',
  },
  width: DEFAULT_WIDTH,
  height: DEFAULT_HEIGHT,
  scale: 50,
};

export const DEFAULT_EDGE_FORM_DATA = {
  lineType: LineTypeOption.Solid,
  arrowType: ArrowTypeOption.Forward,
  pipeline: {
    bg: '#999',
    fill: '#73d13d',
    type: 'forward',
  },
  line: {
    move: 'false',
    stroke: '#8f8f8f',
    strokeWidth: 1,
  },
  label: {
    fill: '#000',
    bodyFill: '#fff',
    fontSize: 14,
    offset: 0,
  },
};

export const DEFAULT_NODE_FORM_DATA = {};

const useEditor = () => {
  // 画布属性设置
  const [canvasData, setCanvasData] = useState<CanvasForm>(DEFAULT_CANVAS_FORM_DATA);

  // 边 Edge 表单数据
  const [edgeFormData, setEdgeForm] = useState<EdgeForm>(DEFAULT_EDGE_FORM_DATA);
  const [edgeData, setEdgeData] = useState<Edge.Metadata>();

  // 节点 Node 表单数据
  const [nodeFormData, setNodeForm] = useState<NodeForm>(DEFAULT_NODE_FORM_DATA);
  const [nodeData, setNodeData] = useState<Node.Metadata>();
  const [collapseLeftPanel, setCollapseLeftPanel] = useState<boolean>(false);

  // 右侧面板
  const [collapseRightPanel, setCollapseRightPanel] = useState<boolean>(true);

  return {
    canvasData,
    setCanvasData,
    edgeFormData,
    setEdgeForm,
    edgeData,
    setEdgeData,
    nodeFormData,
    setNodeForm,
    nodeData,
    setNodeData,
    collapseLeftPanel,
    setCollapseLeftPanel,
    collapseRightPanel,
    setCollapseRightPanel,
  };
};

export default useEditor;
