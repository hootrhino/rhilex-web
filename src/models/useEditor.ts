import type { BackgroundManager, Cell, Graph } from '@antv/x6';
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

type Background = Omit<BackgroundManager.Options, 'position' | 'size'> & {
  position: string;
  size: string;
};

export type Config = Omit<Graph.Options, 'background'> & {
  background: Background;
  scale: number;
};

const useEditor = () => {
  // 画布属性设置
  const [config, setConfig] = useState<Config>(DEFAULT_CONFIG);
  const [selectedNode, setSelectedNode] = useState<Cell | undefined>(undefined);

  const [isGroup, setGroup] = useState<boolean>(false);

  return { config, setConfig, selectedNode, setSelectedNode, isGroup, setGroup };
};

export default useEditor;
