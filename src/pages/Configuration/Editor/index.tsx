import type { ScaleToolbarPanelProps, ToolbarPanelProps } from '@ant-design/flowchart';
import { Flowchart, FormWrapper } from '@ant-design/flowchart';
import { Input } from 'antd';
import { useEffect, useState } from 'react';

import { defaultCanvasProps } from './components/Canvas';
import { defaultDetailPanelProps } from './components/DetailPanel';
import { defaultNodePanelProps } from './components/NodePanel';

import './index.less';

type Datum<T = any> = {
  nodes?: T[];
  edges?: T[];
};

const defaultScaleToolbarPanelProps: ScaleToolbarPanelProps = {
  // 缩放控件
  layout: 'horizontal',
  position: {
    right: 0,
    top: -40,
  },
  style: {
    width: 150,
    height: 39,
    left: 'auto',
    background: 'transparent',
  },
};

const defaultToolbarPanelProps: ToolbarPanelProps = {
  position: {
    top: 0,
    left: 0,
    right: 0,
  },
};

const InputComponent = (props: any) => {
  const { config, plugin = {} } = props;
  const { placeholder, disabled } = config;
  const { updateNode } = plugin;
  const [label, setLabel] = useState(config?.label);

  const onLabelChange = async (e: any) => {
    setLabel(e.target.value);
    updateNode({
      label: e.target.value,
    });
  };

  useEffect(() => {
    setLabel(config?.label);
  }, [config]);

  return (
    <div style={{ padding: 12 }}>
      <label>标签: </label>
      <Input value={label} onChange={onLabelChange} placeholder={placeholder} disabled={disabled} />
    </div>
  );
};

export const RenameService = (props: any) => {
  return (
    <FormWrapper {...props}>
      {(config, plugin) => <InputComponent {...props} plugin={plugin} config={config} />}
    </FormWrapper>
  );
};

export const CanvasService = (props: any) => {
  console.log(props);
  return (
    <div className="flex justify-center pt-[60px] text-gray-400">
      <span>未选中</span>
    </div>
  );
};

// 注册自定义 Form 组件
export const controlMapService = (controlMap: Map<string, React.FC<any>>) => {
  controlMap.set('rename-service', RenameService);
  controlMap.set('canvas-service', CanvasService);
  return controlMap;
};

const Editor = () => {
  const handleOnSava = (data: Datum) => {
    console.log(data);
  };
  return (
    <div style={{ height: '100vh', width: '100vw' }}>
      <Flowchart
        onSave={handleOnSava}
        toolbarPanelProps={defaultToolbarPanelProps}
        scaleToolbarPanelProps={defaultScaleToolbarPanelProps}
        canvasProps={defaultCanvasProps}
        nodePanelProps={defaultNodePanelProps}
        detailPanelProps={defaultDetailPanelProps}
      />
    </div>
  );
};

export default Editor;
