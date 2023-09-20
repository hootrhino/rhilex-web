import { cn, IconFont } from '@/utils/utils';
import { useModel } from '@umijs/max';
import { Space, Tooltip } from 'antd';

import Select from '@/pages/Editor/components/Select';
import Slider from '@/pages/Editor/components/Slider';
import { useEffect, useState } from 'react';

type FooterProps = {
  value: number;
  onChange: (val: number) => void;
};

const shortcutOptions = [
  {
    title: '选中',
    key: '鼠标点击',
  },
  {
    title: '多选',
    key: 'ctrl | ⌘ + shift + a',
  },
  {
    title: '删除',
    key: 'Backspace',
  },
  {
    title: '复制',
    key: 'ctrl | ⌘ + c',
  },
  {
    title: '粘贴',
    key: 'ctrl | ⌘ + v',
  },
  {
    title: '剪切',
    key: 'ctrl | ⌘ + x',
  },
  {
    title: '撤销',
    key: 'ctrl | ⌘ + z',
  },
  {
    title: '重做',
    key: 'ctrl | ⌘ + shift + z',
  },
];

const Footer = ({ value, onChange }: FooterProps) => {
  const { collapseLeftPanel } = useModel('useEditor');
  const [minDisabled, setMinDisabled] = useState<boolean>(false);
  const [maxDisabled, setMaxDisabled] = useState<boolean>(false);

  useEffect(() => {
    setMinDisabled(value <= 30);
    setMaxDisabled(value >= 300);
  }, [value]);

  return (
    <div
      className="flex justify-center items-center fixed bottom-0 left-0 right-0 w-full h-[48px] bg-[#1A1A1A] pt-[1px]"
      style={{ borderTop: '1px solid #000', boxShadow: 'inset 0 1px 0 0 rgba(61, 61, 61, 0.6)' }}
    >
      <Space
        align="center"
        className={cn('absolute px-[10px]', collapseLeftPanel ? 'left-[64px]' : 'left-[364px]')}
      >
        <IconFont type="icon-map-switch" className="mr-[12px] cursor-pointer" />
        <div className="flex items-center justify-center">
          <div
            onClick={() => !minDisabled && onChange(value - 1)}
            className="flex items-center justify-center"
          >
            <IconFont
              type={!minDisabled ? 'icon-minus-outlined' : 'icon-minus-outlined-disabled'}
              className={cn(!minDisabled ? 'cursor-default' : 'cursor-not-allowed')}
            />
          </div>

          <Slider
            min={30}
            max={300}
            onChange={onChange}
            value={value}
            className="w-[180px] mx-[7px]"
          />

          <div
            onClick={() => !maxDisabled && onChange(value + 1)}
            className="flex items-center justify-center"
          >
            <IconFont
              type={!maxDisabled ? 'icon-plus-outlined' : 'icon-plus-outlined-disabled'}
              className={cn(!maxDisabled ? 'cursor-default' : 'cursor-not-allowed')}
            />
          </div>
        </div>

        <Select
          value={`${value.toString()}%`}
          bordered={false}
          onSelect={(selectValue: string) => onChange(Number(selectValue))}
          suffixIcon={<IconFont type="icon-arrow-down" />}
          options={[
            { value: '50', label: '50%' },
            { value: '100', label: '100%' },
            { value: '150', label: '150%' },
            { value: '200', label: '200%' },
            { value: '250', label: '250%' },
            { value: '300', label: '300%' },
          ]}
        />
        <Tooltip
          placement="top"
          title={
            <div className="px-[12px] py-[7px] text-[#adadad] rounded-[4px] text-[12px]">
              {shortcutOptions.map((item) => (
                <div className="w-[180px] flex items-center justify-between m-[4px]" key={item.key}>
                  <span>{item.title}</span>
                  <div className="bg-[#474747] rounded-[4px] px-[8px] py-[2px]">{item.key}</div>
                </div>
              ))}
            </div>
          }
          arrow={false}
          color="#333"
        >
          <IconFont type="icon-keyboard" className="cursor-pointer" />
        </Tooltip>
      </Space>
    </div>
  );
};

export default Footer;
