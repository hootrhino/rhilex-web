import { cn } from '@/utils/utils';
import { BarChartOutlined, EyeOutlined, LineChartOutlined } from '@ant-design/icons';
import { Tooltip, Tree } from 'antd';
import type { DataNode } from 'antd/es/tree';
import { useState } from 'react';

const Layers = () => {
  const [activeLayer, setActiveLayer] = useState<string>('');

  const treeData: DataNode[] = [
    {
      title: '图表组',
      key: '0-0',
      icon: <BarChartOutlined />,
      children: [
        {
          title: (
            <div className="inline w-full">
              <span className="pr-[70px]">折线图</span>
              <Tooltip title="隐藏" color="#1F6AFF">
                <EyeOutlined className={cn(activeLayer === '0-0-0' ? 'inline' : 'hidden')} />
              </Tooltip>
            </div>
          ),
          key: '0-0-0',
          icon: <LineChartOutlined />,
        },
        {
          title: (
            <div className="inline w-full">
              <span className="pr-[70px]">柱状图</span>
              <Tooltip title="隐藏" color="#1F6AFF">
                <EyeOutlined className={cn(activeLayer === '0-0-1' ? 'inline' : 'hidden')} />
              </Tooltip>
            </div>
          ),
          key: '0-0-1',
          icon: <BarChartOutlined />,
        },
      ],
    },
  ];

  return (
    <div className="w-full h-full p-[10px]">
      <Tree
        showIcon
        showLine
        blockNode
        defaultExpandAll
        treeData={treeData}
        onSelect={(selectedKeys) => {
          setActiveLayer((selectedKeys as string[])?.[0] || '');
        }}
      />
    </div>
  );
};

export default Layers;
