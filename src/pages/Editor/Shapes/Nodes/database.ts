import { Path } from '@antv/x6';
import { commonAttrs, ports } from '../constants';

export const databaseNode = {
  name: 'database-node',
  config: {
    inherit: 'path',
    overwrite: true,
    width: 60,
    height: 60,
    tools: ['node-editor'],
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
        selector: 'top',
      },
      {
        tagName: 'text',
        selector: 'label',
      },
    ],
    attrs: {
      body: {
        ...commonAttrs.body,
      },
      bin: {
        fill: '#fff',
        binPath: '',
      },
      top: {
        fill: 'none',
        topPath: '',
      },
    },
    ports: { ...ports },
    attrHooks: {
      binPath: {
        set(_v: any, { refBBox }: any) {
          const { width, height } = refBBox;
          const rx = +(width / 2).toFixed(2);
          const ry = +(height / 6).toFixed(2);
          return {
            d: new Path()
              .moveTo(0, height - ry)
              .lineTo(0, ry)
              .arcTo(rx, ry, 0, 0, 1, width, ry)
              .lineTo(width, height - ry)
              .arcTo(rx, ry, 0, 0, 1, 0, height - ry)
              .serialize(),
          };
        },
      },
      topPath: {
        set(_v: any, { refBBox }: any) {
          const { width, height } = refBBox;
          const rx = +(width / 2).toFixed(2);
          const ry = +(height / 6).toFixed(2);
          return {
            d: new Path().moveTo(0, ry).arcTo(rx, ry, 0, 0, 0, width, ry).serialize(),
          };
        },
      },
    },
  },
};
