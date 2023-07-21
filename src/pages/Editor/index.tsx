import { FullScreen, useFullScreenHandle } from 'react-full-screen';
import Canvas from './Canvas';
import DetailPanel from './DetailPanel';
import NodePanel from './NodePanel';
import ToolBar from './ToolBar';

const Editor = () => {
  const handle = useFullScreenHandle();

  return (
    <FullScreen handle={handle}>
      <ToolBar handleFullScreen={handle} />
      <Canvas />
      <NodePanel />
      <DetailPanel />
    </FullScreen>
  );
};

export default Editor;
