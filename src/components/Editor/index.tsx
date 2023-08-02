import { FullScreen, useFullScreenHandle } from 'react-full-screen';
import Canvas from './Canvas';

const Editor = () => {
  const handle = useFullScreenHandle();

  return (
    <FullScreen handle={handle}>
      <Canvas handleFullScreen={handle} />
    </FullScreen>
  );
};

export default Editor;
