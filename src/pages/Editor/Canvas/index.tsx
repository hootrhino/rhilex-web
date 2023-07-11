import { Graph } from '@antv/x6';

import { forwardRef, useEffect } from 'react';
import { useModel } from 'umi';

const Canvas = forwardRef((props, ref) => {
  const {
    config: { background, width, height, scale },
  } = useModel('useEditor');

  const data = {
    nodes: [],
  };

  useEffect(() => {
    const graph = new Graph({
      container: document.getElementById('canvas-container') || undefined,
      background: background,
      panning: true,
      grid: true,
      width,
      height,
      mousewheel: {
        enabled: true,
        modifiers: 'Ctrl',
        maxScale: 4,
      },
    });

    ref.current = graph;
    graph.fromJSON(data); // TODO 渲染元素 data
    graph.centerContent(); // 居中显示
  }, []);

  useEffect(() => {
    const w = (width || 0) * ((scale || 30) / 100);
    const h = (height || 0) * ((scale || 30) / 100);

    ref.current?.resize(w, h);
  }, [width, height, scale]);

  useEffect(() => {
    ref.current?.drawBackground(background);
  }, [background]);

  return (
    <div className="flex justify-center items-center bg-[#F5F5F5] overflow-auto w-full h-[100vh]">
      <div id="canvas-container" ref={ref} />
    </div>
  );
});

export default Canvas;
