import Collapse from '@/pages/Editor/components/Collapse';
import { IconFont } from '@/utils/utils';
import { useState } from 'react';

const quickLinks = [
  {
    title: '文档中心',
    url: '',
    key: 'quick-link-1',
  },
  {
    title: '微信答疑群',
    url: '',
    key: 'quick-link-2',
  },
];

const funcOptions = [
  {
    title: '图层',
    url: '',
    key: 'func-link-1',
    isNew: false,
    isUpdate: false,
  },
  {
    title: '组件库',
    url: '',
    key: 'func-link-2',
    isNew: false,
    isUpdate: true,
  },
  {
    title: '组件样式配置',
    url: '',
    key: 'func-link-3',
    isNew: false,
    isUpdate: true,
  },
  {
    title: '组件数据配置',
    url: '',
    key: 'func-link-4',
    isNew: true,
    isUpdate: false,
  },
  {
    title: '组件高级配置',
    url: '',
    key: 'func-link-5',
    isNew: true,
    isUpdate: false,
  },
];

const HelpDetail = () => {
  const [playIcon, setPlayIcon] = useState<string>('icon-play-fill');

  const quickStyleOptions = [
    {
      key: 'quickStyle',
      label: <div className="text-highlight3">编辑器功能介绍</div>,
      children: (
        <div className="text-baseColor text-base">
          {funcOptions?.map((item) => (
            <div key={item.key} className="flex justify-between items-center h-[28px]">
              <span>{item.title}</span>
              <IconFont type="icon-doc-fill" />
            </div>
          ))}
        </div>
      ),
    },
  ];

  return (
    <div className="h-full w-full py-[8px] px-[16px] text-highlight3">
      <div className="flex justify-between items-center h-[32px]">
        <span>新手引导</span>
        <IconFont
          type={playIcon}
          className="text-[16px] cursor-pointer"
          onMouseEnter={() => setPlayIcon('icon-play-fill-active')}
          onMouseLeave={() => setPlayIcon('icon-play-fill')}
        />
      </div>
      <>
        <div className="h-[32px] leading-[32px]">快速链接</div>
        {quickLinks?.map((item) => (
          <div key={item.key} className="text-primary h-[32px] flex items-center bg-transparent hover:bg-[#333]">
            <IconFont type="icon-export" />
            <span className="ml-[4px]">{item.title}</span>
          </div>
        ))}
      </>
      <Collapse defaultActiveKey="quickStyle" items={quickStyleOptions} />
    </div>
  );
};

export default HelpDetail;
