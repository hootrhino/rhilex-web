import { areas } from './Area';
import { bars } from './Bar';
import { intervals } from './Interval';
import { medias } from './Media';
import { others } from './Other';

const shapes = [...intervals, ...medias, ...areas, ...others, ...bars];

export default shapes;
