/** 椭圆形 */
import { Path } from '@antv/x6';
import { commonAttrs, ports } from '../constants';

export const terminatorNode = {
  name: 'terminator-node',
  config: {
    inherit: 'path',
    overwrite: true,
    width: 100,
    height: 60,
    attrs: {
      body: {
        ...commonAttrs.body,
        draw: true,
      },
    },
    ports: { ...ports },
    attrHooks: {
      draw: {
        set(v: any, { refBBox }: any) {
          const { width, height } = refBBox;
          const sx = width / 98;
          const sy = height / 60;
          return {
            d: new Path()
              .moveTo(30, 0)
              .lineTo(68, 0)
              .arcTo(30, 30, 0, 0, 1, 68, 60)
              .lineTo(30, 60)
              .arcTo(30, 30, 0, 0, 1, 30, 0)
              .scale(sx, sy)
              .serialize(),
          };
        },
      },
    },
  },
};
