import { NumberExt, Path } from '@antv/x6';
import { commonAttrs, ports } from '../constants';

export const documentNode = {
  name: 'document-node',
  config: {
    inherit: 'path',
    overwrite: true,
    width: 100,
    height: 60,
    attrs: {
      body: {
        ...commonAttrs.body,
        ridge: 0.25,
      },
    },
    ports: { ...ports },
    attrHooks: {
      ridge: {
        set(v: number, { refBBox }: any) {
          if (typeof v === 'number') {
            const { width, height } = refBBox;
            const round = 5;
            const ridge = v * height;
            const path = new Path()
              .moveTo(width - round, 0)
              .arcTo(round, round, 0, 0, 1, width, round)
              .lineTo(width, height - ridge / 2)
              .quadTo((3 * width) / 4, height - 1.4 * ridge, width / 2, height - ridge / 2)
              .quadTo(width / 4, height - ridge * (1 - 1.4), 0, height - ridge / 2);

            if (ridge / 2 > round) {
              path.lineTo(0, ridge / 2);
            }

            path.lineTo(0, round).arcTo(round, round, 0, 0, 1, round, 0).close();

            return {
              d: path.serialize(),
            };
          }
        },
      },
    },
    knob: {
      position({ node }: any) {
        const bbox = node.getBBox();
        const ridge = node.attr('body/ridge');
        return { x: bbox.width * 0.75, y: bbox.height - bbox.height * ridge };
      },
      onMouseMove({ node, data, deltaY }: any) {
        if (deltaY !== 0) {
          const bbox = node.getBBox();
          const key = 'body/ridge';
          const previous = node.attr(key);

          if (data.ridge === null) {
            data.ridge = previous;
          }

          const current = NumberExt.clamp(data.ridge - deltaY / bbox.height, 0, 1);
          if (current !== previous) {
            node.attr(key, current);
          }
        }
      },
    },
  },
};
