import { cn } from '@/utils/utils';
import { EyeInvisibleOutlined } from '@ant-design/icons';
import Ruler from '@scena/ruler';
import { useModel } from '@umijs/max';
import { useEffect } from 'react';

const HorizontalRuler = () => {
  const { collapseLeftPanel } = useModel('useEditor');

  useEffect(() => {
    const container = document.getElementById('ruler-horizontal')!;

    new Ruler(container, {
      type: 'horizontal',
      height: 20,
      unit: 200,
      font: '8px',
      longLineSize: 5,
      shortLineSize: 5,
      mainLineSize: '60%',
      backgroundColor: '#292929',
      textColor: '#464646',
      lineColor: '#787878',
      textOffset: [0, 10],
      range: [-4000, 4800],
      useResizeObserver: true,
      markColor: '#FA832E',
      marks: [0, 1920],
      defaultScrollPos: -700,
      zoom: 0.5,
      selectedRanges: [[0, 1920]],
      selectedBackgroundColor: '#27303F',
      selectedRangesTextColor: '#3A73E1',
    });
  }, []);

  return (
    <>
      <div className={cn('canvas-ruler-horizontal', 'fixed top-[60px] w-full left-[84px]')}>
        <div id="ruler-horizontal" className="w-full" />
      </div>
      <div
        className={cn(
          'flex justify-center items-center fixed top-[60px] w-[20px] h-[20px] bg-[#292929] z-[100]',
          collapseLeftPanel ? 'left-[64px]' : 'left-[306px]',
        )}
      >
        <EyeInvisibleOutlined style={{ color: '#adadad' }} />
      </div>
    </>
  );
};

export default HorizontalRuler;
