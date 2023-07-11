import Canvas from './Canvas';
import DetailPanel from './DetailPanel';
import NodePanel from './NodePanel';
import ToolBar from './ToolBar';

const Editor = () => {
  return (
    <>
      <ToolBar />
      <Canvas />
      <NodePanel />
      <DetailPanel />
    </>
  );
};

export default Editor;
