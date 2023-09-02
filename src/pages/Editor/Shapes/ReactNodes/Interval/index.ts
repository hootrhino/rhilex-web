import { chartConfig } from '../../constants';
import Interval1 from './Interval1';
import Interval2 from './Interval2';
import Interval3 from './Interval3';
import Interval4 from './Interval4';

export const intervals = [
  {
    ...chartConfig,
    shape: 'interval1',
    component: Interval1,
  },
  {
    ...chartConfig,
    shape: 'interval2',
    component: Interval2,
  },
  {
    ...chartConfig,
    shape: 'interval3',
    component: Interval3,
  },
  {
    shape: 'interval4',
    component: Interval4,
    width: 100,
    height: 100,
  },
];
