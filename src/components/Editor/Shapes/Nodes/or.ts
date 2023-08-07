import { commonAttrs, DEFAULT_STROKE, ports } from '../constants';

export const orNode = {
  name: 'or-node',
  config: {
    inherit: 'path',
    overwrite: true,
    width: 60,
    height: 60,
    tools: ['node-editor'],
    markup: [
      {
        tagName: 'ellipse',
        selector: 'body',
      },
      {
        tagName: 'path',
        groupSelector: 'line',
        selector: 'h',
      },
      {
        tagName: 'path',
        groupSelector: 'line',
        selector: 'v',
      },
      {
        tagName: 'text',
        selector: 'label',
      },
    ],
    attrs: {
      body: {
        ...commonAttrs.body,
        refCx: '50%',
        refCy: '50%',
        refRx: '50%',
        refRy: '50%',
      },
      line: {
        stroke: DEFAULT_STROKE,
        strokeWidth: 1,
      },
      h: {
        hPath: '',
      },
      v: {
        vPath: '',
      },
    },
    ports: { ...ports },
    attrHooks: {
      hPath: {
        set(v: any, { refBBox }: any) {
          const { width, height } = refBBox;
          return { d: `M 0 ${height / 2}  L ${width} ${height / 2}` };
        },
      },
      vPath: {
        set(v: any, { refBBox }: any) {
          const { width, height } = refBBox;
          return { d: `M ${width / 2} 0 L ${width / 2} ${height}` };
        },
      },
    },
  },
};
