import PageContainer from '@/components/PageContainer';
import { message } from '@/components/PopupHack';
import {
  deleteDatacenterClearSchemaData,
  getDatacenterListSchemaDdl,
  getDatacenterQueryDataList,
  getDatacenterSchemaDdlDefine,
  getDatacenterSchemaDdlDetail,
} from '@/services/rulex/shujuzhongxin';
import { toPascalCase } from '@/utils/utils';
import { DeleteOutlined, DownloadOutlined, TableOutlined } from '@ant-design/icons';
import type { ActionType } from '@ant-design/pro-components';
import { ProCard, ProTable } from '@ant-design/pro-components';
import { useRequest } from '@umijs/max';
import type { TreeDataNode } from 'antd';
import { Button, Empty, Space, Tooltip, Tree } from 'antd';
import { useEffect, useRef, useState } from 'react';

type SchemaDDLDefineItem = {
  name: string;
  type: string;
  defaultValue: number;
};

const getChildName = ({ name, type }: SchemaDDLDefineItem) => {
  return (
    <Space>
      <span>{name}</span>
      <span className="text-[10px] text-[#51A14F] italic">{type}</span>
    </Space>
  );
};

const DataCenter = () => {
  // const {formatMessage} = useIntl();
  const actionRef = useRef<ActionType>();
  const [selectedKey, setSelectedKey] = useState<string>();
  const [expandedKeys, setExpandedKeys] = useState<React.Key[]>([]);
  const [treeData, setTreeData] = useState<TreeDataNode[]>([]);

  // 获取数据表列表
  useRequest(() => getDatacenterListSchemaDdl(), {
    onSuccess: (data) => {
      const formatData = data?.map((item) => ({
        title: item.published ? (
          item.name
        ) : (
          <Tooltip title="数据模型尚未发布，因此暂时无法进行操作。你可以直接访问数据模型页面进行发布，以便启用相关功能。">
            {item.name}
          </Tooltip>
        ),
        key: item.uuid || '',
        disabled: !item.published,
        icon: <TableOutlined />,
        children: [],
      }));
      setTreeData(formatData);
      setSelectedKey(data?.[0]?.uuid);
      setExpandedKeys(data?.[0]?.uuid ? [data?.[0]?.uuid] : []);
    },
  });

  // 获取数据字段定义
  const { run: getSchemaDdlDefine } = useRequest(
    (params: API.getDatacenterSchemaDDLDefineParams) => getDatacenterSchemaDdlDefine(params),
    {
      manual: true,
      onSuccess: (data) => {
        const newTreeData = treeData?.map((tree) => {
          if (tree?.key === selectedKey) {
            return {
              ...tree,
              children: data?.map((d) => ({
                title: getChildName(d),
                key: d.name,
                isLeaf: true,
                selectable: false,
              })),
            };
          }
          return tree;
        });
        setTreeData(newTreeData);
      },
    },
  );

  // 获取表头
  const { run: getColumns, data: columns } = useRequest(
    (params: API.getDatacenterSchemaDDLDetailParams) => getDatacenterSchemaDdlDetail(params),
    {
      manual: true,
      formatResult: (res) =>
        res?.data?.map((item) => ({ title: toPascalCase(item?.name), dataIndex: item?.name })),
    },
  );

  // 导出数据
  const handleOnDownload = () => {
    window.location.href = `/api/v1/datacenter/exportData?uuid=${selectedKey}`;
  };

  // 清空历史数据
  const { run: clear } = useRequest(
    (params: API.deleteDatacenterClearSchemaDataParams) => deleteDatacenterClearSchemaData(params),
    {
      manual: true,
      onSuccess: () => {
        actionRef.current?.reload();
        message.success('清空完成');
      },
    },
  );

  useEffect(() => {
    if (selectedKey) {
      getSchemaDdlDefine({ uuid: selectedKey });
      getColumns({ uuid: selectedKey });
    }
  }, [selectedKey]);

  return (
    <PageContainer>
      <ProCard split="vertical">
        <ProCard colSpan="300px" title="数据表列表">
          <Tree.DirectoryTree
            showLine
            blockNode
            selectedKeys={selectedKey ? [selectedKey] : []}
            expandedKeys={expandedKeys}
            onSelect={(keys) => setSelectedKey(keys?.[0] as string)}
            onExpand={setExpandedKeys}
            treeData={treeData}
          />
        </ProCard>
        <ProCard title="历史数据列表">
          {columns && columns?.length > 0 ? (
            <ProTable
              rowKey="uuid"
              actionRef={actionRef}
              params={{ uuid: selectedKey }}
              request={async ({ current = 1, pageSize = 10, ...keyword }) => {
                if (keyword?.uuid) {
                  const { data } = await getDatacenterQueryDataList({
                    current,
                    size: pageSize,
                    order: 'DESC',
                    uuid: keyword.uuid,
                  });

                  return Promise.resolve({
                    data: data?.records,
                    total: data?.total || 0,
                    success: true,
                  });
                } else {
                  return Promise.resolve({
                    data: [],
                    total: 0,
                    success: true,
                  });
                }
              }}
              pagination={{
                hideOnSinglePage: true,
                defaultCurrent: 1,
                defaultPageSize: 10,
              }}
              columns={columns}
              search={false}
              rootClassName="stripe-table"
              toolBarRender={() => [
                <Button
                  danger
                  key="clear"
                  onClick={() => selectedKey && clear({ uuid: selectedKey })}
                  icon={<DeleteOutlined />}
                >
                  清空数据
                </Button>,
                <Button
                  key="download"
                  type="primary"
                  onClick={handleOnDownload}
                  icon={<DownloadOutlined />}
                >
                  导出数据
                </Button>,
              ]}
            />
          ) : (
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
          )}
        </ProCard>
      </ProCard>
    </PageContainer>
  );
};

export default DataCenter;
