import type { NodePanelProps } from '@ant-design/flowchart';
import IndicatorNode from './IndicatorNode';
import Popover from './Popover';

export const defaultNodePanelProps: NodePanelProps = {
  // 节点面板配置
  position: { width: 160, top: 40, bottom: 0, left: 0 },
  registerNode: [
    {
      title: '基础控件',
      nodes: [
        {
          component: IndicatorNode,
          popover: Popover({ title: 'ttt' }),
          name: 'custom-node-indicator',
          width: 120,
          height: 50,
          label: '自定义节点',
        },
      ],
    } as any,
  ],
};
