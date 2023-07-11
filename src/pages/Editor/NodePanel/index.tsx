import { cn } from '@/utils/utils';
import { DoubleLeftOutlined, DoubleRightOutlined } from '@ant-design/icons';
import { useState } from 'react';

type NodePanelProps = {
  className?: string;
};

const NodePanel = ({ className }: NodePanelProps) => {
  const [collapse, setCollapse] = useState<boolean>(true);

  return (
    <div
      className={cn(
        className,
        'w-[200px] h-full bg-white fixed top-0 left-0 transition-all duration-500 border-r-1 border-[#ccc]',
        { 'left-0': collapse, 'left-[-200px]': !collapse },
      )}
    >
      <div
        onClick={() => setCollapse(!collapse)}
        className={cn(
          'flex items-center justify-center absolute w-[24px] h-[24px] bg-white text-[#aaa] hover:text-[#2b84c0] text-center shadow-md top-[60px] border border-[#ccc]',
          {
            'rounded-full right-[-12px]': collapse,
            'rounded-tl-none rounded-br-[50%] rounded-tr-[50%] rounded-bl-none right-[-20px]':
              !collapse,
          },
        )}
      >
        {collapse ? <DoubleLeftOutlined /> : <DoubleRightOutlined />}
      </div>
      <div>this is node list</div>
    </div>
  );
};

export default NodePanel;
