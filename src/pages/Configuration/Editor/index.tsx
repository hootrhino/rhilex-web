import { Flowchart } from '@ant-design/flowchart';
import { controlMapService, formSchemaService } from './components/DetailPanel';
import { nodePanelConfig } from './components/NodePanel';
import { CANVAS, SCALE_TOOLBAR_PANEL, TOOLBAR_PANEL } from './constants';

import './index.less';

type Datum<T = any> = {
  nodes?: T[];
  edges?: T[];
};

const Editor = () => {
  const handleOnSava = (data: Datum) => {
    console.log(data);
  };

  return (
    <div style={{ height: '100vh', width: '100vw' }}>
      <Flowchart
        onSave={handleOnSava}
        toolbarPanelProps={TOOLBAR_PANEL}
        scaleToolbarPanelProps={SCALE_TOOLBAR_PANEL}
        canvasProps={CANVAS}
        nodePanelProps={nodePanelConfig}
        detailPanelProps={{
          position: { width: 200, top: 40, bottom: 0, right: 0 },
          controlMapService,
          formSchemaService,
        }}
      />
    </div>
  );
};

export default Editor;
