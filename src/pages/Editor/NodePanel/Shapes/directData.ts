import { Path } from '@antv/x6';
import { ports } from '../constants';

export const directDataNode = {
  name: 'direct-data-node',
  config: {
    inherit: 'path',
    overwrite: true,
    width: 100,
    height: 60,
    markup: [
      {
        tagName: 'rect',
        selector: 'bg',
      },
      {
        tagName: 'path',
        groupSelector: 'body',
        selector: 'bin',
      },
      {
        tagName: 'path',
        groupSelector: 'body',
        selector: 'arc',
      },
      {
        tagName: 'text',
        selector: 'label',
      },
    ],
    attrs: {
      body: {
        stroke: '#A2B1C3',
        strokeWidth: 1,
      },
      bin: {
        fill: '#fff',
        binPath: '',
      },
      arc: {
        fill: 'none',
        arcPath: '',
      },
    },
    ports: { ...ports },
    attrHooks: {
      binPath: {
        set(v: any, { refBBox }: any) {
          const { width, height } = refBBox;
          const rx = +(width / 10).toFixed(2);
          const ry = +(height / 2).toFixed(2);
          return {
            d: new Path()
              .moveTo(rx, 0)
              .lineTo(width - rx, 0)
              .arcTo(rx, ry, 0, 1, 1, width - rx, height)
              .lineTo(rx, height)
              .arcTo(rx, ry, 0, 1, 1, rx, 0)
              .serialize(),
          };
        },
      },
      arcPath: {
        set(v: any, { refBBox }: any) {
          const { width, height } = refBBox;
          const rx = +(width / 10).toFixed(2);
          const ry = +(height / 2).toFixed(2);
          return {
            d: new Path()
              .moveTo(width - rx, 0)
              .arcTo(rx, ry, 0, 1, 0, width - rx, height)
              .serialize(),
          };
        },
      },
    },
  },
};
