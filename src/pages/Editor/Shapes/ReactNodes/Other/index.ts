import { chartConfig } from '../../constants';
import Other1 from './Other1';
import Other2 from './Other2';
import Other3 from './Other3';
import Other4 from './Other4';
import Other5 from './Other5';

export const others = [
  {
    shape: 'other1',
    component: Other1,
    width: 90,
    height: 90,
  },
  {
    shape: 'other2',
    component: Other2,
    width: 100,
    height: 100,
  },
  {
    shape: 'other3',
    component: Other3,
    width: 100,
    height: 100,
  },
  {
    ...chartConfig,
    shape: 'other4',
    component: Other4,
  },
  {
    ...chartConfig,
    shape: 'other5',
    component: Other5,
  },
];
