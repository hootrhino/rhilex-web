import { chartConfig } from '../../constants';
import Other1 from './Other1';
import Other3 from './Other3';
import Other4 from './Other4';
import Other5 from './Other5';
import Sunburst1 from './Sunburst/Sunburst1';
import Sunburst2 from './Sunburst/Sunburst2';
import Sunburst3 from './Sunburst/Sunburst3';
import Sunburst5 from './Sunburst/Sunburst5';

export const others = [
  {
    shape: 'other1',
    component: Other1,
    width: 90,
    height: 90,
  },
  {
    shape: 'other2',
    component: Sunburst1,
    width: 100,
    height: 100,
  },
  {
    shape: 'sunburst2',
    component: Sunburst2,
    width: 100,
    height: 100,
  },
  {
    shape: 'sunburst3',
    component: Sunburst3,
    width: 100,
    height: 100,
  },
  {
    shape: 'sunburst5',
    component: Sunburst5,
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
