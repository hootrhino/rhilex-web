import { JSONObject, Line, NumberExt, Path, Point } from '@antv/x6';
import { commonAttrs, ports } from '../constants';

interface KnobsAttrValue extends JSONObject {
  round: boolean | string | number;
  ridge: boolean | string | number;
}

export const manualOperationNode = {
  name: 'manual-operation-node',
  config: {
    inherit: 'path',
    overwrite: true,
    width: 100,
    height: 60,
    tools: ['node-editor'],
    attrs: {
      body: {
        ...commonAttrs.body,
        knobs: {
          round: 0.1,
          ridge: 0.2,
        },
      },
    },
    ports: { ...ports },
    attrHooks: {
      knobs: {
        set(val: KnobsAttrValue, { refBBox }: any) {
          if (typeof val === 'object') {
            const v = val;
            const { width, height } = refBBox;
            const dim = Math.min(width, height);
            let round: number;
            let ridge: number;

            if (v.round === null) {
              round = 0;
            } else if (typeof v.round === 'boolean') {
              round = dim * 0.1;
            } else {
              round = NumberExt.normalizePercentage(v.round, dim);
            }

            if (round > dim / 2) {
              round = dim / 2;
            }

            if (v.ridge === null) {
              ridge = 0;
            } else if (typeof v.ridge === 'boolean' || v.ridge === null) {
              ridge = width * 0.2;
            } else {
              ridge = NumberExt.normalizePercentage(v.ridge, width);
            }

            if (ridge > width / 2) {
              ridge = width / 2;
            }

            const points: Point.PointData[] =
              ridge === width / 2
                ? [
                    [0, 0],
                    [width, 0],
                    [ridge, height],
                  ]
                : [
                    [0, 0],
                    [width, 0],
                    [width - ridge, height],
                    [ridge, height],
                  ];

            return {
              d: Path.drawPoints(points, {
                round,
                close: true,
                initialMove: true,
              }),
            };
          }
        },
      },
    },
    knob: [
      {
        position({ node }: any) {
          const bbox = node.getBBox();
          const dim = Math.min(bbox.width, bbox.height);
          const raw = node.attr('body/knobs/round');
          const round = NumberExt.normalizePercentage(raw, dim);
          return {
            x: bbox.width - round,
            y: round,
          };
        },
        onMouseMove({ node, data, deltaX }: any) {
          if (deltaX !== 0) {
            const key = 'body/knobs/round';
            const previous = node.attr(key);

            if (data.round === null) {
              data.round = previous;
            }

            const bbox = node.getBBox();
            const dim = Math.min(bbox.width, bbox.height) / 2;
            const current = NumberExt.clamp(data.round - deltaX / dim, 0, 0.5);
            if (current !== previous) {
              node.attr(key, current);
            }
          }
        },
      },
      {
        position({ node }: any) {
          const bbox = node.getBBox();
          const raw = node.attr('body/knobs/ridge');
          const ridge = bbox.width * raw;
          const line = new Line(ridge, bbox.height, 0, 0);
          return line.pointAt(0.25);
        },
        onMouseMove({ node, data, deltaX }: any) {
          if (deltaX !== 0) {
            const key = 'body/knobs/ridge';
            const previous = node.attr(key);

            if (data.ridge === null) {
              data.ridge = previous;
            }

            const bbox = node.getBBox();
            const current = NumberExt.clamp(data.ridge + (2 * deltaX) / bbox.width, 0, 0.5);
            if (current !== previous) {
              node.attr(key, current);
            }
          }
        },
      },
    ],
  },
};
