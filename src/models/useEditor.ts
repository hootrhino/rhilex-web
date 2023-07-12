import type { BackgroundManager, Graph } from '@antv/x6';
import { useState } from 'react';

export const DEFAULT_WIDTH = 1920;
export const DEFAULT_HEIGHT = 1080;

export const DEFAULT_CONFIG = {
  background: {
    color: '#434343',
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
  const [config, setConfig] = useState<Config>(DEFAULT_CONFIG);

  return { config, setConfig };
};

export default useEditor;
