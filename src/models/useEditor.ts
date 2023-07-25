import { BackgroundManager, Graph } from '@antv/x6';
import { useState } from 'react';

export const DEFAULT_WIDTH = 1920;
export const DEFAULT_HEIGHT = 1080;

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
  line: {
    stroke: '#8f8f8f',
    strokeWidth: 1,
    // sourceMarker: null,
    // targetMarker: 'classic',
  },
  label: {
    fill: '#000',
    fontSize: 14,
    bodyFill: '#fff',
  },
  pipeline: {
    strokeBg: '#999',
    blockBg: '#73d13d',
    type: 'forward',
  },
  lineType: 'solid',
  arrowType: 'forward',
  move: 'false',
};

export type EdgeConfig = {
  line: {
    stroke: string;
    strokeWidth: number;
    [key: string]: any;
  };
  label: {
    fill: string;
    fontSize: number;
    bodyFill: string;
    [key: string]: any;
  };
  pipeline: {
    strokeBg: string;
    blockBg: string;
    type: 'forward' | 'reverse';
  };
  lineType: 'solid' | 'dotted' | 'pipeline';
  arrowType: 'forward' | 'reverse' | 'two-way' | 'none';
  move?: string;
};

type Background = Omit<BackgroundManager.Options, 'position' | 'size'> & {
  position: string;
  size: string;
};

export type Config = Omit<Graph.Options, 'background'> & {
  background: Background;
  scale: number;
};

type DetailType = 'node' | 'edge' | 'canvas';

const useEditor = () => {
  // 画布属性设置
  const [config, setConfig] = useState<Config>(DEFAULT_CONFIG);

  // 边样式
  const [edgeConfig, setEdgeConfig] = useState<EdgeConfig>(DEFAULT_EDGE_CONFIG as EdgeConfig);

  const [detailFormType, setDetailFormType] = useState<DetailType>('canvas');

  return { config, setConfig, edgeConfig, setEdgeConfig, detailFormType, setDetailFormType };
};

export default useEditor;
