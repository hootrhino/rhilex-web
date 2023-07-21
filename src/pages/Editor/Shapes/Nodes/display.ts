import { Path } from '@antv/x6';
import { commonAttrs, ports } from '../constants';

export const displayNode = {
  name: 'display-node',
  config: {
    inherit: 'path',
    overwrite: true,
    width: 100,
    height: 60,
    tools: ['node-editor'],
    attrs: {
      body: {
        ...commonAttrs.body,
        path: '',
      },
    },
    ports: { ...ports },
    attrHooks: {
      path: {
        set(v: any, { refBBox }: any) {
          const { width, height } = refBBox;
          const rx = width * 0.6;
          const ry = Math.round(height + 6) / 2;
          const f1 = 0.4;
          const f2 = 0.8;

          return {
            d: new Path()
              .moveTo(0, height / 2)
              .arcTo(rx, height, 0, 0, 1, width * f1, 0)
              .lineTo(width * f2, 0)
              .arcTo(width * 0.33, ry, 0, 0, 1, width * f2, height)
              .lineTo(width * f1, height)
              .arcTo(rx, height, 0, 0, 1, 0, height / 2)
              .serialize(),
          };
        },
      },
    },
  },
};
