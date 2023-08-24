/** 漏斗图形 */

import { Path } from '@antv/x6';
import { commonAttrs, ports } from '../constants';

export const collateNode = {
  name: 'collate-node',
  config: {
    inherit: 'path',
    overwrite: true,
    width: 100,
    height: 100,
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
          const sx = width / 98.5;
          const sy = height / 98.5;
          return {
            d: new Path()
              .moveTo(93, 0)
              .arcTo(6, 3.5, -15, 0, 1, 96, 5)
              .lineTo(0, 93)
              .arcTo(6, 3.5, -15, 0, 0, 5, 98)
              .lineTo(93, 98)
              .arcTo(6, 3.5, 15, 0, 0, 96, 93)
              .lineTo(0, 5)
              .arcTo(6, 3.5, 15, 0, 1, 5, 0)
              .lineTo(93, 0)
              .close()
              .scale(sx, sy)
              .serialize(),
          };
        },
      },
    },
  },
};
