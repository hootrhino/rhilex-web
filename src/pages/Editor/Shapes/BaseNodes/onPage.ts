import { commonAttrs, ports } from '../constants';

export const onPageNode = {
  name: 'on-page-node',
  config: {
    inherit: 'ellipse',
    overwrite: true,
    width: 60,
    height: 60,
    tools: ['node-editor'],
    attrs: {
      body: {
        ...commonAttrs.body,
      },
    },
    ports: { ...ports },
  },
};
