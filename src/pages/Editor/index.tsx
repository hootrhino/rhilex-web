import { useModel, useParams } from '@umijs/max';
import { useEffect } from 'react';
import Canvas from './Canvas';
import TopProgress from './components/TopProgress';

const Editor = () => {
  const { uuid } = useParams();
  const { getDetail, isAnimating } = useModel('useEditor');

  useEffect(() => {

    if (uuid) {
      getDetail({ uuid });
    }
  }, [uuid]);

  return (
    <>
      <TopProgress isAnimating={isAnimating} />
      <Canvas />
    </>
  );
};

export default Editor;
