import { Graph } from '@antv/x6';
import { useRef } from 'react';

import { FullScreen, useFullScreenHandle } from 'react-full-screen';
import Canvas from './Canvas';
import DetailPanel from './DetailPanel';
import NodePanel from './NodePanel';
import ToolBar from './ToolBar';

const Editor = () => {
  const editorRef = useRef<Graph | undefined>();
  const handle = useFullScreenHandle();

  return (
    <FullScreen handle={handle}>
      <ToolBar ref={editorRef} handleFullScreen={handle} />
      <Canvas ref={editorRef} />
      <NodePanel ref={editorRef} />
      <DetailPanel />
    </FullScreen>
  );
};

export default Editor;
