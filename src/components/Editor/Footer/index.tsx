import { cn, IconFont } from '@/utils/utils';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { useModel } from '@umijs/max';
import { Select, Slider, Space } from 'antd';
import { useState } from 'react';

import './index.less';

const Footer = () => {
  const { collapseLeftPanel } = useModel('useEditor');
  const [canvasSize, setCanvasSize] = useState<number>(36);

  const handleOnSlider = (value: number) => {
    setCanvasSize(value);
  };

  return (
    <div
      className={cn(
        'footer-container',
        'flex justify-center items-center fixed bottom-0 left-0 right-0 w-full h-[48px] bg-[#1A1A1A]',
      )}
    >
      <div className={cn('absolute', collapseLeftPanel ? 'left-[64px]' : 'left-[306px]')}>
        <Space align="center" className="px-[10px]">
          <IconFont type="icon-map-switch" className="mr-[12px]" />
          <MinusOutlined style={{ color: '#dbdbdb', paddingBottom: 7 }} />
          <Slider
            min={30}
            max={300}
            onChange={handleOnSlider}
            value={canvasSize}
            className="w-[180px]"
            railStyle={{ background: '#5C5C5C', height: 2 }}
            trackStyle={{ background: '#dbdbdb', height: 2 }}
          />
          <PlusOutlined style={{ color: '#dbdbdb', paddingBottom: 7 }} />
          <Select
            defaultValue="50%"
            bordered={false}
            dropdownStyle={{ background: '#333', color: '#dbdbdb' }}
            options={[
              { value: '50%', label: '50%' },
              { value: '100%', label: '100%' },
              { value: '150%', label: '150%' },
              { value: '200%', label: '200%' },
              { value: '250%', label: '250%' },
              { value: '300%', label: '300%' },
            ]}
          />
        </Space>
      </div>
    </div>
  );
};

export default Footer;
