import Canvas from './Canvas';
import DetailPanel from './DetailPanel';
import NodePanel from './NodePanel';
import ToolBar from './ToolBar';

const Editor = () => {
  return (
    <div className="w-full h-full relative">
      <ToolBar />
      <Canvas />
      <NodePanel />
      <DetailPanel />
    </div>
  );
};

export default Editor;
