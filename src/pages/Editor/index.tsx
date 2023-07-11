import type { Graph } from '@antv/x6';
import { useRef } from 'react';
import Canvas from './Canvas';
import DetailPanel from './DetailPanel';
import NodePanel from './NodePanel';
import ToolBar from './ToolBar';

const Editor = () => {
  const editorRef = useRef<Graph | undefined>();

  return (
    <>
      <ToolBar />
      <Canvas ref={editorRef} />
      <NodePanel ref={editorRef} />
      <DetailPanel />
    </>
  );
};

export default Editor;
