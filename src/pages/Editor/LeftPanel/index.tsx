import Tooltip from '@/pages/Editor/components/Tooltip';
import { cn, IconFont } from '@/utils/utils';
import { useModel } from '@umijs/max';
import { Space } from 'antd';
import { forwardRef, useEffect, useState } from 'react';
import ComponentLibrary from './ComponentLibrary';
import { panelItems } from './constant';
import Help from './Help';
import Layers from './Layers';
import Material from './Material';

import './index.less';

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
  const [reloadIcon, setReloadIcon] = useState<string>('icon-reload');
  const [layersDocIcon, setLayersDocIcon] = useState<string>('icon-doc-fill');

  const detailContent = {
    layers: <Layers />,
    material: <Material />,
    components: <ComponentLibrary addNode={addNode} />,
    help: <Help />,
  };

  const handleOnCloseRightPanel = () => {
    setCollapse(true);
    setActiveItem('');
  };

  const getDetailTitle = () => {
    const currentPanelItem = panelItems?.find((item) => item?.key === activeItem);

    if (activeItem === 'layers') {
      return (
        <Tooltip title="查看帮助文档" placement="right">
          {currentPanelItem?.name}
          <IconFont
            type={layersDocIcon}
            className="ml-[4px] cursor-pointer"
            onMouseEnter={() => setLayersDocIcon('icon-doc-fill-active')}
            onMouseLeave={() => setLayersDocIcon('icon-doc-fill')}
          />
        </Tooltip>
      );
    } else {
      return currentPanelItem?.name || '帮助';
    }
  };

  useEffect(() => {
    if (activeItem === 'layers') {
      setReloadIcon('icon-reload-disabled');
    } else {
      setReloadIcon('icon-reload');
    }
  }, [activeItem]);

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
            'w-full min-h-[40px] my-[8px] py-[8px] bg-transparent rounded-[4px] hover:bg-[#2c2c2c]',
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
          <IconFont type={activeItem === 'help' ? 'icon-question-active' : 'icon-question'} />
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
              {activeItem !== 'help' && (
                <>
                  <Tooltip title="刷新" disabled={activeItem === 'layers'}>
                    <IconFont
                      disabled={activeItem === 'layers'}
                      type={reloadIcon}
                      onMouseEnter={() =>
                        activeItem !== 'layers' && setReloadIcon('icon-reload-active')
                      }
                      onMouseLeave={() => activeItem !== 'layers' && setReloadIcon('icon-reload')}
                    />
                  </Tooltip>
                  {activeItem !== 'layers' && <Tooltip title="搜索">
                    <IconFont type="icon-search" className="ml-[10px]" />
                  </Tooltip>}

                  {['layers', 'components'].includes(activeItem) && (
                    <Tooltip title="固定">
                      <IconFont type="icon-pin" className="ml-[10px]" />
                    </Tooltip>
                  )}
                </>
              )}

              <IconFont type="icon-close" className="ml-[10px]" onClick={handleOnCloseRightPanel} />
            </div>
          </div>
          <div
            className={cn(
              'editor-tree-wrapper',
              'flex items-center flex-col text-[#dbdbdb] text-base h-[calc(100%-56px)]',
            )}
          >
            {detailContent[activeItem]}
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
