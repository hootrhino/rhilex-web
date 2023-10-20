import type { TreeProps } from 'antd';
import { ConfigProvider, Tree } from 'antd';

const TreeTable = ({ treeData, expandedKeys }: TreeProps) => {
  return (
    <ConfigProvider
      theme={{
        components: {
          Tree: {
            nodeHoverBg: '#44475A',
            nodeSelectedBg: '#282A36',
          },
        },
      }}
    >
      <Tree
        showLine
        showIcon
        blockNode
        expandedKeys={expandedKeys}
        switcherIcon={null}
        treeData={treeData}
        className="bg-[#282A36] text-[#F8F8F2]"
      />
    </ConfigProvider>
  );
};

export default TreeTable;
