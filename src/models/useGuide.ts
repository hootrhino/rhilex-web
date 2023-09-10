import { useState } from 'react';

export const DEFAULT_GUIDE_CONFIG = {
  useResizeObserver: true,
  displayDragPos: true,
  longLineSize: 5,
  shortLineSize: 5,
  snapThreshold: 5,
  mainLineSize: '60%',
  font: '8px',
  textColor: '#474747',
  lineColor: '#787878',
  backgroundColor: '#292929',
  selectedBackgroundColor: '#27303F',
  selectedRangesTextColor: '#3A73E1',
  markColor: '#FA832E',
  guideStyle: {
    background: '#FA832E',
  },
  dragGuideStyle: {
    background: '#FA832E',
  },
  guidePosStyle: {
    color: '#FA832E',
  },
};

const DEFAULT_UNIT = 300;
const DEFAULT_ZOOM = 0.3;

const useGuide = () => {
  const [horizontalZoom, setHorizontalZoom] = useState<number>(DEFAULT_ZOOM);
  const [horizontalGuidelines, setHorizontalGuidelines] = useState<number[]>([]);
  const [horizontalUnit, setHorizontalUnit] = useState<number>(DEFAULT_UNIT);

  const [verticalZoom, setVerticalZoom] = useState<number>(DEFAULT_ZOOM);
  const [verticalGuidelines, setVerticalGuidelines] = useState<number[]>([]);
  const [verticalUnit, setVerticalUnit] = useState<number>(DEFAULT_UNIT);

  return {
    horizontalZoom,
    setHorizontalZoom,
    verticalZoom,
    setVerticalZoom,
    horizontalGuidelines,
    setHorizontalGuidelines,
    verticalGuidelines,
    setVerticalGuidelines,
    horizontalUnit,
    setHorizontalUnit,
    verticalUnit,
    setVerticalUnit,
  };
};

export default useGuide;
