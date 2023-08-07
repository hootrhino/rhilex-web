import { cn } from '@/utils/utils';
import Ruler from '@scena/ruler';
import { useModel } from '@umijs/max';
import { useEffect } from 'react';

const VerticalRuler = () => {
  const { collapseLeftPanel } = useModel('useEditor');

  useEffect(() => {
    const container = document.getElementById('ruler-vertical')!;

    new Ruler(container, {
      type: 'vertical',
      width: 20,
      unit: 200,
      font: '8px',
      longLineSize: 5,
      shortLineSize: 5,
      mainLineSize: '60%',
      backgroundColor: '#292929',
      textColor: '#464646',
      lineColor: '#787878',
      textOffset: [-10, 0],
      textAlign: 'right',
      direction: 'start',
      range: [-1500, 2400],
      useResizeObserver: true,
      markColor: '#FA832E',
      marks: [0, 1080],
      zoom: 0.5,
      defaultScrollPos: -400,
      selectedRanges: [[0, 1080]],
      selectedBackgroundColor: '#27303F',
      selectedRangesTextColor: '#3A73E1',
    });
  }, []);

  return (
    <div
      className={cn(
        'canvas-ruler-vertical',
        'fixed bottom-0 h-full',
        collapseLeftPanel ? 'left-[64px]' : 'left-[306px]',
      )}
    >
      <div id="ruler-vertical" className="h-full" />
    </div>
  );
};

export default VerticalRuler;
