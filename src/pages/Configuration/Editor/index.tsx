import { Flowchart, FormWrapper } from '@ant-design/flowchart';
import { Input } from 'antd';
import { useEffect, useState } from 'react';
import './index.less';

const IndicatorNode = (props: any) => {
  const { size = { width: 120, height: 50 }, data } = props;
  const { width, height } = size;
  const { label = '自定义节点', stroke = '#ccc', fill = '#fff', fontFill, fontSize } = data;

  return (
    <div
      className="indicator-container"
      style={{
        position: 'relative',
        display: 'block',
        background: '#fff',
        border: '1px solid #84b2e8',
        borderRadius: '2px',
        padding: '10px 12px',
        overflow: 'hidden',
        boxShadow: '0 1px 4px 0 rgba(0,0,0,0.20)',
        width,
        height,
        borderColor: stroke,
        backgroundColor: fill,
        color: fontFill,
        fontSize,
      }}
    >
      <div style={{ color: fontFill }}>{label}</div>
    </div>
  );
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

const RenameService = (props: any) => {
  return (
    <FormWrapper {...props}>
      {(config, plugin) => <InputComponent {...props} plugin={plugin} config={config} />}
    </FormWrapper>
  );
};

const CanvasService = (props: any) => {
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

// 自定义表单
const formSchemaService = async (args: any) => {
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

const Editor = () => {
  return (
    <div style={{ height: '100vh', width: '100vw' }}>
      <Flowchart
        onSave={(d) => {
          console.log(d);
        }}
        toolbarPanelProps={{
          position: {
            top: 0,
            left: 0,
            right: 0,
          },
        }}
        scaleToolbarPanelProps={{
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
        }}
        canvasProps={{
          // 主画布
          position: {
            top: 40,
            left: 0,
            right: 0,
            bottom: 0,
          },
          config: {
            // 网格线配置
            rotating: true,
            background: {
              color: '#F5F5F5',
            },
            panning: true,
            mousewheel: true,
            grid: {
              visible: true,
              type: 'doubleMesh',
              args: [
                {
                  color: '#eee', // 主网格线颜色
                  thickness: 1, // 主网格线宽度
                },
                {
                  color: '#ddd', // 次网格线颜色
                  thickness: 1, // 次网格线宽度
                  factor: 4, // 主次网格线间隔
                },
              ],
            },
          },
        }}
        nodePanelProps={{
          // 节点面板配置
          position: { width: 160, top: 40, bottom: 0, left: 0 },
          registerNode: {
            title: '基础控件',
            nodes: [
              {
                component: IndicatorNode,
                popover: () => <div>指标节点</div>,
                name: 'custom-node-indicator',
                width: 120,
                height: 50,
                label: '自定义节点',
              },
            ],
          } as any,
        }}
        detailPanelProps={{
          // Form 表单
          position: { width: 200, top: 40, bottom: 0, right: 0 },
          controlMapService,
          formSchemaService,
        }}
        onConfigChange={(res) => console.log(res)}
      />
    </div>
  );
};

export default Editor;
