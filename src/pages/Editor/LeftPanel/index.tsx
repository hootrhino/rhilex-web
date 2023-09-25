import { cn, IconFont } from '@/utils/utils';
import './index.less';

import {
  CloseOutlined,
  QuestionCircleOutlined,
  RedoOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import { useModel } from '@umijs/max';
import { Space, Tooltip } from 'antd';
import { forwardRef, useState } from 'react';
import ComponentLibrary from './ComponentLibrary';
import { panelItems } from './constant';
import Layers from './Layers';
import Material from './Material';

type LeftPanelProps = React.HTMLAttributes<HTMLDivElement>;

const LeftPanel = forwardRef<LeftPanelProps, any>(({ addNode, ...props }, ref) => {
  const {
    collapseLeftPanel: collapse,
    setCollapseLeftPanel: setCollapse,
    quickStyleConfig,
    activeNodeQuickStyle,
    setQuickStyleConfig,
  } = useModel('useEditor');
  const [activeItem, setActiveItem] = useState<string>('layers');

  const handleOnCloseRightPanel = () => {
    setCollapse(true);
    setActiveItem('');
  };

  const getDetailTitle = () => {
    const currentPanelItem = panelItems?.find((item) => item?.key === activeItem);

    return currentPanelItem?.name || '帮助';
  };

  return (
    <>
      <div
        className={cn(
          'editor-shadow-outer-r',
          'editor-box-shadow-1',
          'flex flex-col fixed left-0 bottom-0 w-[64px] h-[calc(100%-60px)] bg-[#1A1A1A] text-center overflow-hidden py-[10px] px-[4px] cursor-pointer z-[98] text-[12px]',
        )}
        {...props}
      >
        <div className="h-full">
          {panelItems?.map((item) => (
            <Space
              className={cn(
                'left-panel-fixed-item',
                activeItem === item.key ? 'text-[#F7F7F7]' : 'text-[#7a7a7a]',
              )}
              direction="vertical"
              size={2}
              key={item?.key}
              onClick={() => {
                if (item?.key === activeItem) {
                  handleOnCloseRightPanel();
                } else {
                  setActiveItem(item?.key);
                  setCollapse(false);
                }
              }}
            >
              <IconFont type={activeItem === item.key ? `${item?.icon}-active` : item?.icon} />
              <span className="text-[12px]">{item?.name}</span>
            </Space>
          ))}
        </div>
        <Space
          className={cn(
            'left-panel-fixed-help',
            activeItem === 'help' ? 'text-[#F7F7F7]' : 'text-[#7a7a7a]',
          )}
          direction="vertical"
          size={2}
          key="help"
          onClick={() => {
            setActiveItem('help');
            setCollapse(false);
          }}
        >
          <QuestionCircleOutlined
            style={activeItem === 'help' ? { color: '#1F6AFF' } : { color: '#ADADAD' }}
          />
          <span className="text-[12px]">帮助</span>
        </Space>
      </div>
      <div
        className={cn(
          'left-panel-detail',
          'editor-shadow-outer-r',
          'editor-box-shadow-1',
          'fixed bg-[#1a1a1a] w-[300px] left-[64px] bottom-0 block overflow-hidden',
          collapse ? 'hidden' : 'block',
        )}
      >
        <div
          className={cn(
            'left-panel-detail-header',
            'flex items-center justify-between h-[56px] px-[16px] overflow-hidden text-[#dbdbdb] text-[12px]',
          )}
        >
          <span>{getDetailTitle()}</span>
          <div className="text-[#adadad] cursor-pointer">
            <Tooltip title="刷新" color="#1F6AFF">
              <RedoOutlined />
            </Tooltip>
            <Tooltip title="搜索" color="#1F6AFF">
              <SearchOutlined className="ml-[10px]" />
            </Tooltip>
            <CloseOutlined className="ml-[10px]" onClick={handleOnCloseRightPanel} />
          </div>
        </div>
        <div
          className={cn(
            'left-panel-detail-content',
            'flex items-center flex-col text-[#dbdbdb] text-[12px] h-[calc(100%-56px)]',
          )}
        >
          {activeItem === 'layers' && <Layers />}
          {activeItem === 'components' && <ComponentLibrary addNode={addNode} />}
          {activeItem === 'material' && <Material />}
        </div>
      </div>
      <div
        className={cn('left-panel-fixed-quick-style','editor-shadow-outer-r','editor-box-shadow-1', quickStyleConfig.open ? 'block' : 'hidden')}
        onMouseLeave={() => {
          setQuickStyleConfig!({ open: false, title: '' });
        }}
      >
        <div
          className={cn(
            'left-panel-fixed-quick-style-header',
            'flex items-center justify-between h-[56px] px-[16px] text-[#ADADAD] text-[12px]',
          )}
        >
          {quickStyleConfig.title}快速样式
        </div>
        <div className={cn('left-panel-fixed-quick-style-content', 'editor-scrollbar')}>
          {activeNodeQuickStyle?.map((item) => (
            <div
              key={item.key}
              className="w-[166px] h-[93px] bg-[#242424] my-[12px] mr-[8px] ml-[12px] rounded-[4px] hover:bg-[#363636]"
            >
              <img src={item.value} className="w-full h-full object-contain" />
            </div>
          ))}
        </div>
      </div>
    </>
  );
});

export default LeftPanel;
