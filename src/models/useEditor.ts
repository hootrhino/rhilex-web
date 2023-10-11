import { getVisualDetail } from '@/services/rulex/dapingguanli';
import { Edge } from '@antv/x6';
import { useRequest } from '@umijs/max';
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

export type QuickStyleItem = {
  key: string;
  value: string;
};

export type QuickStyleConfig = {
  open: boolean;
  title: string;
};

type LayersBaseItem = {
  title: string;
  id: string;
  icon: string;
}

export type Layers = LayersBaseItem & {
  children?: LayersBaseItem[];
};

// 右侧详情面板
export type DetailFormType = 'node' | 'canvas';

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

const useEditor = () => {
  // 边 Edge 表单数据
  const [edgeFormData, setEdgeForm] = useState<EdgeForm>(DEFAULT_EDGE_FORM_DATA);
  const [edgeData, setEdgeData] = useState<Edge.Metadata>();

  // 左侧面板
  const [collapseLeftPanel, setCollapseLeftPanel] = useState<boolean>(false);
  const [layers, setLayers] = useState<Layers[]>([]);

  // 右侧详情面板
  const [collapseRightPanel, setCollapseRightPanel] = useState<boolean>(true);
  const [detailFormType, setDetailFormType] = useState<DetailFormType>('canvas');

  // 节点 Node
  const [activeNodeShape, setActiveNodeShape] = useState<string>('');
  const [activeNodeQuickStyle, setQuickStyle] = useState<QuickStyleItem[]>([]);
  const [quickStyleConfig, setQuickStyleConfig] = useState<QuickStyleConfig>({
    open: false,
    title: '',
  });

  // 大屏详情
  const { data: detail, run: getDetail } = useRequest(
    (params: API.getVisualDetailParams) => getVisualDetail(params),
    {
      manual: true,
    },
  );

  return {
    edgeFormData,
    setEdgeForm,
    edgeData,
    setEdgeData,
    collapseLeftPanel,
    setCollapseLeftPanel,
    collapseRightPanel,
    setCollapseRightPanel,
    detailFormType,
    setDetailFormType,
    activeNodeShape,
    setActiveNodeShape,
    activeNodeQuickStyle,
    setQuickStyle,
    quickStyleConfig,
    setQuickStyleConfig,
    layers,
    setLayers,
    detail,
    getDetail
  };
};

export default useEditor;
