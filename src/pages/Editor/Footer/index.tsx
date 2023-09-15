import { cn, IconFont } from '@/utils/utils';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { useModel } from '@umijs/max';
import { Space } from 'antd';

import Select from '@/components/Select';
import Slider from '@/components/Slider';

type FooterProps = {
  value: number;
  onChange: (val: number) => void;
};

const Footer = ({ value, onChange }: FooterProps) => {
  const { collapseLeftPanel } = useModel('useEditor');

  return (
    <div className="flex justify-center items-center fixed bottom-0 left-0 right-0 w-full h-[48px] bg-[#1A1A1A]">
      <div className={cn('absolute', collapseLeftPanel ? 'left-[64px]' : 'left-[364px]')}>
        <Space align="center" className="px-[10px]">
          <IconFont type="icon-map-switch" className="mr-[12px]" />
          <MinusOutlined
            style={{ color: '#dbdbdb', paddingBottom: 7 }}
            onClick={() => onChange(value - 1)}
          />
          <Slider min={30} max={300} onChange={onChange} value={value} className="w-[180px]" />
          <PlusOutlined
            style={{ color: '#dbdbdb', paddingBottom: 7 }}
            onClick={() => onChange(value + 1)}
          />
          <Select
            value={`${value.toString()}%`}
            bordered={false}
            onSelect={(selectValue: string) => onChange(Number(selectValue))}
            options={[
              { value: '50', label: '50%' },
              { value: '100', label: '100%' },
              { value: '150', label: '150%' },
              { value: '200', label: '200%' },
              { value: '250', label: '250%' },
              { value: '300', label: '300%' },
            ]}
          />
        </Space>
      </div>
    </div>
  );
};

export default Footer;
