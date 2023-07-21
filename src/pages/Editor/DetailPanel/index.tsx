import { cn } from '@/utils/utils';
import { DoubleLeftOutlined, DoubleRightOutlined } from '@ant-design/icons';
import { useModel } from '@umijs/max';
import { useState } from 'react';
import BgSetting from './components/BgSetting';

const DetailPanel = () => {
  const [collapse, setCollapse] = useState<boolean>(true);
  const { graph } = useModel('useEditor');

  console.log(graph);

  return (
    <div
      className={cn(
        'w-[300px] h-full bg-white fixed top-0 transition-all duration-500 border-l-1 border-[#ccc]',
        { 'right-0': collapse, 'right-[-300px]': !collapse },
      )}
    >
      <div
        onClick={() => setCollapse(!collapse)}
        className={cn(
          'flex items-center justify-center absolute w-[24px] h-[24px] bg-white text-[#aaa] hover:text-[#2b84c0] text-center shadow-md top-[60px] border border-[#ccc]',
          {
            'rounded-full left-[-12px]': collapse,
            'rounded-rl-none rounded-bl-[50%] rounded-tl-[50%] rounded-br-none left-[-20px]':
              !collapse,
          },
        )}
      >
        {collapse ? <DoubleRightOutlined /> : <DoubleLeftOutlined />}
      </div>
      <div className="mt-[40px] px-[5px]">
        <div className="flex items-center justify-center h-[40px] shadow-md">
          <span>页面设置</span>
        </div>
        <BgSetting />
      </div>
    </div>
  );
};

export default DetailPanel;
