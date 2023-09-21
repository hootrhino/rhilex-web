import other1 from './Other1/other1.png';
import other1QuickStyle from './Other1/QuickStyles';

import other2 from './Other2/other2.png';
import other2QuickStyle from './Other2/QuickStyles';

import other3 from './Other3/other3.png';
import other3QuickStyle from './Other3/QuickStyles';

import other4 from './Other4/other4.png';
import other4QuickStyle from './Other4/QuickStyles';

import other5 from './Other5/other5.png';
import other5QuickStyle from './Other5/QuickStyles';

const other = {
  other1: {
    image: other1,
    children: [...other1QuickStyle]
  },
  other2: {
    image: other2,
    children: [...other2QuickStyle]
  },
  other3: {
    image: other3,
    children: [...other3QuickStyle]
  },
  other4: {
    image: other4,
    children: [...other4QuickStyle]
  },
  other5: {
    image: other5,
    children: [...other5QuickStyle]
  }
}

export default other;
