import { useEffect } from 'react';
import Canvas from './Canvas';
import { useModel, useParams } from '@umijs/max';

const Editor = () => {
  const { uuid } = useParams();
  const {
    getDetail,
  } = useModel('useEditor');

  useEffect(() => {
    if (uuid) {
      getDetail({ uuid });
    }
  }, [uuid]);

  return <Canvas />;
};

export default Editor;
