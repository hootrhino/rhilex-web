import { Graph } from '@antv/x6';
import { useEffect, useRef } from 'react';
import { useModel } from 'umi';

const Canvas = () => {
  const canvasRef = useRef<any>(null);
  const { bgSetting } = useModel('useEditor');

  const data = {
    nodes: [],
  };

  useEffect(() => {
    const graph = new Graph({
      container: document.getElementById('canvas-container') || undefined,
      background: bgSetting,
      panning: true,
      grid: true,
      mousewheel: {
        enabled: true,
        modifiers: 'Ctrl',
        maxScale: 4,
      },
    });
    canvasRef.current = graph;
    graph.fromJSON(data); // TODO 渲染元素 data
    graph.centerContent(); // 居中显示
    graph.zoom(-0.3);
  }, []);

  useEffect(() => {
    canvasRef.current?.drawBackground(bgSetting);
  }, [bgSetting]);

  return (
    <div
      id="canvas-container"
      ref={canvasRef}
      className="w-full truncate"
      style={{ height: 'calc(100vh - 40px)' }}
    ></div>
  );
};

export default Canvas;
