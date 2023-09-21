import point1 from './Point1/point1.png';

import point2 from './Point2/point2.png';
import point2QuickStyle from './Point2/QuickStyles';

export default {
  point1: {
    image: point1,
    children: []
  },
  point2: {
    image: point2,
    children: [...point2QuickStyle]
  }
}

