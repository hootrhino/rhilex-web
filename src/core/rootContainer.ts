import type { ReactNode } from 'react';
import { createElement } from 'react';

import { App } from 'antd';

import PopupHack from '@/components/PopupHack';

const rootContainer = (container: ReactNode) => {
  return createElement(App, null, container, createElement(PopupHack, null));
};

export default rootContainer;
