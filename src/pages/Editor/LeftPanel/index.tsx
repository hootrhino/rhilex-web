import Tooltip from '@/pages/Editor/components/Tooltip';
import { cn } from '@/utils/utils';
import { useModel } from '@umijs/max';
import { Space } from 'antd';
import { forwardRef, useEffect, useState } from 'react';
import ComponentLibrary from './ComponentLibrary';
import { panelItems } from './constant';
import Help from './Help';
import Layers from './Layers';
import Material from './Material';
import DetailTitle from './Title';

import type { AddNodeProps } from '../Canvas';
import Icon from '../components/Icon';

type LeftPanelProps = React.HTMLAttributes<HTMLDivElement> & AddNodeProps;

const LeftPanel = forwardRef<LeftPanelProps, any>(({ addNode, ...props }, ref) => {
  const {
    collapseLeftPanel: collapse,
    setCollapseLeftPanel: setCollapse,
    activeNode,
  } = useModel('useEditor');
  const [activeItem, setActiveItem] = useState<string>('layers');

  const detailContent = {
    layers: <Layers cells={ref?.current?.getCells() || []} />,
    material: <Material />,
    components: <ComponentLibrary addNode={addNode} />,
    help: <Help />,
  };

  // open or close left-panel
  const handleOnLeftPanel = (key: string) => {
    if (key === activeItem) {
      setCollapse(true);
      setActiveItem('');
    } else {
      setActiveItem(key);
      setCollapse(false);
    }
  };
  useEffect(() => {
    const graph = ref?.current;
    if (!graph) return;

    graph.resetSelection([activeNode]);
  }, [activeNode]);

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
                'w-full min-h-[40px] my-[8px] py-[4px] bg-transparent rounded-[4px] hover:bg-[#2c2c2c]',
                activeItem === item.key ? 'text-[#F7F7F7]' : 'text-[#7a7a7a]',
              )}
              direction="vertical"
              size={2}
              key={item.key}
              onClick={() => handleOnLeftPanel(item.key)}
            >
              <Icon type={item.icon} selected={activeItem === item.key} className="size-lg" />
              <span className="text-base">{item?.name}</span>
            </Space>
          ))}
        </div>
        <Space
          className={cn(
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
          <Icon type="question" selected={activeItem === 'help'} className="size-lg" />
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
            <DetailTitle activeItem={activeItem} />
            <div className="text-baseColor cursor-pointer">
              {activeItem !== 'help' && (
                <>
                  <Tooltip title="刷新" disabled={activeItem === 'layers'}>
                    <Icon disabled={activeItem === 'layers'} type="reload" />
                  </Tooltip>
                  {activeItem !== 'layers' && (
                    <Tooltip title="搜索">
                      <Icon type="search" className="ml-[10px]" />
                    </Tooltip>
                  )}

                  {['layers', 'components'].includes(activeItem) && (
                    <Tooltip title="固定">
                      <Icon type="pin" className="ml-[10px]" />
                    </Tooltip>
                  )}
                </>
              )}

              <Icon
                type="close"
                className="ml-[10px]"
                onClick={() => handleOnLeftPanel(activeItem)}
              />
            </div>
          </div>
          <div className="flex items-center flex-col text-[#dbdbdb] text-base h-[calc(100%-56px)]">
            {detailContent[activeItem]}
          </div>
        </div>
      )}
    </>
  );
});

export default LeftPanel;
