import { FormWrapper } from '@ant-design/flowchart';
import { Input } from 'antd';
import { useEffect, useState } from 'react';

type InputComponentProps = {
  config: any;
  plugin?: any;
};

const InputComponent = ({ config, plugin }: InputComponentProps) => {
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

export const formSchemaService = async (args: any) => {
  const { targetType } = args;
  const isGroup = args.targetData?.isGroup;
  const nodeSchema = {
    tabs: [
      {
        name: '设置',
        groups: [
          {
            name: 'groupName',
            controls: [
              {
                label: '节点名',
                name: '自定义form',
                shape: 'rename-service',
                placeholder: '节点名称',
              },
            ],
          },
        ],
      },
    ],
  };

  if (isGroup) {
    // TODO
  }

  if (targetType === 'node') {
    return nodeSchema;
  }

  if (targetType === 'edge') {
    // TODO
  }

  return {
    tabs: [
      {
        name: '设置',
        groups: [
          {
            name: 'groupName',
            controls: [
              {
                label: '',
                name: 'canvas-service',
                shape: 'canvas-service',
              },
            ],
          },
        ],
      },
    ],
  };
};

export const controlMapService = (controlMap: Map<string, React.FC<any>>) => {
  controlMap.set('rename-service', RenameService);
  controlMap.set('canvas-service', CanvasService);
  return controlMap;
};
