/** 正三角形 */

import { NumberExt, Path, Point } from '@antv/x6';
import { commonAttrs, ports } from '../constants';

export const mergeNode = {
  name: 'merge-node',
  config: {
    inherit: 'path',
    overwrite: true,
    width: 100,
    height: 60,
    tools: ['node-editor'],
    attrs: {
      body: {
        ...commonAttrs.body,
        round: 0.1,
      },
    },
    ports: { ...ports },
    attrHooks: {
      round: {
        set(v: any, { refBBox }: any) {
          if (typeof v === 'number') {
            const { width, height } = refBBox;
            const dim = Math.min(width, height);
            let round = NumberExt.normalizePercentage(v, dim);
            if (round > dim / 2) {
              round = dim / 2;
            }

            const points: Point.PointData[] = [
              [0, 0],
              [width, 0],
              [width / 2, height],
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
  },
};
