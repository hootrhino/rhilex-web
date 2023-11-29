import { getVisualDetail, getVisualGroup } from '@/services/rulex/dapingguanli';
import { DEFAULT_HEIGHT, DEFAULT_WIDTH } from '@/utils/constant';
import type { Edge, Cell } from '@antv/x6';
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
  title: string;
  [key: string]: any;
};

export type QuickStyleConfig = {
  open: boolean;
  title: string;
};

type LayersBaseItem = {
  title: string;
  id: string;
  icon: string;
};

export type Layers = LayersBaseItem & {
  children?: LayersBaseItem[];
};

export type CanvasBgColor = {
  r: number;
  g: number;
  b: number;
  a: number;
};

export type CanvasConfig = {
  zoomType: string;
  thumbnail?: string;
  width: number;
  height: number;
  opacity: number;
  color: CanvasBgColor;
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

// 画布设置默认值
export const DEFAULT_CONFIG = {
  zoomType: 'none',
  thumbnail: '',
  width: DEFAULT_WIDTH,
  height: DEFAULT_HEIGHT,
  opacity: 1,
  color: { r: 38, g: 38, b: 38, a: 1 },
};

const useEditor = () => {
  // 边 Edge 表单数据
  const [edgeFormData, setEdgeForm] = useState<EdgeForm>(DEFAULT_EDGE_FORM_DATA);
  const [edgeData, setEdgeData] = useState<Edge.Metadata>();

  // 左侧面板
  const [collapseLeftPanel, setCollapseLeftPanel] = useState<boolean>(false);
  const [layers, setLayers] = useState<Layers[]>([]);
  const [leftQuickStyle, setLeftQuickStyle] = useState<QuickStyleItem[]>([]);

  // 右侧详情面板
  const [collapseRightPanel, setCollapseRightPanel] = useState<boolean>(true);
  const [detailFormType, setDetailFormType] = useState<DetailFormType>('canvas');
  const [canvasConfig, setConfig] = useState<CanvasConfig>(DEFAULT_CONFIG);
  const [rightQuickStyle, setRightQuickStyle] = useState<QuickStyleItem[]>([]);

  // 节点 Node
  const [activeNode, setActiveNode] = useState<Cell>();
  const [quickStyleConfig, setQuickStyleConfig] = useState<QuickStyleConfig>({
    open: false,
    title: '',
  });

  // 大屏分组
  const [activeGroup, setActiveGroup] = useState<string>('VROOT');

  // 大屏详情
  const { data: detail, run: getDetail } = useRequest(
    (params: API.getVisualDetailParams) => getVisualDetail(params),
    {
      manual: true,
    },
  );

  // 大屏分组列表
  const { data: groupList, run: getGroupList } = useRequest(() => getVisualGroup({}), {
    manual: true,
  });

  // 顶部进度条
  const [isAnimating, setAnimating] = useState<boolean>(false);

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
    rightQuickStyle,
    setRightQuickStyle,
    quickStyleConfig,
    setQuickStyleConfig,
    layers,
    setLayers,
    detail,
    getDetail,
    groupList,
    getGroupList,
    activeGroup,
    setActiveGroup,
    canvasConfig,
    setConfig,
    isAnimating,
    setAnimating,
    leftQuickStyle,
    setLeftQuickStyle,
    activeNode,
    setActiveNode
  };
};

export default useEditor;
