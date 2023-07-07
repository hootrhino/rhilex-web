import { Graph } from '@antv/x6';
import { useEffect, useRef } from 'react';

const Editor = () => {
  const canvasRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const graph = new Graph({
      container: canvasRef.current!,
      autoResize: true,
      background: {
        color: '#AFBCCE',
      },
    });
    graph.fromJSON({}); // TODO 渲染元素 data
    graph.centerContent(); // 居中显示
  }, []);

  return (
    <div className="w-full h-full">
      <div ref={canvasRef} className="h-[100vh]"></div>
    </div>
  );
};

export default Editor;
