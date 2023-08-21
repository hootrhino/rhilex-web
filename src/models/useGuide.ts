import { useState } from 'react';

export const DEFAULT_GUIDE_CONFIG = {
  useResizeObserver: true,
  // displayDragPos: true,
  // displayGuidePos: true,
  longLineSize: 5,
  shortLineSize: 5,
  mainLineSize: '60%',
  font: '8px',
  // textColor: '#464646',
  lineColor: '#787878',
  selectedBackgroundColor: '#27303F',
  selectedRangesTextColor: '#3A73E1',
  markColor: '#FA832E',
}

const useGuide = () => {
  const [horizontalZoom, setHorizontalZoom] = useState<number>(1);
  const [horizontalGuidelines, setHorizontalGuidelines] = useState<number[]>([]);
  const [horizontalUnit, setHorizontalUnit] = useState<number>(100);

  const [verticalZoom, setVerticalZoom] = useState<number>(1);
  const [verticalGuidelines, setVerticalGuidelines] = useState<number[]>([]);
  const [verticalUnit, setVerticalUnit] = useState<number>(100);

  return {
    horizontalZoom,
    setHorizontalZoom,
    verticalZoom,
    setVerticalZoom,
    horizontalGuidelines,
    setHorizontalGuidelines,
    verticalGuidelines,
    setVerticalGuidelines,
    horizontalUnit, setHorizontalUnit,
    verticalUnit, setVerticalUnit
  };
};

export default useGuide;
