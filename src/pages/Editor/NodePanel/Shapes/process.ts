/** 矩形 */

import { commonAttrs, ports } from '../constants';

export const processNode = {
  name: 'process-node',
  config: {
    inherit: 'rect',
    overwrite: true,
    width: 100,
    height: 70,
    tools: ['node-editor'],
    attrs: {
      ...commonAttrs,
    },
    ports: { ...ports },
  },
};
