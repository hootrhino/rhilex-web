import Collapse from '@/pages/Editor/components/Collapse';
import { IconFont } from '@/utils/utils';
import { Popover } from 'antd';
import Icon from '../../components/Icon';
import Tooltip from '../../components/Tooltip';
import wechatImg from './images/wechat.jpg';

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

const quickStyleOptions = [
  {
    key: 'quickStyle',
    label: <div className="text-highlight3 pl-[16px]">编辑器功能介绍</div>,
    children: (
      <div className="text-baseColor text-base">
        {funcOptions?.map((item) => (
          <div
            key={item.key}
            className="flex justify-between items-center h-[28px] cursor-pointer py-[4px] px-[12px] my-[2px] mx-[4px] bg-transparent rounded-[4px] hover:bg-[#2c2c2c]"
          >
            <span>{item.title}</span>
            <IconFont type="icon-doc-fill" />
          </div>
        ))}
      </div>
    ),
  },
];

const HelpDetail = () => {
  return (
    <div className="h-full w-full text-highlight3 mx-[4px] my-[2px]">
      <div className="flex justify-between items-center h-[32px] px-[16px]">
        <span>新手引导</span>
        <Tooltip title="播放">
          <Icon type="play" className="text-[16px]" />
        </Tooltip>
      </div>
      <>
        <div className="h-[32px] leading-[32px] px-[16px]">快速链接</div>
        <div className="text-primary h-[32px] flex justify-start items-center cursor-pointer rounded-[4px] py-[4px] px-[12px] my-[2px] mx-[4px] bg-transparent hover:bg-[#2c2c2c]">
          <IconFont type="icon-export" />
          <span className="ml-[4px]">文档中心</span>
        </div>
        <div className="text-primary h-[32px] flex justify-start items-center cursor-pointer rounded-[4px] py-[4px] px-[12px] my-[2px] mx-[4px] bg-transparent hover:bg-[#2c2c2c]">
          <Popover
            placement="right"
            title={<span className="pl-[12px] text-[14px] text-[#adadad]">扫码加入微信群</span>}
            content={
              <div className="w-[116px] h-[116px] flex justify-center items-center">
                <img src={wechatImg} className="w-full h-full object-fill" />
              </div>
            }
            arrow={false}
            rootClassName="editor-popover"
          >
            <IconFont type="icon-export" />
            <span className="ml-[4px]">微信答疑群</span>
          </Popover>
        </div>
      </>
      <Collapse defaultActiveKey="quickStyle" items={quickStyleOptions} headerMarginRight={16} />
    </div>
  );
};

export default HelpDetail;
