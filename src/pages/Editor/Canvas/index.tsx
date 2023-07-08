import { Graph } from '@antv/x6';
import { useEffect, useRef } from 'react';
import { useModel } from 'umi';

const Canvas = () => {
  const canvasRef = useRef<any>(null);
  const { bgSetting } = useModel('useEditor');

  useEffect(() => {
    const graph = new Graph({
      container: document.getElementById('canvas-container') || undefined,
      background: bgSetting,
      panning: true,
      mousewheel: true,
    });
    canvasRef.current = graph;
    graph.fromJSON({}); // TODO 渲染元素 data
    graph.centerContent(); // 居中显示
  }, []);

  useEffect(() => {
    canvasRef.current?.drawBackground(bgSetting);
  }, [bgSetting]);

  return <div id="canvas-container" ref={canvasRef} className="w-full h-[100vh]"></div>;
};

export default Canvas;
