import { DEFAULT_HEIGHT, DEFAULT_WIDTH } from '@/utils/constant';
import { BackgroundManager, Graph, Edge } from '@antv/x6';
import { useState } from 'react';

export enum LineTypeOption {
  Solid = 'solid',
  Dotted = 'dotted',
  Pipeline = 'pipeline'
}

export enum ArrowTypeOption {
  Forward = 'forward',
  Reverse = 'reverse',
  Both = 'both',
  None = 'none'
}

export type DetailType = 'node' | 'edge' | 'canvas';

export type EdgeForm = {
  lineType: LineTypeOption;
  arrowType: ArrowTypeOption;
  pipeline: {
    bg: string;
    fill: string;
    type: string;
  },
  line: {
    move: string;
    stroke: string;
    strokeWidth: number;
    [key: string]: any;
  },
  label: {
    fill: string;
    fontSize: number;
    bodyFill: string;
    offset: number;
  }
}

type Background = Omit<BackgroundManager.Options, 'position' | 'size'> & {
  position: string;
  size: string;
};

export type Config = Omit<Graph.Options, 'background'> & {
  background: Background;
  scale: number;
};

export const DEFAULT_CONFIG = {
  background: {
    color: '#d9d9d9',
    repeat: 'no-repeat',
    size: 'auto auto',
    position: 'center',
  },
  width: DEFAULT_WIDTH,
  height: DEFAULT_HEIGHT,
  scale: 50,
};

export const DEFAULT_EDGE_CONFIG = {
  markup: [],
  attrs: {
    line: {
      stroke: '#8f8f8f',
      strokeWidth: 1,
    },
    lines: {
      stroke: '',
      style: {
        animation: ''
      }
    }
  },
  labels: [{
    attrs: {
      label: {
        fill: '#000',
    fontSize: 14,
      },
      body: {
        fill: '#fff',
      }
    },
    position: {
      offset: 0
    }
  }],
  // line: {
  //   stroke: '#8f8f8f',
  //   strokeWidth: 1,
  // },
  // label: {
  //   fill: '#000',
  //   fontSize: 14,
  //   bodyFill: '#fff',
  // },
  // pipeline: {
  //   strokeBg: '#999',
  //   blockBg: '#73d13d',
  //   type: 'forward',
  // },
  // lineType: 'solid',
  // arrowType: 'forward',
  // move: 'false',
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
    offset: 0
  }
}

const useEditor = () => {
  // 画布属性设置
  const [config, setConfig] = useState<Config>(DEFAULT_CONFIG);

  // 边Edge表单
  const [edgeFormData, setEdgeForm] = useState<EdgeForm>(DEFAULT_EDGE_FORM_DATA);
  const [edgeData, setEdgeData] = useState<Edge.Metadata>();

  // 右侧详情面板显示类型
  const [detailFormType, setDetailFormType] = useState<DetailType>('canvas');

  return { config, setConfig, detailFormType, setDetailFormType, edgeFormData, setEdgeForm, edgeData, setEdgeData };
};

export default useEditor;
