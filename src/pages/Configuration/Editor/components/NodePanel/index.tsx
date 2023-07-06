import { NodePanelProps } from '@ant-design/flowchart';

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

export const nodePanelConfig: NodePanelProps = {
  position: { width: 160, top: 40, bottom: 0, left: 0 },
  registerNode: [
    {
      title: '基础控件',
      nodes: [
        {
          component: IndicatorNode,
          popover: () => <div>ttt</div>,
          name: 'custom-node-indicator',
          width: 120,
          height: 50,
          label: '自定义节点',
        },
      ],
    } as any,
  ],
};
