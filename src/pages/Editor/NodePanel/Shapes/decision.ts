/** 菱形 */

import { commonAttrs, ports } from '../constants';

export const decisionNode = {
  name: 'decision-node',
  config: {
    inherit: 'polygon',
    overwrite: true,
    width: 120,
    height: 90,
    attrs: {
      body: {
        ...commonAttrs.body,
        refPoints: '0,10 10,0 20,10 10,20',
      },
    },
    ports: {
      ...ports,
      items: [
        {
          group: 'top',
        },
        {
          group: 'bottom',
        },
      ],
    },
  },
};
