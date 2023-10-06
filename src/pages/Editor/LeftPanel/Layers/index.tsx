import { cn, IconFont } from '@/utils/utils';
import { useModel } from '@umijs/max';
import { Tree } from 'antd';
import type { DataNode } from 'antd/es/tree';
import { useEffect, useState } from 'react';
import Tooltip from '../../components/Tooltip';
import Icon from '../../components/Icon';

const toolbars = [
  {
    key: 'move-prev',
    icon: 'icon-move-prev',
    name: '上移一层',
  },
  {
    key: 'move-next',
    icon: 'icon-move-next',
    name: '下移一层',
  },
  {
    key: 'move-top',
    icon: 'icon-move-top',
    name: '置顶',
  },
  {
    key: 'move-bottom',
    icon: 'icon-move-bottom',
    name: '置底',
  },
];

const Layers = () => {
  const { layers } = useModel('useEditor');
  const [activeLayer, setActiveLayer] = useState<string>('');
  const [isGroup, setGroup] = useState<boolean>(false);
  const [treeData, setData] = useState<DataNode[]>([]);

  useEffect(() => {
    const newData = layers?.map((item) => ({
      title: (
        <div className="flex items-center w-full">
          <span className="pr-[70px] text-base">{item.title}</span>
          <div className={cn('absolute right-0 flex justify-end items-center w-[40px] h-[24px] opacity-0', 'show-actions')}>
            <Tooltip title="隐藏">
              <Icon type='show' className="px-[5px]" />
            </Tooltip>

            <Tooltip title="锁定">
              <Icon type='unlock' className="px-[5px]" />
            </Tooltip>
          </div>
        </div>
      ),
      key: item.id,
      icon: <IconFont type={item.icon} />,
    }));

    setData(newData);
  }, [layers]);

  return (
    <div className="w-full h-full">
      <div
        className={cn(
          'editor-divider-b',
          'h-[40px] w-full flex items-center justify-between px-[16px]',
        )}
      >
        {toolbars.map((toolbar) => (
          <Tooltip key={toolbar.key} title={toolbar.name}>
            <div className="flex items-center justify-center w-[24px] h-[24px] cursor-pointer rounded-[4px] g-transparent hover:bg-[#FFFFFF14]">
              <IconFont type={toolbar.icon} />
            </div>
          </Tooltip>
        ))}
        <div className="w-[1px] h-[12px] bg-[#333]" />
        <Tooltip title="成组">
          <div className="flex items-center justify-center w-[24px] h-[24px] cursor-pointer rounded-[4px] g-transparent hover:bg-[#FFFFFF14]">
            <IconFont type="icon-group" />
          </div>
        </Tooltip>
        <Tooltip title="解组" disabled={!isGroup}>
          <div
            className={cn(
              'flex items-center justify-center w-[24px] h-[24px] rounded-[4px] bg-transparent',
              isGroup ? 'cursor-pointer hover:bg-[#FFFFFF14]' : 'cursor-not-allowed',
            )}
          >
            <IconFont type={isGroup ? 'icon-ungroup' : 'icon-ungroup-disabled'} />
          </div>
        </Tooltip>
      </div>
      <div className=" w-full p-[8px]">
        <Tree
          showIcon
          blockNode
          defaultExpandAll
          treeData={treeData}
          onSelect={(_, { node }) => {
            setActiveLayer(node.key as string);
          }}
        />
      </div>
    </div>
  );
};

export default Layers;
