import { areas } from './Area';
import { bars } from './Bar';
import { intervals } from './Interval';
import { lines } from './Line';
import { medias } from './Media';
import { others } from './Other';
import { pies } from './Pie';
import { points } from './Point';
import { radars } from './Radar';
import { texts } from './Text';

const shapes = [
  ...intervals,
  ...medias,
  ...areas,
  ...others,
  ...bars,
  ...lines,
  ...pies,
  ...points,
  ...radars,
  ...texts,
];

export default shapes;
