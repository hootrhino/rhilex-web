import type { DetailPanelProps } from '@ant-design/flowchart';
import { CanvasService, RenameService } from '../..';

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

export const defaultDetailPanelProps: DetailPanelProps = {
  // Form 表单
  position: { width: 200, top: 40, bottom: 0, right: 0 },
  controlMapService,
  formSchemaService,
};
