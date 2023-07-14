import { Path } from '@antv/x6';
import { commonAttrs, ports } from '../constants';

export const delayNode = {
  name: 'delay-node',
  config: {
    inherit: 'path',
    overwrite: true,
    width: 100,
    height: 60,
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
          const sr = 5;
          const br = Math.round(height + sr) / 2;
          const factor = 0.8;

          return {
            d: new Path()
              .moveTo(0, sr)
              .arcTo(sr, sr, 0, 0, 1, sr, 0)
              .lineTo(width * factor, 0)
              .arcTo(br, br, 0, 0, 1, width * factor, height)
              .lineTo(sr, height)
              .arcTo(sr, sr, 0, 0, 1, 0, height - sr)
              .close()
              .serialize(),
          };
        },
      },
    },
  },
};
