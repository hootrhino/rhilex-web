import { cn, IconFont } from '@/utils/utils';
import './index.less';

import {
  CloseOutlined,
  QuestionCircleOutlined,
  RedoOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import { useModel } from '@umijs/max';
import { Space } from 'antd';
import { forwardRef, useState } from 'react';
import Tooltip from '../components/Tooltip';
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
          'flex flex-col fixed left-0 bottom-0 w-[64px] h-[calc(100%-60px)] bg-panelBg text-center overflow-hidden py-[10px] px-[4px] cursor-pointer z-[98] text-base',
        )}
        {...props}
      >
        <div className="h-full">
          {panelItems?.map((item) => (
            <Space
              className={cn(
                'left-panel-item',
                'w-full min-h-[40px] my-[8px] py-[4px] bg-transparent rounded-[4px] hover:bg-[#2c2c2c]',
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
              <span className="text-base">{item?.name}</span>
            </Space>
          ))}
        </div>
        <Space
          className={cn(
            'left-panel-item',
            'w-full min-h-[40px] my-[8px] py-[4px] bg-transparent rounded-[4px] hover:bg-[#2c2c2c]',
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
          <span className="text-base">帮助</span>
        </Space>
      </div>
      {!collapse && (
        <div
          className={cn(
            'editor-shadow-outer-r',
            'editor-box-shadow-1',
            'fixed bg-panelBg w-[300px] left-[64px] bottom-0 overflow-hidden z-[98] h-[calc(100%-60px)] pr-[1px]',
          )}
        >
          <div
            className={cn(
              'editor-divider-b',
              'flex items-center justify-between h-[56px] px-[16px] overflow-hidden text-[#dbdbdb] text-base',
            )}
          >
            <span>{getDetailTitle()}</span>
            <div className="text-baseColor cursor-pointer">
              <Tooltip title="刷新">
                <RedoOutlined />
              </Tooltip>
              <Tooltip title="搜索">
                <SearchOutlined className="ml-[10px]" />
              </Tooltip>
              <CloseOutlined className="ml-[10px]" onClick={handleOnCloseRightPanel} />
            </div>
          </div>
          <div
            className={cn(
              'editor-tree-wrapper',
              'flex items-center flex-col text-[#dbdbdb] text-base h-[calc(100%-56px)]',
            )}
          >
            {activeItem === 'layers' && <Layers />}
            {activeItem === 'components' && <ComponentLibrary addNode={addNode} />}
            {activeItem === 'material' && <Material />}
          </div>
        </div>
      )}

      {quickStyleConfig.open && (
        <div
          className={cn(
            'absolute top-[60px] left-[362px] z-[98] w-[190px] h-[calc(100%-60px)] pr-[1px] overflow-hidden bg-panelBg',
            'editor-shadow-outer-r',
            'editor-box-shadow-1',
            'editor-divider-l',
          )}
          onMouseLeave={() => {
            setQuickStyleConfig!({ open: false, title: '' });
          }}
        >
          <div
            className={cn(
              'editor-divider-b',
              'flex items-center justify-between h-[56px] px-[16px] text-baseColor text-base',
            )}
          >
            {quickStyleConfig.title}快速样式
          </div>
          <div
            className={cn(
              'h-[calc(100%-60px)] overflow-y-auto overflow-x-hidden',
              'editor-scrollbar',
            )}
          >
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
      )}
    </>
  );
});

export default LeftPanel;
