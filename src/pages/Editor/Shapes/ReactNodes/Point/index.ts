import { chartConfig } from '../../constants';
import Point1 from './Point1';
import Point2 from './Point2';

export const points = [
  {
    ...chartConfig,
    shape: 'point1',
    component: Point1,
  },
  {
    ...chartConfig,
    shape: 'point2',
    component: Point2,
  },
];
