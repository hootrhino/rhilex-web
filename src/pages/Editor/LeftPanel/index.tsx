import { cn, IconFont } from '@/utils/utils';
import './index.less';

import {
  CloseOutlined,
  QuestionCircleOutlined,
  RedoOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import { Dnd } from '@antv/x6-plugin-dnd';
import { register } from '@antv/x6-react-shape';
import { useModel } from '@umijs/max';
import { Space, Tooltip } from 'antd';

import isNil from 'lodash/isNil';
import { forwardRef, useEffect, useRef, useState } from 'react';
import ComponentLibrary from './ComponentLibrary';
import { panelItems } from './constant';
import Layers from './Layers';
import shapes from './Shapes';

const LeftPanel = forwardRef((props, ref) => {
  const dndContainerRef = useRef<any>(null);
  const { collapseLeftPanel: collapse, setCollapseLeftPanel: setCollapse } = useModel('useEditor');
  const [activeItem, setActiveItem] = useState<string>('layers');

  const handleOnCloseRightPanel = () => {
    setCollapse(true);
    setActiveItem('');
  };

  const getDetailTitle = () => {
    const currentPanelItem = panelItems?.find((item) => item?.key === activeItem);

    return currentPanelItem?.name || '帮助';
  };

  const handleAddNode = (shape: string) => {
    const graph = (ref as any).current;

    graph.addNode({ shape });
  };

  useEffect(() => {
    const graph = (ref as any).current;

    if (!isNil(graph)) {
      const dndContainer = document.getElementById('dndContainer')!;

      const dnd = new Dnd({
        target: graph,
        dndContainer: dndContainer,
        getDropNode(node) {
          const { width, height } = node.size();

          return node.clone().size(width * 3, height * 3);
        },
      });

      shapes?.forEach((shape) => register(shape));

      dndContainerRef.current = dnd;
    }
  }, [(ref as any).current]);

  return (
    <>
      <div
        className={cn(
          'left-panel-fixed',
          'flex flex-col fixed left-0 bottom-0 w-[64px] bg-[#1A1A1A] text-center overflow-hidden py-[10px] px-[4px] cursor-pointer',
        )}
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
          {activeItem === 'components' && <ComponentLibrary addNode={handleAddNode} />}
        </div>
      </div>
    </>
  );
});

export default LeftPanel;
